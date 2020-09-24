import { parseInput, OPTIONS } from '@/store/modules/csv';
//import { columnsToRows } from '@/store/utils';

describe('parseInput', () => {
    it.each`
        input             | expected
        ${''}             | ${{ data: [], headers: [] }}
        ${'"x","y"\n1,2'} | ${{ data: [[1, 2]], headers: ['x', 'y', 'label'] }}
        ${'"x","y","z"\n1,2,3\n1,2,3'} | ${{ data: [
        [1, 2, 3],
        [1, 2, 3]
    ], headers: ['x', 'y', 'z', 'label'] }}
    `(
        'when $input is received the result should be $expected',
        ({ input, expected }) => {
            const result = parseInput(input, OPTIONS);
            expect(result).toStrictEqual(expected);
        }
    );

    it.each`
        input             | expected
        ${'"x","y"\n1,2'} | ${{ data: [[1, 2]], headers: ['x', 'y', 'label'] }}
        ${'"x","y","z"\n1,2,3\n1,2,3'} | ${{ data: [
        [1, 2, 3],
        [1, 2, 3]
    ], headers: ['x', 'y', 'z', 'label'] }}
    `(
        'when $input is received the result should be $expected',
        ({ input, expected }) => {
            const result = parseInput(input);
            expect(result).toStrictEqual(expected);
        }
    );

    it.each`
        input        | withHeaders | expected
        ${'1'}       | ${false}    | ${{ data: [[1]], headers: ['a', 'label'] }}
        ${'1\n2\n3'} | ${false}    | ${{ data: [[1], [2], [3]], headers: ['a', 'label'] }}
        ${'1\n2\n3'} | ${true}     | ${{ data: [[2], [3]], headers: [1, 'label'] }}
    `(
        'when $input is received and withHeaders is $withHeaders the result should have data $expected.data and these headers $expected.headers',
        ({ input, expected, withHeaders }) => {
            const result = parseInput(input, OPTIONS, withHeaders);
            expect(result).toStrictEqual(expected);
        }
    );
});

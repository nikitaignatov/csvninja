import {
    LABEL,
    annotate,
    addLabelColumn,
    scrollAndZoomHandler,
    labelIndex
} from '@/store/modules/annotation';
import { columnsToRows } from '@/store/utils';

const unknown = 'unknown';

describe('annotate', () => {
    const seriesData = [1, 2, 3];

    it('should annotate the data range with the payload', () => {
        const data = [seriesData, [unknown, unknown, unknown]];
        const context = {
            state: {
                headers: ['x', LABEL],
                data: data,
                range: { from: 1, to: 2 }
            }
        };
        const payload = 'some-label';
        annotate(context, payload);
        expect(context.state.data).toStrictEqual([
            [1, 2, 3],
            [unknown, payload, payload]
        ]);
    });

    it('should annotate the data range with the payload in the right column', () => {
        const data = [
            seriesData,
            seriesData,
            seriesData,
            [unknown, unknown, unknown]
        ];
        const context = {
            state: {
                headers: ['x', 'y', 'z', LABEL],
                data: data,
                range: { from: 1, to: 2 }
            }
        };
        const payload = 'some-label';
        annotate(context, payload);
        expect(context.state.data).toStrictEqual([
            seriesData,
            seriesData,
            seriesData,
            [unknown, payload, payload]
        ]);
    });
});

describe('addLabelColumn', () => {
    it('transpose and add the label column when missing', () => {
        const seriesData = [1, 2, 3];
        const payload = [['x', 'y', 'z'], seriesData, seriesData];
        const result = addLabelColumn(columnsToRows(payload), -1, unknown);
        expect(result).toStrictEqual([
            ['x', 1, 1],
            ['y', 2, 2],
            ['z', 3, 3],
            [LABEL, unknown, unknown]
        ]);
    });

    it('transpose and keep existing label column', () => {
        const seriesData = [1, 2];
        const payload = [['x', 'y', LABEL], seriesData, seriesData];
        const result = addLabelColumn(columnsToRows(payload), 2, unknown);
        expect(result).toStrictEqual([
            ['x', 1, 1],
            ['y', 2, 2],
            [LABEL, unknown, unknown]
        ]);
    });

    it('transpose and keep existing label column', () => {
        const seriesData = [1];
        const payload = [['x'], seriesData, seriesData];
        const result = addLabelColumn(columnsToRows(payload), -1, unknown);
        expect(result).toStrictEqual([
            ['x', 1, 1],
            [LABEL, unknown, unknown]
        ]);
    });

    it('transpose when null data', () => {
        const result = addLabelColumn(columnsToRows(null), -1, unknown);
        expect(result).toStrictEqual([[LABEL]]);
    });

    it('transpose when empty data', () => {
        const result = addLabelColumn(columnsToRows([]), -1, unknown);
        expect(result).toStrictEqual([[LABEL]]);
    });
});

describe('scrollAndZoomHandler', () => {
    it('should handle invalid state', () => {
        const state = {};
        const xaxis = { min: 1, max: 2 };
        scrollAndZoomHandler(state)(null, { xaxis });
        expect(state).toStrictEqual({});
    });

    it('should set the zoom range on the xaxis of the chart', () => {
        const state = { options: { xaxis: {} } };
        const xaxis = { min: 1, max: 2 };
        scrollAndZoomHandler(state)(null, { xaxis });
        expect(state).toStrictEqual({ options: { xaxis } });
    });

    it('should not manipulate existing properties of the state', () => {
        const state = { options: { xaxis: { test: 1 } }, random: 'test' };
        const xaxis = { min: 1, max: 2 };
        scrollAndZoomHandler(state)(null, { xaxis });
        expect(state).toStrictEqual({
            options: { xaxis: { min: 1, max: 2, test: 1 } },
            random: 'test'
        });
    });

    it.each`
        min   | max   | result
        ${0}  | ${0}  | ${{ min: 0, max: 0 }}
        ${1}  | ${2}  | ${{ min: 1, max: 2 }}
        ${10} | ${20} | ${{ min: 10, max: 20 }}
        ${-2} | ${-3} | ${{ min: -2, max: -3 }}
    `(
        'should set xaxis to $result when input $min and $max are selected',
        ({ min, max, result }) => {
            const state = { options: { xaxis: {} } };
            const xaxis = { min, max };
            scrollAndZoomHandler(state)(null, { xaxis });
            expect(state).toStrictEqual({ options: { xaxis: result } });
        }
    );
});

describe('labelIndex', () => {
    const invalid = -1;
    it.each`
        input                | expected
        ${{}}                | ${invalid}
        ${[]}                | ${invalid}
        ${[20]}              | ${invalid}
        ${['test']}          | ${invalid}
        ${['test', 'label']} | ${1}
    `(
        'labelIndex should return $expected when called with $input and not providing the label name',
        ({ input, expected }) => {
            const result = labelIndex(input);
            expect(expected).toStrictEqual(result);
        }
    );

    it.each`
        input              | label    | expected
        ${[20]}            | ${'lbl'} | ${invalid}
        ${['test']}        | ${'lbl'} | ${invalid}
        ${['lbl']}         | ${'lbl'} | ${0}
        ${['test', 'lbl']} | ${'lbl'} | ${1}
    `(
        'labelIndex should return $expected when called with $input and not providing the label name',
        ({ input, label, expected }) => {
            const result = labelIndex(input, label);
            expect(expected).toStrictEqual(result);
        }
    );
});

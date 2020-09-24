import { columnsToRows } from '@/store/utils';
import { LABEL } from '@/store/modules/annotation';

describe('columnsToRows', () => {
    it('transpose 3 columns', () => {
        const seriesData = [1, 2, 3];
        const payload = [['x', 'y', 'z'], seriesData, seriesData];
        const result = columnsToRows(payload);
        expect(result).toStrictEqual([
            ['x', 1, 1],
            ['y', 2, 2],
            ['z', 3, 3]
        ]);
    });

    it('transpose 2 columns with 3 headers where the last column is label but has no data', () => {
        const seriesData = [1, 2];
        const payload = [['x', 'y', LABEL], seriesData, seriesData];
        const result = columnsToRows(payload);
        expect(result).toStrictEqual([
            ['x', 1, 1],
            ['y', 2, 2],
            [LABEL, undefined, undefined]
        ]);
    });

    it('transpose single column with headers', () => {
        const seriesData = [1];
        const payload = [['x'], seriesData, seriesData];
        const result = columnsToRows(payload);
        expect(result).toStrictEqual([['x', 1, 1]]);
    });

    it('transpose when null data', () => {
        const result = columnsToRows(null);
        expect(result).toStrictEqual([]);
    });

    it('transpose when empty data', () => {
        const result = columnsToRows([]);
        expect(result).toStrictEqual([]);
    });
});

import { LABEL, annotate, transpose, addLabelColumn } from '@/store/modules/annotation';


const unknown = "unknown"

describe('annotate', () => {
    const seriesData = [1, 2, 3]

    it('should annotate the data range with the payload', () => {
        const data = [seriesData, [unknown, unknown, unknown]]
        const context = { state: { headers: ['x', LABEL], data: data, range: { from: 1, to: 2 } } }
        const payload = "some-label"
        annotate(context, payload)
        expect(context.state.data).toStrictEqual([[1, 2, 3], [unknown, payload, payload]]);
    });

    it('should annotate the data range with the payload in the right column', () => {
        const data = [seriesData, seriesData, seriesData, [unknown, unknown, unknown]]
        const context = { state: { headers: ['x', 'y', 'z', LABEL], data: data, range: { from: 1, to: 2 } } }
        const payload = "some-label"
        annotate(context, payload)
        expect(context.state.data).toStrictEqual([seriesData, seriesData, seriesData, [unknown, payload, payload]]);
    });
});

describe('transpose', () => {
    it('transpose and add the label column when missing', () => {
        const seriesData = [1, 2, 3]
        const payload = [['x', 'y', 'z'], seriesData, seriesData]
        const result = addLabelColumn(transpose(payload), -1, unknown)
        expect(result).toStrictEqual([['x', 1, 1], ['y', 2, 2], ['z', 3, 3], [LABEL, unknown, unknown]]);
    });

    it('transpose and keep existing label column', () => {
        const seriesData = [1, 2]
        const payload = [['x', 'y', LABEL], seriesData, seriesData]
        const result = addLabelColumn(transpose(payload), 2, unknown)
        expect(result).toStrictEqual([['x', 1, 1], ['y', 2, 2], [LABEL, unknown, unknown]]);
    });

    it('transpose and keep existing label column', () => {
        const seriesData = [1]
        const payload = [['x'], seriesData, seriesData]
        const result = addLabelColumn(transpose(payload), -1, unknown)
        expect(result).toStrictEqual([['x', 1, 1], [LABEL, unknown, unknown]]);
    });

    it('transpose when null data', () => {
        const result = addLabelColumn(transpose(null), -1, unknown)
        expect(result).toStrictEqual([[LABEL]]);
    });

    it('transpose when empty data', () => {
        const result = addLabelColumn(transpose([]), -1, unknown)
        expect(result).toStrictEqual([[LABEL]]);
    });
});

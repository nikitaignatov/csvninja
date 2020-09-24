import { LABEL, annotate, transpose } from '@/store/modules/annotation';


describe('annotate', () => {
    const unknown = "unknown"
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
        const result = transpose(payload, -1, LABEL)
        expect(result).toStrictEqual([['x', 1, 1], ['y', 2, 2], ['z', 3, 3], [LABEL]]);
    });

    it('transpose and keep existing label column', () => {
        const seriesData = [1, 2]
        const payload = [['x', 'y', LABEL], seriesData, seriesData]
        const result = transpose(payload, 2, LABEL)
        expect(result).toStrictEqual([['x', 1, 1], ['y', 2, 2], [LABEL, undefined, undefined]]);
    });

    it('transpose and keep existing label column', () => {
        const seriesData = [1]
        const payload = [['x'], seriesData, seriesData]
        const result = transpose(payload, -1, LABEL)
        expect(result).toStrictEqual([['x', 1, 1], [LABEL]]);
    });

    it('transpose when null data', () => {
        const result = transpose(null, -1, LABEL)
        expect(result).toStrictEqual([[LABEL]]);
    });

    it('transpose when empty data', () => {
        const result = transpose(null, -1, LABEL)
        expect(result).toStrictEqual([[LABEL]]);
    });
});

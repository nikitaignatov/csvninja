import { LABEL, annotate } from '@/store/modules/annotation';

const unknown = "unknown"
const seriesData = [1, 2, 3]

describe('annotate', () => {
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

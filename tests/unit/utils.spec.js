import * as utils from '@/store/utils';

describe('scrollAndZoomHandler', () => {
    it('should handle invalid state', () => {
        const state = {};
        const xaxis = { min: 1, max: 2 };
        utils.scrollAndZoomHandler(state)(null, { xaxis });
        expect(state).toStrictEqual({});
    });

    it('should set the zoom range on the xaxis of the chart', () => {
        const state = { options: { xaxis: {} } };
        const xaxis = { min: 1, max: 2 };
        utils.scrollAndZoomHandler(state)(null, { xaxis });
        expect(state).toStrictEqual({ options: { xaxis } });
    });

    it('should not manipulate existing properties of the state', () => {
        const state = { options: { xaxis: { test: 1 } }, random: 'test' };
        const xaxis = { min: 1, max: 2 };
        utils.scrollAndZoomHandler(state)(null, { xaxis });
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
            utils.scrollAndZoomHandler(state)(null, { xaxis });
            expect(state).toStrictEqual({ options: { xaxis: result } });
        }
    );
});

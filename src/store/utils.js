export const scrollAndZoomHandler = function(state) {
    return function(chartContext, { xaxis }) {
        if (xaxis && state && state.options) {
            state.options = {
                ...state.options,
                xaxis: {
                    ...state.options.xaxis,
                    min: xaxis.min,
                    max: xaxis.max
                }
            };
        }
    };
};

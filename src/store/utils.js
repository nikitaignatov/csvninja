export const LABEL = 'label';
export const scrollAndZoomHandler = function (state) {
    return function (chartContext, { xaxis }) {
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

export const annotate = function ({ state }, payload) {
    for (var i = state.range.from; i <= state.range.to; i++) {
        state.data[state.headers.indexOf(LABEL)][i] = payload;
    }
};
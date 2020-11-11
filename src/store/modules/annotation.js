import { columnsToRows } from '@/store/utils';

const options = {
    annotations: { xaxis: [] },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: 1
    },
    markers: {
        size: 0
    },
    chart: {
        id: 'charID',
        group: 'items',
        type: 'line',
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: false,
                zoomout: false,
                pan: true,
                reset: true
            },
            autoSelected: 'selection'
        },
        selection: {
            enabled: true,
            type: 'x',
            fill: {
                color: '#222',
                opacity: 0.1
            },
            stroke: {
                width: 1,
                dashArray: 3,
                color: '#000',
                opacity: 0.4
            }
        },
        zoom: {
            enabled: true,
            type: 'x'
        },
        events: {}
    },
    xaxis: {
        type: 'numeric'
    }
};

export const LABEL = 'label';

/** Annotates a data range with a given label value */
export const annotate = function({ state }, payload) {
    for (var i = state.range.from; i <= state.range.to; i++) {
        state.data[state.headers.indexOf(LABEL)][i] = payload;
    }
};

/** Index of a label column */
export const labelIndex = function(headers, label = LABEL) {
    if (Array.isArray(headers)) return headers.indexOf(label);
    else return -1;
};

/** Adds a separate column for the labels and populates them with the default label if a label is missing. */
export const addLabelColumn = function(xs, index, defaultLabel) {
    const label = xs[index] || (xs[xs.length] = []);
    if (xs.length > 1) {
        for (var i = 0; i < xs[0].length; i++) {
            if (!label[i]) {
                label[i] = defaultLabel;
            }
        }
    }
    return xs;
};

/** Converts csv data into chart series compatible format */
export const convert = function({ commit }, { payload, labels, headers }) {
    var index = labelIndex(headers);
    var xs = columnsToRows(payload);
    xs = addLabelColumn(xs, index, labels[0]);
    commit('converted', xs);
};

/** Sets the new window for the data based on the zoom or scroll event */
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

/** Defines the annotation objects that will be rendered for the selected ranges  */
export const renderAnnotations = function({ state, commit }, payload) {
    state.labels = payload.labels;
    var xs = [];
    var column = labelIndex(payload.headers);
    var labels = payload.data2[column];
    var start = 0;
    const create = (x, x2, color, label) => {
        const fillColor = state.colors[color];
        label = { text: labels[label] };
        return { x, x2, fillColor, label };
    };
    for (var i = 0; i < labels.length; i++) {
        const color = state.labels.indexOf(labels[i - 1]);
        if (i > 0) {
            var same = labels[i] === labels[i - 1];
            if (!same) {
                xs.push(create(start, i, color, i - 1));
                start = i;
            } else if (i === labels.length - 1) {
                xs.push(create(start, i + 1, color, i));
            }
        }
    }
    commit('annotated', xs);
};

export default {
    namespaced: true,
    state: () => ({
        range: { from: null, to: null },
        data: [],
        columns: [],
        colors: '#008FFB #00E396 #FEB019 #FF4560 #775DD0 #33B2DF #546E7A #D4526E #13D8AA #A5978B'.split(
            ' '
        ),
        options
    }),
    mutations: {
        annotated: function(state, payload) {
            state.options = {
                ...state.options,
                annotations: { xaxis: payload }
            };
        },
        converted: function(state, payload) {
            state.data = payload;
        },
        selected: function(state, payload) {
            state.range.from = Math.round(payload.min);
            state.range.to = Math.round(payload.max);
        },
        selectColumns: function(state, payload) {
            state.columns = payload;
        }
    },
    actions: {
        convert: convert,
        select: function({ commit }, payload) {
            commit('selected', payload);
        },
        selectColumns: function({ commit }, payload) {
            commit('selectColumns', payload);
        },
        annotate: annotate,
        renderAnnotations: renderAnnotations
    },
    getters: {
        getOptions: state => selection => {
            state.options.chart.events = {
                selection: function(chartContext, { xaxis, yaxis }) {
                    if (!yaxis) return;
                    selection(xaxis);
                },
                zoomed: scrollAndZoomHandler(state),
                scrolled: scrollAndZoomHandler(state)
            };
            return state.options;
        }
    }
};

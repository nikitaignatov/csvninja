import _ from 'lodash';

const LABEL = 'label';
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

const scrollAndZoomHandler = function(state) {
    return function(chartContext, { xaxis }) {
        if (xaxis)
            state.options = {
                ...state.options,
                xaxis: {
                    ...state.options.xaxis,
                    min: xaxis.min,
                    max: xaxis.max
                }
            };
    };
};

export default {
    namespaced: true,
    state: () => ({
        range: { from: null, to: null },
        data: [],

        columns: [],
        //
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
        convert: function({ commit }, { payload, labels, headers }) {
            var data = _.zip.apply(_, payload);
            var xs = data.map(x => x);
            var label = xs[headers.indexOf(LABEL)];
            if (!label) {
                label = [labels[0]];
                xs.push(label);
            }
            if (xs.length > 0) {
                for (var i = 0; i < xs[0].length; i++) {
                    if (!label[i]) {
                        label[i] = labels[0];
                    }
                }
            }
            commit('converted', xs);
        },
        select: function({ commit }, payload) {
            commit('selected', payload);
        },
        selectColumns: function({ commit }, payload) {
            commit('selectColumns', payload);
        },
        annotate: function({ state }, payload) {
            for (var i = state.range.from; i < state.range.to; i++) {
                state.data[state.headers.indexOf(LABEL)][i] = payload;
            }
        },
        renderAnnotations: function({ state, commit }, payload) {
            var m = state.options.annotations.xaxis;
            state.labels = payload.labels;
            m = [];
            var labelIndex = payload.headers.indexOf(LABEL);
            var labels = payload.data2[labelIndex];
            var start = 0;
            for (var i = 0; i < labels.length; i++) {
                const fillColor =
                    state.colors[state.labels.indexOf(labels[i - 1])];
                if (i > 0) {
                    var same = labels[i] === labels[i - 1];
                    if (!same) {
                        m.push({
                            x: start,
                            x2: i,
                            fillColor: fillColor,
                            label: {
                                text: labels[i - 1]
                            }
                        });
                        start = i;
                    } else if (i === labels.length - 1) {
                        m.push({
                            x: start,
                            x2: i + 1,
                            fillColor: fillColor,
                            label: {
                                text: labels[i]
                            }
                        });
                    }
                }
            }
            commit('annotated', m);
        }
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

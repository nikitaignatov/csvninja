const LABEL = 'label'
const options = {
    annotations: { xaxis: [] },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: "straight",
        width: 1
    },
    markers: {
        size: 0
    },
    chart: {
        id: "vuechart-example.1",
        group: "items",
        type: "line",
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
            autoSelected: "selection"
        },
        selection: {
            enabled: true,
            type: "x",
            fill: {
                color: "#222",
                opacity: 0.1
            },
            stroke: {
                width: 1,
                dashArray: 3,
                color: "#000",
                opacity: 0.4
            }
        },
        zoom: {
            enabled: true,
            type: "x"
        },
        events: {
        }
    },
    xaxis: {
        type: "numeric"
    }
}
export default {
    namespaced: true,
    state: () => ({
        range: { from: null, to: null },

        columns: [],
        //
        colors: "#008FFB #00E396 #FEB019 #FF4560 #775DD0 #33B2DF #546E7A #D4526E #13D8AA #A5978B".split(" "),
        options
    }),
    mutations: {
        selected: function (state, payload) {
            state.range.from = Math.round(payload.min)
            state.range.to = Math.round(payload.max)
        },
        selectColumns: function (state, payload) {
            console.log(payload)
            state.columns = payload
        },
    },
    actions: {
        select: function ({ commit }, payload) {
            console.log(payload)
            commit('selected', payload)
        },
        selectColumns: function ({ commit }, payload) {
            commit('selectColumns', payload)
        },
        renderAnnotations: function ({ state }, payload) {
            var m = state.options.annotations.xaxis;
            state.labels = payload.labels
            console.log("ann", m);
            m = [];
            var labelIndex = payload.headers.indexOf(LABEL);
            var labels = payload.data2[labelIndex];
            console.log("labels", labels);
            var start = 0;
            for (var i = 0; i < labels.length; i++) {
                if (i > 0) {
                    var same = labels[i] === labels[i - 1];
                    if (!same) {
                        m.push({
                            x: start,
                            x2: i,
                            fillColor: state.colors[state.labels.indexOf(labels[i - 1])],
                            label: {
                                text: labels[i - 1]
                            }
                        });
                        start = i;
                    } else if (i === labels.length - 1) {
                        m.push({
                            x: start,
                            x2: i + 1,
                            fillColor: state.colors[state.labels.indexOf(labels[i - 1])],
                            label: {
                                text: labels[i]
                            }
                        });
                    }
                }
            }
            state.options.annotations.xaxis = m
        }
    },
    getters: {
        getOptions: (state) => (selection) => {
            state.options.chart.events = {
                selection: function (chartContext, { xaxis, yaxis }) {
                    if (!yaxis) return;
                    selection(xaxis)
                }
            }
            return state.options
        }
    }
}
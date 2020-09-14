export default {
    namespaced: true,
    state: () => ({
        options: {
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
                    selection: function (chartContext, { xaxis, yaxis }) {
                        if (!yaxis) return;
                        this.range = { from: Math.round(xaxis.min), to: Math.round(xaxis.max) };
                    },
                    zoomed: function (chartContext, { xaxis, yaxis }) {
                        console.log(chartContext, xaxis, yaxis);
                    }
                }
            },
            xaxis: {
                type: "numeric"
            }
        }
    }),
    mutations: {
    },
    actions: {
    },
    getters: {
        getOptions: (state) => (selection) => {
            state.options.chart.events = { selection }
            return state.options
        }
    }
}
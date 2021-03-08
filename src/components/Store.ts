import _ from "lodash";
import { parse, unparse } from "papaparse";
import { writable, derived } from "svelte/store";
import { sample } from "./Sample";


export let annotations = writable([]);
export let range = writable({ min: 0, max: 0 });
export const inputCsv = writable(sample);
export const parsedData = derived(inputCsv, (x) => {
    const result = parse(x, { dynamicTyping: true })
    const dataset = result.data;
    const headers = dataset[0];
    const transposed = _.zip.apply(_, _.tail(dataset));
    const pairs = _.zip(headers, transposed);
    const series = pairs.map(([name, data]) => ({ name, data }));
    //    .filter((x) => _.includes(["Ax", "Ay", "Az"], x.name));
    const yaxis = series.map((x) => ({
        show: false,
        seriesName: x.name,
        opposite: true,
    }));
    return { series, yaxis, dataset }
});


export let options = derived([parsedData, annotations], ([input, annotations]) => {
    console.log('update options', input, annotations)

    const options = {
        yaxis: input.yaxis,
        series: input.series,
        stroke: {
            curve: "straight",
            width: 1,
        },
        chart: {
            animations: {
                enabled: false,
            },
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
                    reset: true,
                },
                autoSelected: "selection",
            },
            selection: {
                enabled: true,
                type: "x",
                fill: {
                    color: "#222",
                    opacity: 0.1,
                },
                stroke: {
                    width: 1,
                    dashArray: 3,
                    color: "#000",
                    opacity: 0.4,
                },
            },
            zoom: {
                enabled: true,
                type: "x",
            },
            events: {
                selection: function (chartContext, { xaxis, yaxis }) {
                    console.log("selection", chartContext, {
                        xaxis,
                        yaxis,
                    });
                    if (!yaxis) return;
                    range.set(xaxis);
                },
            },
        },
        tolltip: {
            enabled: false,
        },
        annotations: {
            xaxis: annotations,
        },
        xaxis: {
            type: "numeric",
        },
    };
    return options
});
export let outputCsv = derived([parsedData, annotations], ([input, annotations]) => {
    console.log('outputCsv', input, annotations)
    const output = _.cloneDeep(input.dataset)
    const label = (i) => {
        return _.find(annotations, x => i >= x.x && i <= x.x2)?.label?.text ?? ''
    }
    for (let i = 0; i < output.length; i++) {
        output[i].push(i === 0 ? 'label' : label(i))
    }
    return unparse(output)
});
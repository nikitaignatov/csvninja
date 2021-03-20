import _ from "lodash";
import { parse, unparse } from "papaparse";
import { writable, derived } from "svelte/store";
import { sample } from "./Sample";
import { getOptions } from "./Chart/options";

export let simple = writable(true);
export let annotations = writable([]);
export let range = writable({ min: 0, max: 0 });
export const inputCsv = writable(sample);
export const parsedData = derived(inputCsv, (x) => {
    const result = parse(x, { dynamicTyping: true })
    const dataset = result.data;
    const headers = dataset[0];
    const transposed = _.zip.apply(_, _.tail(dataset));
    const pairs = _.zip(headers, transposed);
    const series = pairs
        .map(([name, data]) => ({ name, data }))
        .filter((x) => !_.includes(["ts"], x.name));
    const yaxis = series.map((x) => ({
        show: false,
        seriesName: x.name,
        opposite: true,
    }));
    console.log(series)
    return { series, yaxis, dataset }
});

export const series = derived(parsedData, ({ series }) => {
    return _.chain(series)
        .keyBy('name')
        .mapValues('data')
        .value();
});

export let options = derived([parsedData, annotations], ([input, annotations]) => {
    return {
        yaxis: input.yaxis,
        series: input.series,
        ...getOptions({
            hidden: !simple,
            annotations,
            selection: function (chartContext, { xaxis, yaxis }) {
                if (!yaxis) return;
                range.set(xaxis);
            }
        })
    };
});

export let outputCsv = derived([parsedData, annotations], ([input, annotations]) => {
    const output = _.cloneDeep(input.dataset)
    const label = (i) => {
        return _.find(annotations, x => i >= x.x && i <= x.x2)?.label?.text ?? ''
    }
    output.map((x, i) => x.push(i === 0 ? 'label' : label(i)))
    return unparse(output)
});
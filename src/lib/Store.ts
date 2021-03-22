import _ from "lodash";

import { writable, derived } from "svelte/store";
import { getOptions } from "./Chart/options";
import { parsedData, toCsv } from "$lib/Csv/Csv";

export let simple = writable(true);
export let annotations = writable([]);

export let range = writable({ min: 0, max: 0 });

export const series = derived(parsedData, ({ series }) => {
    return _.chain(series)
        .keyBy('name')
        .mapValues('data')
        .value();
});

export let options = derived([parsedData, annotations], ([input, x]) => {
    return {
        yaxis: input.yaxis,
        series: input.series,
        ...getOptions({
            hidden: !simple,
            annotations: x,
            selection: function (chartContext, { xaxis, yaxis }) {
                if (!yaxis) return;
                range.set(xaxis);
            }
        })
    };
});

export let outputCsv = derived([parsedData, annotations], ([input, annotations]) => {
    const output = _.cloneDeep([input.headers].concat(input.dataset))
    const label = (i) => _.find(annotations, x => i >= x.x && i <= x.x2)?.label?.text ?? ''
    output.map((x, i) => x.push(i === 0 ? 'label' : label(i)))
    return toCsv(output)
});
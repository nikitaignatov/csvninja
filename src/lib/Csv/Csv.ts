import _ from "lodash";
import paraparse from "papaparse";
const { parse, unparse } = paraparse // TODO: figure out why destructuring fails, when doing it in the import statement.

import type { ParseResult } from "papaparse";
import { writable, derived } from "svelte/store";
import { sample } from "./Sample";

let delimiter = ','

/**
 * Converts a 2 dimensional array to csv with default configuration
 * @param input 2 dimensional array
 * @returns csv string
 */
export const toCsv = (input) => unparse(input, {
    delimiter
});

/**
 * config docs: https://www.papaparse.com/docs#config
 * @param input csv string
 * @returns 
 */
export const parseCsv = function (input) {
    const options = {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,
        transformHeader: (value) => value.trim(),
        transform: (value) => value.trim()
    }
    const result: ParseResult<any> = parse(input, options);
    delimiter = result.meta.delimiter

    return {
        data: (result.data.map(_.values) as any[]),
        meta: result.meta,
        errors: result.errors
    }
}

/**
 * The raw input csv value
 */
export const inputCsv = writable<string>(sample);
export const annotationRanges = function (dataset, fields: string[]) {
    const i = fields.indexOf('label')
    let { labels, current } = _.reduce(dataset, ((acc, value, key) => {
        if (value[i]) {
            if (acc.current && acc.current.id === value[i]) {
                acc.current['x2'] = value[0]
                acc.current['index2'] = key
            } else if (acc.current && acc.current.id !== value[i]) {
                const id = acc.current.id
                if (acc.labels[id]) {
                    acc.labels[id].push({ ...acc.current })
                } else {
                    acc.labels[id] = [{ ...acc.current }]
                }
                acc.current = undefined
            } else {
                acc.current = { x: value[0], id: value[i], index: key }
            }
        } else {
            if (acc.current) {
                acc.labels[acc.current.id]?.push({ ...acc.current })
                acc.current = undefined
            }
        }
        return acc
    }), {
        labels: {},
        current: null
    });
    if (current) {
        labels[current.id] = [...(labels[current.id]), current] ?? [current]
    }
    return labels
}


/**
 * Parsed data based on the input csv. 
 */
export const parsedData = derived(inputCsv, (x) => {
    const result = parseCsv(x)

    const dataset = result.data;
    const headers = result.meta.fields ?? [];
    const delimiter = result.meta.delimiter;
    const transposed = _.zip.apply(_, dataset);
    const pairs = _.zip(headers, transposed);
    const series = pairs.map(([name, data]) => ({ name, data })).filter(x => x.name !== 'ts');
    const labels: any[] = _.flatten(_.values(annotationRanges(dataset, headers)))
    const yaxis = series.map((x) => ({
        show: false,
        seriesName: x.name,
        opposite: true,
    }));
    console.log(labels)
    return { series, yaxis, dataset, headers, delimiter, labels }
});

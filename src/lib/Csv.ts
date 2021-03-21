import _ from "lodash";
import paraparse from "papaparse";
const { parse, unparse } = paraparse // TODO: figure out why destructuring fails, when doing it in the import statement.

import { writable, derived } from "svelte/store";
import { sample } from "./Sample";

// csv library does cannot handle leading whitespace when values or headers are quoted like in this example https://people.sc.fsu.edu/~jburkardt/data/csv/trees.csv
export const trim = function (input: string): string {
    try {
        return input.split('\n').map(x => x.replace(/",\s*"/gi, '","').replace(/^\s*"/i, '\n"')).join('\n');
    } catch { return input }
}

/**
 * Converts a 2 dimensional array to csv with default configuration
 */
export const toCsv = (data) => unparse(data);

/**
 * The raw input csv value
 */
export const inputCsv = writable<string>(sample);


/**
 * Parsed data based on the input csv. 
 */
export const parsedData = derived(inputCsv, (x) => {
    // config docs: https://www.papaparse.com/docs#config
    const result = parse(trim(x), {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,
        transformHeader: (value) => value.trim(),
        transform: (value) => value.trim()
    })
    
    const dataset = result.data.map(_.values);
    const headers = result.meta.fields;
    const transposed = _.zip.apply(_, dataset);
    const pairs = _.zip(headers, transposed);
    const series = pairs.map(([name, data]) => ({ name, data }));
    const yaxis = series.map((x) => ({
        show: false,
        seriesName: x.name,
        opposite: true,
    }));
    return { series, yaxis, dataset, headers }
});

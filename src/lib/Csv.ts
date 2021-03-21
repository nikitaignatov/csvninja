import _ from "lodash";
import paraparse from "papaparse";
const { parse, unparse } = paraparse // TODO: figure out why destructuring fails, when doing it in the import statement.

import type { ParseResult } from "papaparse";
import { writable, derived } from "svelte/store";
import { sample } from "./Sample";

/**
 * Converts a 2 dimensional array to csv with default configuration
 * @param input 2 dimensional array
 * @returns csv string
 */
export const toCsv = (input) => unparse(input);

/**
 * config docs: https://www.papaparse.com/docs#config
 * @param input csv string
 * @returns 
 */
export const parseCsv = function (input) {
    const result: ParseResult<any> = parse(input, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,
        transformHeader: (value) => value.trim(),
        transform: (value) => value.trim()
    });

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
    const series = pairs.map(([name, data]) => ({ name, data })).filter(x=>x.name!=='ts');
    const yaxis = series.map((x) => ({
        show: false,
        seriesName: x.name,
        opposite: true,
    }));
    return { series, yaxis, dataset, headers, delimiter }
});

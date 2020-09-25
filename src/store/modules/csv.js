import parse from 'csv-parse/lib/sync';
import stringify from 'csv-stringify/lib/sync';
import * as samples from '@/samples';

const LABEL = 'label';
export const OPTIONS = {
    delimiter: ',',
    columns: false,
    skip_empty_lines: true,
    cast: true,
    cast_date: true,
    trim: true
};

/** Parses input csv to json object  */
export const parseInput = function(
    input,
    options = OPTIONS,
    withHeaders = true,
    result = { headers: [], data: [] }
) {
    if (input) {
        var records = parse(input, options);
        if (withHeaders) {
            result.headers = records.slice(0, 1)[0];
            result.data = records.slice(1);
        } else {
            result.headers = [...Array(records[0].length).keys()].map(x =>
                String.fromCharCode('a'.charCodeAt(0) + x)
            );
            result.data = records;
        }
        if (result.headers.indexOf(LABEL) < 0) {
            result.headers.push(LABEL);
        }
    }
    return result;
};

export default {
    namespaced: true,
    state: () => ({
        input: '',
        data: [],
        headers: [],
        output: '',
        example: samples.EXAMPLE,
        inputWithHeaders: true
    }),
    mutations: {
        input(state, input) {
            state.input = input;
        },
        data(state, input) {
            state.data = input;
        },
        headers(state, input) {
            state.headers = input;
        },
        output(state, input) {
            state.output = stringify(input, {
                header: true,
                columns: state.headers
            });
        }
    },
    actions: {
        read: function({ commit, state }, payload) {
            const records = parseInput(
                payload,
                OPTIONS,
                state.inputWithHeaders
            );
            commit('input', payload);
            commit('headers', records.headers);
            if (records.data) {
                commit('data', records.data);
                commit('output', records.data);
            }
        },
        write: function({ commit }, payload) {
            if (payload) {
                commit('data', payload);
                commit('output', payload);
            }
        }
    },
    getters: {}
};

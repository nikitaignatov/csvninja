import parse from 'csv-parse/lib/sync';
import stringify from 'csv-stringify/lib/sync';
import * as samples from '@/samples';

const LABEL = 'label';
const OPTIONS = {
    delimiter: ',',
    columns: false,
    skip_empty_lines: true,
    cast: true,
    cast_date: true
};

export default {
    namespaced: true,
    state: () => ({
        input: '',
        data: [],
        headers: [],
        output: '',
        example: samples.EXAMPLE
    }),
    mutations: {
        load(state, input) {
            state.input = input;
        },
        parse(state) {
            if (state.input) {
                var records = parse(state.input, OPTIONS);
                state.data = records.slice(1);
                state.headers = records.slice(0, 1)[0];
                if (state.headers.indexOf(LABEL) < 0) {
                    state.headers.push(LABEL);
                }
            }
        },
        write(state, payload) {
            if (payload) state.data = payload;
            if (state.data) {
                state.output = stringify(state.data, {
                    header: true,
                    columns: state.headers
                });
            }
        }
    },
    actions: {
        read: function({ commit }, payload) {
            commit('load', payload);
            commit('parse');
            commit('write');
        },
        write: function({ commit }, payload) {
            commit('write', payload);
        }
    },
    getters: {}
};

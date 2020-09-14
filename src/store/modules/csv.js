export default {
    namespaced: true,
    state: () => ({ input: '', data: [], headers: [], output: '' }),
    mutations: {
        load(state, input) {
            if (input) { state.input = input }
        },
        parse(state) {
            if (state.input) {
                var data = state.input.split("\n").map(x => x.split(","));
                state.data = data.slice(1);
                state.headers = data.slice(0, 1);
            }
        },
        write(state) {
            if (state.data) {
                var csv = state.data.map(x => x.join(","));
                if (state.headers || state.headers !== []) {
                    csv = [state.headers.join(",")].concat(csv);
                }
                csv = csv.join("\n");
                state.output = csv;
            }
        }
    },
    actions: {
        read: function ({ commit }, csv) {
            commit('load', csv)
            commit('parse')
            commit('write')
        },
        write: function ({ commit }, output) {
            commit('write', output)
        }
    },
    getters: {}
}
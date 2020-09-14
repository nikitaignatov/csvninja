// const SAMPLE = "x,y,z,label\n1,10,5\n2,2,44\n3,21,24\n5,21,24\n7,20,4\n5,18,4\n4,14,4\n2,21,2\n1,19,2\n2,21,5\n3,17,5\n3.5,12,1\n4,8,7\n5,1,30\n6,5,24\n7,12,17\n8,19,1\n9,21,3\n10,17,9\n11,19,2\n10,20,-4\n6,29,-9\n3,26,-1\n2,32,5\n4,33,12\n8,15,18"

const EXAMPLE = "x,y,z,label\n1,10,5\n2,2,44\n3,21,24\n5,21,24\n7,20,4\n5,18,4\n4,14,4\n2,21,2\n1,19,2\n2,21,5\n3,17,5"

const LABEL = 'label'

export default {
    namespaced: true,
    state: () => ({ input: '', data: [], headers: [], output: '', example: EXAMPLE }),
    mutations: {
        load(state, input) {
            state.input = input
        },
        parse(state) {
            if (state.input) {
                var lines = state.input.split("\n").map(x => x.split(","));
                state.data = lines.slice(1);
                state.headers = lines.slice(0, 1)[0];
                if (state.headers.indexOf(LABEL) < 0) {
                    state.headers.push(LABEL);
                }
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
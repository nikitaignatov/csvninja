import Vue from "vue";
import Vuex from "vuex";
import CsvModule from "./modules/csv";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        csv: CsvModule
    },
    state: {
        selection: { from: null, to: null },
        annotations: [],
        input: '',
        outpus: '',
        labels: []
    },
    mutations: {},
    actions: {},
});

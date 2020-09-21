import Vue from 'vue';
import Vuex from 'vuex';
import CsvModule from './modules/csv';
import AnnotationModule from './modules/annotation';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        csv: CsvModule,
        annotation: AnnotationModule
    },
    state: {
        selection: { from: null, to: null },
        annotations: [],
        input: '',
        outpus: '',
        labels: []
    },
    mutations: {},
    actions: {}
});

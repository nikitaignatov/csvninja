import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import RowsToColumns from '../views/RowsToColumns.vue';

Vue.use(VueRouter);

const TimeSeries = { template: '<div>Test</div>' };
const TimeSeriesSample = { template: '<div>Test</div>' };

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/csv/transpose-rows-to-columns',
        name: 'TransposeRowsToColumns',
        component: RowsToColumns
    },
    {
        path: '/annotation',
        name: 'Annotation',
        component: Home,
        children: [
            {
                path: 'time-series',
                name: 'Time Series',
                component: TimeSeries,
                children: [
                    {
                        path: ':sample',
                        name: 'Sample',
                        component: TimeSeriesSample
                    }
                ]
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;

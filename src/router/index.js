import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/annotation/',
        name: 'Annotation',
        component: Home,
        children: [
            {
                path: 'times-series',
                name: 'Time Series',
                component: Home,
                children: [
                    {
                        path: ':sample',
                        name: 'Sample',
                        component: Home
                    }
                ]
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;

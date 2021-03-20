const sveltePreprocess = require('svelte-preprocess');
const pkg = require('./package.json');
let { pages = 'build', assets = 'build' } = {}
/** @type {import('@sveltejs/kit').Config} */
module.exports = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        sveltePreprocess({
            defaults: {
                style: "postcss",
            },
            postcss: true
        }),
    ],
    kit: {
        // By default, `npm run build` will create a standard Node app.
        // You can create optimized builds for different platforms by
        // specifying a different adapter
        adapter: {
            name: '@sveltejs/adapter-static',

            async adapt(builder) {
                builder.copy_static_files(assets);
                builder.copy_client_files(assets);

                await builder.prerender({
                    force: true,
                    dest: pages
                });
            }
        },

        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',

        vite: {
            ssr: {
                noExternal: Object.keys(pkg.dependencies || {})
            }
        }
    }
};

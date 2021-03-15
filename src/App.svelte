<script>
    import { Router, Route, Link } from "svelte-routing";

    import Nav from "./components/Nav.svelte";
    import Layout from "./components/Layout.svelte";
    import Input from "./components/Input.svelte";
    import Output from "./components/Output.svelte";
    import Transform from "./components/Transform.svelte";
    import Chart from "./components/Chart/Chart.svelte";
    let output;

    let summary;
    let transformer;
    export let url = ""; //This property is necessary declare to avoid ignore the Router
</script>

<Router {url}>
    <Layout>
        <Nav />
        <div>
            <Route path="/">
                <div class="lg:2/6 xl:w-2/4 mt-20 lg:mt-30 lg:ml-10 text-left">
                    <h1
                        class="text-6xl font-semibold text-gray-900 leading-none"
                    >
                        Extract patterns from your sensor data
                    </h1>
                    <h2
                        class="mt-6 text-xl font-light text-true-gray-500 antialiased"
                    >
                        Visual tool for manual annotation and labelling of
                        signal data. Allows you to progress faster with
                        supervised learning AI algorithms.
                    </h2>
                    <Link
                        to="labelling"
                        class="mt-6 inline-block px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out"
                    >
                        Start Labelling
                    </Link>
                </div>
                <Chart />
            </Route>
            <Route path="/labelling">
                <Input />
                <Transform
                    bind:data={output}
                    bind:summary
                    bind:this={transformer}
                />
                <Chart />
                <Output />
            </Route>
            <Route path="/labelling">
                <p>No examples for now, sorry!</p>
            </Route>
        </div>
    </Layout>
</Router>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

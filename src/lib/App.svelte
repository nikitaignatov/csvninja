<script>
    import Nav from "./Nav.svelte";
    import Layout from "./Layout.svelte";
    import Chart from "./Chart/Chart.svelte";
</script>

<Layout>
    <Nav />
    <div>
        <div class="lg:2/6 xl:w-2/4 mt-20 lg:mt-30 lg:ml-10 text-left">
            <h1 class="text-6xl font-semibold text-gray-900 leading-none">
                Extract patterns from your sensor data
            </h1>
            <h2 class="mt-6 text-xl font-light text-true-gray-500 antialiased">
                Visual tool for manual annotation and labelling of signal data.
                Allows you to progress faster with supervised learning AI
                algorithms.
            </h2>
            <a
                href="/labelling"
                class="mt-6 inline-block px-8 py-4 rounded-full font-normal tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out"
            >
                Start Labelling
            </a>
        </div>
        <Chart />
    </div>
</Layout>

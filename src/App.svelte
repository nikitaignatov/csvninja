<script>
    import Chart from "./components/Chart.svelte";
    import Nav from "./components/Nav.svelte";
    import Layout from "./components/Layout.svelte";
    import Input from "./components/Input.svelte";
    import Output from "./components/Output.svelte";
    import Transform from "./components/Transform.svelte";
    import Hero from "./components/Hero.svelte";
    let output;

    let summary;
    let transformer;
</script>

<Layout>
    <Nav />
    <Hero />

    <Chart />
    <!-- <Transform bind:data={output} bind:summary bind:this={transformer} />
    <Input />
    <Output /> -->
</Layout>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

<script>
    import Chart from "./components/Chart.svelte";
    import Nav from "./components/Nav.svelte";
    import Layout from "./components/Layout.svelte";
    import Input from "./components/Input.svelte";
    import Transform from "./components/Transform.svelte";
    import Hero from "./components/Hero.svelte";
    import { sample } from "./components/Sample.svelte";
    let output = sample;
    let options;

    let summary;
    let transformer;
</script>

<Layout>
    <Nav />
    <Hero on:click={() => transformer.summarize()} />

    <Chart bind:options />
    <Transform
        bind:data={output}
        bind:options
        bind:summary
        bind:this={transformer}
        separator="	"
    />
    <Input bind:value={output} on:change={() => transformer.summarize()} />
</Layout>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

<script>
    import "../global.css";
    import Layout from "../lib/Layout.svelte";
    import Nav from "../lib/Nav.svelte";
</script>

<Layout>
    <Nav />
    <slot /></Layout
>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

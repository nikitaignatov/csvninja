<script>
    import { browser } from "$app/env";
    import { onMount } from "svelte";

    let chart;
    let options;

    onMount(async () => {
        const wrapper = await import("./wrapper");
        const store = await import("../Store");
        chart = wrapper.chart;
        options = store.options;
    });
</script>

{#if browser && options}
    <div>
        <div use:chart={$options} />
    </div>
{/if}

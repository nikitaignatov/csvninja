<script>
    import { browser } from "$app/env";
    import { onMount } from "svelte";

    let chart;
    let options;

    onMount(async () => {
        const module = await import("svelte-apexcharts");
        const module2 = await import("../Store");
        chart = module.chart;
        options = module2.options;
    });
</script>

{#if browser && options}
    <div>
        <div use:chart={$options} />
    </div>
{/if}

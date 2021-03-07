<script>
    import { chart } from "svelte-apexcharts";
    export let options ;
</script>
{#if options}
<div use:chart={options} />
{/if}
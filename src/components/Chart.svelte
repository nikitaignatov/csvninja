<script>
    import { chart } from "svelte-apexcharts";
    import { options } from "./Store";
</script>

{#if options}
    <div use:chart={$options} />
{/if}

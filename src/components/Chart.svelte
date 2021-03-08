<script>
    import { chart } from "svelte-apexcharts";
    import { options } from "./Store";
</script>

{#if options}
    <div>
        <div use:chart={$options} />
    </div>
{/if}

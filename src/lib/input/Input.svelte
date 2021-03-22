<script lang="ts">
    import _ from "lodash";
    import { parsedData, inputCsv } from "$lib/Csv/Csv";
    import Row from "./SummaryRow.svelte";
    import Column from "./SummaryColumn.svelte";

    let features = [
        { name: "Features", map: (x) => x.name },
        { name: "Min", map: (x) => _.min(x.data) },
        { name: "Max", map: (x) => _.max(x.data) },
        { name: "Mean", map: (x) => _.mean(x.data).toFixed(3) },
        { name: "Empty", map: (x) => _.filter(x.data, _.isNull)?.length },
        { name: "NaN", map: (x) => _.filter(x.data, _.isNaN)?.length },
        { name: "Count", map: (x) => x.data?.length },
    ];

    type display = "row" | "columns";
    let show: display = "columns";
</script>

<div class="w-full">
    <h3>Input Data</h3>
    <textarea
        bind:value={$inputCsv}
        class="w-full border-gray-300 rounded-lg border antialiased p-2"
        rows="10"
    />
</div>

{#if show === "columns"}
    <div class="w-full">
        <table
            class="border-collapse text-left table-auto w-full whitespace-no-wrap bg-white table-striped relative"
        >
            <Column data={$parsedData?.series} bind:features />
        </table>
    </div>
{:else if show === "row"}
    <div class="w-full">
        <table
            class="border-collapse text-left table-auto w-full whitespace-no-wrap bg-white table-striped relative"
        >
            {#each features as item}
                <Row
                    name={item.name}
                    data={$parsedData?.series}
                    map={item.map}
                />
            {/each}
        </table>
    </div>
{/if}

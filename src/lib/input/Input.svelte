<script lang="ts">
    import { inputCsv } from "../Csv";
    import { parsedData } from "../Csv";
    import _ from "lodash";
    import Row from "./SummaryRow.svelte";
    var summary = [
        { name: "Features", f: (x) => x.name },
        { name: "Min", f: (x) => _.min(x.data) },
        { name: "Max", f: (x) => _.max(x.data) },
    ];
</script>

<div class="w-full">
    <h3>Input Data</h3>
    <textarea
        bind:value={$inputCsv}
        class="w-full border-gray-300 rounded-lg border antialiased p-2"
        rows="10"
    />
</div>

<div class="w-full">
    <table
        class="border-collapse text-left table-auto w-full whitespace-no-wrap bg-white table-striped relative"
    >
        {#each summary as item}
            <Row name={item.name} data={$parsedData?.series} map={item.f} />
        {/each}
        <Row
            name="Mean"
            data={$parsedData?.series}
            map={(x) => _.mean(x.data).toFixed(3)}
        />
        <Row
            name="Count"
            data={$parsedData?.series}
            map={(x) => x.data.length}
        />
    </table>
</div>

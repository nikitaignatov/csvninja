<script lang="ts">
    import { inputCsv } from "../Store";
    import { parsedData, series } from "../Store";
    import Row from "./SummaryRow.svelte";
    import _ from "lodash";
    import { xlink_attr } from "svelte/internal";

    (2.0).toFixed(3);
</script>

<div class="flex flex-row w-full">
    <div class="md:w-1/2 px-3">
        <h3>Input Data</h3>
        <textarea
            bind:value={$inputCsv}
            class="w-full border-gray-300 rounded-lg border antialiased p-2"
            rows="10"
        />
    </div>
    <div class="md:w-1/2 px-3">
        <table
            class="border-collapse text-left table-auto w-full whitespace-no-wrap bg-white table-striped relative"
        >
            <Row
                name="Features"
                data={$parsedData?.series}
                map={(x) => x.name}
            />
            <Row
                name="Min"
                data={$parsedData?.series}
                map={(x) => _.min(x.data)}
            />
            <Row
                name="Max"
                data={$parsedData?.series}
                map={(x) => _.max(x.data)}
            />
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
</div>

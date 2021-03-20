<script lang="ts">
    import { inputCsv } from "../Store";
    import { parsedData, series } from "../Store";
    import Row from "./SummaryRow.svelte";
    import _ from "lodash";
    import * as tf from "@tensorflow/tfjs";

    let p = tf.tensor1d($parsedData.series[0].data);

    p.max().print();
    p.min().print();

    console.log(p.max().toFloat());
    var summary = [
        { name: "Features", f: (x) => x.name },
        { name: "Min", f: (x) => tf.tensor1d(x.data).min().toFloat() },
        { name: "Max", f: (x) => tf.tensor1d(x.data).max() },
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

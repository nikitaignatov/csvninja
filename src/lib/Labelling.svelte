<script>
    import Input from "./input/Input.svelte";
    import Summary from "./input/Summary.svelte";
    import Output from "./Output.svelte";
    import Transform from "./Transform.svelte";
    import Chart from "./Chart/Chart.svelte";
    let output;

    let summary;
    let transformer;
</script>

<div class="mt-10">
    <h1 class="text-blue-600 font-bold text-lg font-mono">
        Select a region on the chart and click on one of the

        <span
            class="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-2 px-4 m-1 border border-blue-600 hover:border-transparent rounded"
            >label buttons
        </span> that are placed below
    </h1>
    <Chart />
    <Transform bind:data={output} bind:summary bind:this={transformer} />
    <div class="grid grid-cols-2 gap-4">
        <Input />

        <Output />
    </div>
    <Summary />
</div>

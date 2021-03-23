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

<div>
    <Chart />
    <Transform bind:data={output} bind:summary bind:this={transformer} />
    <div class="grid grid-cols-2 gap-4">
        <Input />

        <Output />
    </div>
    <Summary />
</div>

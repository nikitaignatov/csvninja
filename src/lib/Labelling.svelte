<script>
    import Input from "./input/Input.svelte";
    import Output from "./Output.svelte";
    import Transform from "./Transform.svelte";
    import Chart from "./Chart/Chart.svelte";
    let output;

    let summary;
    let transformer;
</script>

<div>
    <Input />
    <Transform bind:data={output} bind:summary bind:this={transformer} />
    <Chart />
    <Output />
</div>

<script lang="ts">
    import _ from "lodash";
    import { range, annotations } from "./Store";

    let labels = ["kettlebell-swing-up", "kettlebell-swing-down", "unknown"];
    let labelsText = labels.join("\n");
    let label;

    const assignLabels = (e) => {
        labels = (e.target.value ?? "").split("\n");
    };

    const addLabel = (item) => (e) => {
        const a = {
            x: Math.round($range.min),
            x2: Math.round($range.max),
            label: {
                text: item,
                style: {
                    fontSize: "12pt",
                },
            },
        };
        $annotations = [...$annotations, a];
    };
</script>

<div>
    {#each labels ?? [] as item}
        <button
            on:click={addLabel(item)}
            class="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-2 px-4 m-1 border border-blue-600 hover:border-transparent rounded"
        >
            {item}
        </button>
    {/each}
    {#if $range}
        [{Math.round($range?.min)}, {Math.round($range?.max)}] = {Math.round(
            $range?.max - $range?.min
        )}
    {/if}
</div>
<div class="w-full">
    <textarea
        rows="5"
        on:input={assignLabels}
        on:load={assignLabels}
        bind:value={labelsText}
        class="p-2 border border-gray-300 rounded-lg antialiased  w-full"
    />
</div>

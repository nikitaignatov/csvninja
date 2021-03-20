<script lang="ts">
    import _ from "lodash";
    import { parsedData, options, range, annotations } from "./Store";

    export let separator;

    let labels = ["kettlebell-swing-up", "kettlebell-swing-down", "unknown"];
    let labelsText = labels.join("\n");
    let label;
    let separators = [
        { label: "tab", value: "\t" },
        { label: "comma", value: "," },
        { label: "semicolon", value: ";" },
    ];

    const assignLabels = (e) => {
        labels = (e.target.value ?? "").split("\n");
    };

    const addLabel = (item) => (e) => {
        console.log($annotations);
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
        console.log($annotations);
    };
</script>

{#if $range}
    [{Math.round($range?.min)}, {Math.round($range?.max)}] = {Math.round(
        $range?.max - $range?.min
    )}
{/if}
{#if $parsedData.meta}
    [{JSON.stringify($parsedData.meta, null, 2)}
{/if}

<!-- svelte-ignore a11y-no-onchange -->
<select
    class="p-2 border border-gray-300 rounded-lg antialiased"
    value={separator}
    on:change={(e) => {
        separator = e.target.value;
    }}
>
    {#each separators as sep}
        <option value={sep.value}>
            {sep.label}
        </option>
    {/each}
</select>
<!-- svelte-ignore a11y-no-onchange -->
<div>
    {#each labels ?? [] as item}
        <button
            on:click={addLabel(item)}
            class="bg-transparent hover:bg-blue-600 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-600 hover:border-transparent rounded"
        >
            {item}
        </button>
    {/each}
</div>

<textarea on:keypress={assignLabels} on:load={assignLabels} 
class="p-2 border border-gray-300 rounded-lg antialiased" />

<button
    on:click={(e) => {
        console.log($annotations);
        const a = {
            x: Math.round($range.min),
            x2: Math.round($range.max),
            label: {
                text: label,
                style: {
                    fontSize: "12pt",
                },
            },
        };
        $annotations = [...$annotations, a];
        console.log($annotations);
    }}>Annotate</button
>

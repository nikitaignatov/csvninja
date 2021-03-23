<script lang="ts">
    import { outputCsv } from "./Store";
</script>

<div class="w-full">
    <h3>Output Data</h3>
    <textarea
        bind:value={$outputCsv}
        class="w-full border-gray-300 rounded-lg border antialiased p-2 bg-gray-900 text-green-400 font-mono"
        rows="10"
    />
</div>

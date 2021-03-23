<script lang="ts">
    import { outputCsv } from "./Store";
</script>

<div class="w-full">
    <h3 class="text-green-600 font-bold text-lg font-mono">Output Data</h3>
    <textarea
        bind:value={$outputCsv}
        class="w-full border-gray-300 rounded-lg border antialiased p-2 bg-gray-50 text-green-600 font-mono"
        rows="10"
    />
</div>

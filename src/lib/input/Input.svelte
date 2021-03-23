<script lang="ts">
    import { inputCsv } from "$lib/Csv/Csv";
</script>

<div class="w-full">
    <h3 class="text-blue-600 font-bold text-lg font-mono">Input Data</h3>
    <textarea
        bind:value={$inputCsv}
        class="w-full border-gray-300 rounded-lg border antialiased p-2  bg-gray-50 text-blue-600 font-mono"
        rows="10"
    />
</div>

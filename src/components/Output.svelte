<script lang="ts">
    import { outputCsv } from "./Store";
</script>

<h3>Output Data</h3>
<textarea
    bind:value={$outputCsv}
    class="w-full border-gray-300 rounded-lg border antialiased p-2"
    rows="10"
/>

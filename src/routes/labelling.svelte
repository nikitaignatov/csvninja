<script lang="ts">
    import { browser } from "$app/env";
    import App from "$lib/Labelling.svelte";
</script>

{#if browser && App}
    <App />
{/if}

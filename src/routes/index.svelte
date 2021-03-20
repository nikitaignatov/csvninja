<script lang="ts">
    import { browser } from "$app/env";
    import App from "$lib/App.svelte";
</script>

<main>

    {#if browser}
        <App />
    {/if}
</main>

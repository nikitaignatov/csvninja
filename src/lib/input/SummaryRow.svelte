<script lang="ts">
    export let name: string;
    export let data: any[];
    export let map: (x: any) => number | string;
</script>

<tr>
    <th class="border-b border-gray-20 p-2">{name}</th>
    {#each data ?? [] as item}
        <td class="border-b border-gray-20 p-2">{map(item)}</td>
    {/each}
</tr>

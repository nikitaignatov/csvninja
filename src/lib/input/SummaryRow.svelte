<script lang="ts">
    import _ from "lodash";
    export let name;
    export let data;
    export let map;
</script>

<tr>
    <th class="border-b border-gray-20 p-2">{name}</th>
    {#each data ?? [] as item}
        <td class="border-b border-gray-20 p-2">{map(item)}</td>
    {/each}
</tr>

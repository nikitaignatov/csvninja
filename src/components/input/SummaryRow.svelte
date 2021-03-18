<script lang="ts">
    import _ from "lodash";
    export let name;
    export let data;
    export let map;
</script>

<tr>
    <th class="border-dashed border-t border-gray-20">{name}</th>
    {#each data ?? [] as item}
        <td class="border-dashed border-t border-gray-20">{map(item)}</td>
    {/each}
</tr>

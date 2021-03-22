<script lang="ts">
    type item = { name: string; map: (x: any) => number | string };
    export let features: item[];
    export let data: any[];
</script>

<thead>
    <tr>
        {#each features as feature}
            <th class="border-b border-gray-20 p-2">{feature.name}</th>
        {/each}
    </tr>
</thead>
<tbody>
    {#each data ?? [] as item}
        <tr>
            {#each features as feature}
                <td class="border-b border-gray-20 p-2">{feature.map(item)}</td>
            {/each}
        </tr>
    {/each}
</tbody>

<template>
    <div class="home">
        <h1 class="text-h3">
            Transpose rows to columns
        </h1>
        <Transpose />
    </div>
</template>

<script>
// @ is an alias to /src
import Transpose from '@/components/Transpose.vue';

export default {
    name: 'RowsToColumns',
    components: {
        Transpose
    }
};
</script>

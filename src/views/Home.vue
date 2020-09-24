<template>
    <div class="home">
        <h1 class="text-h3">
            Time Series Annotation - {{ $route.params.sample }} Data Example
        </h1>
        <HelloWorld />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'Home',
    components: {
        HelloWorld
    }
};
</script>

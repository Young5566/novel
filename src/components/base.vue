<template>
    <div style="display: flex; flex-direction: column">
        <app-bar></app-bar>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    import AppBar from './appBar/AppBar';
    export default {
        name: 'base',
        components: {
            AppBar
        }
    };
</script>
<style scoped>

</style>

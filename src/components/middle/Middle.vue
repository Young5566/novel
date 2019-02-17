<template>
    <div></div>
</template>

<script>
    export default {
        name: 'middle',
        created () {
            // console.log(this.$route.params);
            this.$router.push({
                path: '/search',
                name: 'Search',
                params: {'data': this.$route.params.data, 'searchValue': this.$route.params.searchValue}
            });
        }
    };
</script>

<style scoped>

</style>

<template>
    <div id="addressAdd">
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
        />
    </div>
</template>

<script>
    export default {
        name: "addressAdd",
        data() {
            return {
                areaList:[],
                searchResult: [],
            }
        },
        beforeCreate() {
            document.body.style.backgroundColor = 'rgb(245, 245, 245)'
        },
        beforeDestroy() {
            document.body.style.backgroundColor = ''
        },
        mounted() {
        },
        methods: {},
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">

</style>
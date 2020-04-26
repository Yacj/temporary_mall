<template>
    <div id="addressEdit">
        <van-address-edit :area-list="areaList"
                          show-postal
                          show-delete
                          show-set-default
                          show-search-result
                          :addressInfo="addressInfo"
                          :search-result="searchResult"
                          @save="onSave"
                          @delete="onDelete"
        />
    </div>
</template>

<script>
    import areaList from './../../assets/js/area'

    export default {
        name: "addressEdit",
        data() {
            return {
                id: 0,
                areaList: areaList,
                searchResult: [],
                addressInfo: {}
            }
        },
        created() {
            this.id = this.$route.params.id
            console.log(this.id)
        },
        methods: {
            onSave() {

            },
            onDelete() {
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
<template>
    <div id="addressList">
        <div class="noDataPlaceHold"
             v-show="list.length<1">
            <van-empty image="error" description="暂无收货地址" />
        </div>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                @add="onAdd"
        />
    </div>
</template>

<script>
    export default {
        name: "addressList",
        beforeCreate() {
            document.body.style.backgroundColor = 'rgb(245, 245, 245)'
        },
        beforeDestroy() {
            document.body.style.backgroundColor = ''
        },
        data() {
            return {
                chosenAddressId: '1',
                list: [],
            };
        },
        mounted() {
        },
        methods: {
            onAdd(){
                this.$router.push({
                    path:'/my/addressAdd'
                })
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">

</style>
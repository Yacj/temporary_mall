<template>
    <div id="addressList">
        <div class="noDataPlaceHold"
             v-show="list.length<1">
            <van-empty image="error" description="暂无收货地址"/>
        </div>
        <van-address-list
                v-model="chosenAddressId"
                default-tag-text="默认"
                @select="select"
                @add="onAdd"
                @edit="edit"
                :list="list"
        />
    </div>
</template>

<script>
    import {homeService} from "../../api/home/home";
    import {UserService} from "../../api/user/user";
    import {cookie} from "../../assets/js/util";

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
                chosenAddressId: 0,
                list: [],
            };
        },
        created() {
            this.getAddressList()
        },
        mounted() {
        },
        methods: {
            getAddressList() {
                UserService.getAddress({
                    openid: cookie.getCookie("openid")
                }).then(res => {
                    let code = res.code
                    if(code === 400){
                        this.list = []
                        return
                    }
                    let list = []
                    let isDefault;
                    res.data.map(res=>{
                        if(res.default === 0){
                            isDefault = false
                        }else{
                            isDefault = true
                            this.chosenAddressId = res.id
                        }
                        list.push({
                            id:res.id,
                            tel:res.phone,
                            name:res.name,
                            address:res.address,
                            isDefault:isDefault
                        })
                        this.list = list
                    })
                })
            },
            onAdd() {
                this.$router.push({
                    path: '/my/addressAdd'
                })
            },
            select(index){
                let id = index.id;
                let data = {
                    openid:cookie.getCookie("openid"),
                    id:id
                }
                UserService.setAddress(data).then(res=>{
                    let code = res.code;
                    if(code === 200){
                        this.$toast.success("设置默认地址成功");
                        this.getAddressList();
                    }
                })
            },
            edit(index){
                this.$router.push({
                    path:'/my/addressEdit/'+index.id
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
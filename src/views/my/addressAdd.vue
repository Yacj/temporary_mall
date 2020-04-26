<template>
    <div id="addressAdd">
        <van-address-edit
                :area-list="areaList"
                :show-postal="false"
                show-delete
                show-set-default
                show-search-result
                @save="onSave"
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
        />
    </div>
</template>

<script>
    import areaList from './../../assets/js/area'
    import {UserService} from "../../api/user/user";
    import {cookie} from "../../assets/js/util";

    export default {
        name: "addressAdd",
        data() {
            return {
                areaList: areaList,
                searchResult: [],
            }
        },
        beforeCreate() {
            document.body.style.backgroundColor = 'rgb(245, 245, 245)'
        },
        beforeDestroy() {
            document.body.style.backgroundColor = ''
        },
        created() {
        },
        mounted() {
        },
        methods: {
            onSave(content) {
                let isDefault;
                if (content.isDefault === true) {
                    isDefault = 1
                } else {
                    isDefault = 0
                }
                let data = {
                    openid:cookie.getCookie("openid"),
                    name: content.name,
                    phone: content.tel,
                    address: content.addressDetail,
                    provincestr: content.province,
                    citystr: content.city,
                    areastr: content.county,
                    default: isDefault,
                    areacode:content.areaCode
                }
                UserService.saveAddress(data).then(res => {
                    let code = res.code
                    if (code !== 200) {
                        return this.$toast.fail(res.msg)
                    }
                    this.$toast.success(res.data.result)
                    this.$router.go(-1);
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
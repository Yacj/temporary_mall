<template>
    <div id="addressEdit">
        <van-address-edit :area-list="areaList"
                          :show-postal="false"
                          show-delete
                          show-set-default
                          show-search-result
                          :addressInfo="addressInfo"
                          @save="onSave"
                          @delete="onDelete"
        />
    </div>
</template>

<script>
    import areaList from './../../assets/js/area'
    import {UserService} from "../../api/user/user";
    import {cookie} from "../../assets/js/util";

    export default {
        name: "addressEdit",
        data() {
            return {
                id: 0,
                areaList: areaList,
                addressInfo: {}
            }
        },
        created() {
            this.id = this.$route.params.id
            this.getAddressDetail()
        },
        methods: {
            getAddressDetail() {
                UserService.getAddressDetail({
                    id: this.id
                }).then(res => {
                    let data = res.data
                    let isDefault;
                    isDefault = data.default !== 0;
                    this.addressInfo = {
                        name: data.name,
                        id: data.id,
                        tel: data.phone,
                        province: data.provincestr,
                        city: data.citystr,
                        county: data.areastr,
                        addressDetail: data.address,
                        areaCode: data.areacode,
                        isDefault: isDefault,
                    }
                })
            },
            onSave(content) {
                let isDefault;
                if (content.isDefault === true) {
                    isDefault = 1
                } else {
                    isDefault = 0
                }
                let data = {
                    openid:cookie.getCookie("openid"),
                    id:content.id,
                    name: content.name,
                    phone: content.tel,
                    address: content.addressDetail,
                    provincestr: content.province,
                    citystr: content.city,
                    areastr: content.county,
                    default: isDefault,
                    areacode:content.areaCode
                }
                UserService.editAddress(data).then(res => {
                    let code = res.code
                    if (code !== 200) {
                        return this.$toast.fail(res.msg)
                    }
                    this.$toast.success(res.data.result)
                    this.$router.go(-1);
                })
            },
            onDelete(content) {
                let data = {
                    id: content.id,
                }
                UserService.delAddress(data).then(res => {
                    let code = res.code
                    if (code === 200) {
                        this.$toast.success("删除成功")
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
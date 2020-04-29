<template>
    <div id="account">
        <div class="my-account">
            <p>账户余额 （元）</p>
            <h2>
                {{account}}
            </h2>
        </div>
        <div class="button">
            <van-button type="primary" size="large" round to="Recharge">去充值</van-button>
        </div>
    </div>
</template>

<script>
    import {wxService} from "../../api/wx/wx";
    import {cookie, storage} from "../../assets/js/util";

    export default {
        name: "account",
        data() {
            return {
                account:0
            }
        },
        created() {
            let openid = cookie.getCookie("openid");
            wxService.get_wx_user({
                openid: openid
            }).then(res => {
                let code = res.code
                let data = res.data
                if (code === 200) {
                    this.account = data.balance
                }
            })
        },
        mounted() {
        },
        methods: {

        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
#account{
    .my-account{
        background: linear-gradient(90deg,#7cd242 0,#5cbe80);
        padding: .6rem .2rem .5rem .2rem;
        color: #fff;
        p{
            font-size: .3rem;
        }
        h2{
            font-size: .6rem;
            font-weight: 500;
            padding: .1rem 0;
        }
    }
    .button{
        margin: .2rem;
    }
}
</style>
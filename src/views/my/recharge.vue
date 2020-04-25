<template>
    <div id="recharge">
        <div class="my-recharge">
            <p>
                充值金额
            </p>
            <label for="">
                <input type="number" value="" placeholder="请输入充值金额" v-model="Money">
            </label>
            <div class="button">
                <van-button type="primary" size="large" block>立即充值</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "recharge",
        data() {
            return {
                Money:''
            }
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
#recharge{
    .my-recharge{
        padding: 0.5rem .2rem .5rem .2rem;
        background: #fff;
        color: #544e4c;
        p{
            font-size: .35rem;
            padding-bottom: .5rem;
        }
        input{
            width: 100%;
            padding: .2rem .1rem .2rem .5rem;
            border: none;
            outline: none;
            border-bottom: solid 1px #BEBEBE;
            background: url(../../assets/img/money.png) no-repeat center left;
            background-size: .3rem;
            font-size: .4rem;
            color: #000;
        }
        .button{
            margin: .5rem 0;
        }
    }
}
</style>
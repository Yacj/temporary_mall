<template>
    <div id="cart">
        <div class="nav acea-row row-between-wrapper">
            <div>购物数量</div>
            <div class="span">
                {{num}}
            </div>
        </div>
        <div class="cartLit">
            <template v-if="cartList > 0">
            </template>
            <div class="nodata" v-else>
                <van-empty image="error" description="暂无商品，去添加点什么吧" />
            </div>
        </div>
        <tabbar :active="2"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "../../components/Tabbar/Tabbar";
    export default {
        name: "cart",
        components: {Tabbar},
        data() {
            return {
                num:0,
                cartList:[]
            }
        },
        created() {
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
#cart{
    width: 100%;
    position: absolute;
    .nav{
        width: 100%;
        height: .8rem;
        background-color: #fff;
        padding: 0 .3rem;
        font-size: .28rem;
        color: #282828;
        position: fixed;
        left: 0;
        z-index: 5;
        top: .16rem;
        border-bottom: 1px solid #f5f5f5;
        .num{
            color: #ff8500;
        }
    }
}
</style>
<template>
    <div id="goodsList">
        <router-link
                :to="{ path: '/detail/' + item.id }"
                class="item acea-row row-between-wrapper"
                v-for="(item, index) in goodList"
                :key="index"
        >
            <div class="picture">
                <img :src="item.img" alt="">
            </div>
            <div class="underLine">
                <div class="text">
                    <div class="line1">
                        {{item.name}}
                    </div>
                    <div class="money">
                        ￥ <span class="num">{{item.price}}</span>
                    </div>
                </div>
            </div>
            <van-icon name="cart-circle-o" class="icon acea-row row-center-wrapper"/>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        props: {
            goodList: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {}
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
#goodsList{
    padding-top: .3rem;
    .item{
        position: relative;
        padding-left: .3rem;
        background-color: #fff;
        .picture{
            width: 1.8rem;
            height: 1.8rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                border-radius: .06rem;
            }
        }
        .underLine{
            padding: .3rem .3rem .3rem 0;
            border-bottom: 1px solid #f5f5f5;
            .text{
                font-size: .3rem;
                color: #222;
                width: 4.89rem;
                text-align: left;
                .money{
                    font-size: .26rem;
                    font-weight: 700;
                    margin-top: .5rem;
                    color: #fc4141;
                    .num{
                        font-size: .34rem;
                    }
                }
            }
        }
        .icon{
            position: absolute;
            right: .3rem;
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
            font-size: .5rem;
            bottom: .38rem;
            color: #ff3700;
        }
    }
}
</style>
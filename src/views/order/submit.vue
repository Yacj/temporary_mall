<template>
    <div id="submit">
        <div class="allAddress">
            <div class="address acea-row row-between-wrapper">
                <div class="addressCon" v-if="addressInfo.name !== undefined && addressInfo.name.length > 0">
                    <div class="name">
                        {{addressInfo.name}}
                        <span class="phone">
                            {{addressInfo.phone}}
                        </span>
                    </div>
                    <div class="">
                        {{addressInfo.info}}
                    </div>
                </div>
                <div class="addressCon" v-else>
                    <div class="setAddress">
                        设置地址
                    </div>
                </div>
                <van-icon name="arrow" class="icon"/>
            </div>
            <div class="line">
                <img src="../../assets/img/line.jpg" alt="">
            </div>
        </div>
        <div class="orderGoods">
            <div class="total">
                共 {{total}} 件商品
            </div>
            <div class="goodWrapper">
                <div
                        class="item acea-row row-between-wrapper"
                        v-for="cart in cartInfo"
                        :key="cart.id"
                >
                    <div class="picture">
                        <img :src="cart.productInfo.image" class="image" />
                    </div>
                    <div class="text">
                        <div class="acea-row row-between-wrapper">
                            <div class="name line1">{{ cart.productInfo.store_name }}</div>
                            <div class="num">x {{ cart.cart_num }}</div>
                        </div>
                        <div class="attr line1" v-if="cart.productInfo.attrInfo">
                            {{ cart.productInfo.attrInfo.suk }}
                        </div>
                        <div class="money font-color-orange">￥{{ cart.truePrice }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="item">
                <div>支付方式</div>
                <div class="list">
                    <div
                            class="payItem acea-row row-middle"
                            :class="active === 'weixin' ? 'on' : ''"
                            @click="payItem('weixin')"
                    >
                        <div class="name acea-row row-center-wrapper">
                            <div
                                    class="iconfont icon-weixin21"
                                    :class="active === 'weixin' ? 'bounceIn' : ''"
                            ></div>
                            微信支付
                        </div>
                        <div class="tip">微信快捷支付</div>
                    </div>
                    <div
                            class="payItem acea-row row-middle"
                            :class="active === 'yue' ? 'on' : ''"
                            @click="payItem('yue')"
                    >
                        <div class="name acea-row row-center-wrapper">
                            <div
                                    class="iconfont icon-yue1"
                                    :class="active === 'yue' ? 'bounceIn' : ''"
                            ></div>
                            余额支付
                        </div>
                        <div class="tip">可用余额：{{ now_money || 0 }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="moneyList">
            <div class="item acea-row row-between-wrapper">
                <div>商品总价：</div>
                <div class="money">

                </div>
            </div>
        </div>
        <div class="footer acea-row row-between-wrapper">
            <div class="">合计
            <span>

            </span>
            </div>
            <div class="settlement">立即结算</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "submit",
        data() {
            return {
                addressInfo:{},
                total:0,
                cartInfo:[],
                now_money:0,
                active: 'weixin' ? "weixin" : "yue",
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
        methods: {
            payItem(index) {
                this.active = index;
            },
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
#submit{
    width: 100%;
    position: absolute;
    .allAddress{
        width: 100%;
        .address{
            height: 1.5rem;
            margin: 0 auto;
            padding: .28rem .3rem;
            background-color: #fff;
            .addressCon{
                width: 6.1rem;
                font-size: .26rem;
                color: #666;
                .name{
                    font-size: .3rem;
                    color: #282828;
                    font-weight: 700;
                    margin-bottom: .1rem;
                    .phone{
                        margin-left: .5rem;
                    }
                }
                .setAddress{
                    color: #333;
                    font-size: .28rem;
                }
            }
            .icon{
                font-size: .35rem;
                color: #707070;
            }
        }
        .line{
            width: 7.1rem;
            margin: 0 auto;
            height: .03rem;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
    .orderGoods{
        background-color: #fff;
        margin-top: .12rem;
        .total{
            width: 100%;
            height: .86rem;
            padding: 0 .3rem;
            border-bottom: .01rem solid #eee;
            font-size: .3rem;
            color: #282828;
            line-height: .86rem;
        }
        .goodWrapper{
            .item{
                margin-left: .3rem;
                padding-right: .3rem;
                border-bottom: .02rem solid #f0f0f0;
                height: 1.8rem;
                .picture{
                    width: 1.3rem;
                    height: 1.3rem;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: .06rem;
                    }
                }
                .text{
                    width: 5.37rem;
                    position: relative;
                    .name{
                        font-size: .28rem;
                        color: #282828;
                        width: 4.53rem;
                    }
                    .num{
                        font-size: .26rem;
                        color: #868686;
                    }
                    .money{
                        font-size: .26rem;
                        margin-top: .17rem;
                        color: #ff8500;
                    }
                }
            }
        }
    }
    .wrapper{
        background-color: #fff;
        margin-top: .13rem;
        .item{
            padding: .27rem .3rem;
            font-size: .3rem;
            color: #282828;
            border-bottom: 1px solid #f0f0f0;
            .list{
                margin-top: .35rem;
                .payItem{
                    border: 1px solid #eee;
                    border-radius: .06rem;
                    height: .86rem;
                    width: 100%;
                    margin-top: .2rem;
                    font-size: .28rem;
                    color: #282828;
                    .name{
                        width: 50%;
                        text-align: center;
                        border-right: 1px solid #eee;
                        .iconfont{
                            width: .44rem;
                            height: .44rem;
                            border-radius: 50%;
                            text-align: center;
                            line-height: .44rem;
                            background-color: #fe960f;
                            color: #fff;
                            font-size: .3rem;
                            margin-right: .15rem;
                        }
                        .icon-weixin21{
                            background-color: #41b035;
                        }
                    }
                    .tip{
                        width: 49%;
                        text-align: center;
                        font-size: .26rem;
                        color: #aaa;
                    }
                }
                .on{
                    border-color: $theme;
                    color: $theme;
                }
            }
        }
    }
    .moneyList{
        margin-top: .12rem;
        background-color: #fff;
        padding: .3rem;
        .item{
            font-size: .28rem;
            color: #282828;
        }
    }
    .footer{
        width: 100%;
        height: 1rem;
        background-color: #fff;
        padding: 0 .3rem;
        font-size: .28rem;
        color: #333;
        position: fixed;
        bottom: 0;
        left: 0;
        .settlement{
            font-size: .3rem;
            color: #fff;
            width: 2.4rem;
            height: .7rem;
            border-radius: .5rem;
            text-align: center;
            line-height: .7rem;
            background-color:$theme;
        }
    }
}
</style>
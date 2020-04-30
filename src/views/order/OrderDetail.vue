<template>
    <div id="OrderDetail">
        <header class="header acea-row row-middle"
                :class="refundOrder ? 'on': '' ">
            <div class="picture" v-if="!refundOrder">
                <img src="../../assets/img/orderdetail.gif" alt="">
            </div>
            <div class="data" :class="refundOrder ? 'on' : ''">
                <div class="state">{{statusMsg(orderInfo.status)}}</div>
                <div>
                    {{ orderInfo.time }}
                </div>
            </div>
        </header>
        <div class="address">
            <div class="name">
                {{addressInfo.name}}
                <span class="phone">{{addressInfo.phone}}</span>
            </div>
            <div>
                {{addressInfo.provincestr}}-{{addressInfo.citystr}}-{{addressInfo.areastr}} {{addressInfo.address}}
            </div>
        </div>
        <div class="line">
            <img src="../../assets/img/line.jpg" alt="">
        </div>
        <div class="orderGoods">
            <div class="total">
                共{{total}}件商品
            </div>
            <div class="goodWrapper">
                <div
                        class="item acea-row row-between-wrapper"
                        v-for="cart in orderInfo.batch"
                        :key="cart.id"
                >
                    <div class="picture">
                        <img :src="BaseUrl + cart.img" class="image"/>
                    </div>
                    <div class="text">
                        <div class="acea-row row-between-wrapper">
                            <div class="name line1">{{ cart.name}}</div>
                            <div class="num">x {{ cart.number}}</div>
                        </div>
                        <div class="money font-color-orange">￥{{ cart.price }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="item acea-row row-between">
                <div>订单编号：</div>
                <div class="conter acea-row row-middle row-right">
                    {{orderInfo.order}}
                </div>
            </div>
            <div class="item acea-row row-between">
                <div>下单时间：</div>
                <div class="conter acea-row row-middle row-right">
                    {{orderInfo.time}}
                </div>
            </div>
            <div class="item acea-row row-between">
                <div>支付方式：</div>
                <div class="conter acea-row row-middle row-right">
                    {{orderInfo.paytype === 1 ? '微信支付':'余额支付'}}
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="actualPay acea-row row-right">
                实付款：
                <div class="money">
                    ￥{{orderInfo.totalprice }}
                </div>
            </div>
        </div>
        <div style="height: 1.2rem;"></div>
        <div class="footer acea-row row-right row-middle">
            <template v-if="orderInfo.status === 0">
                <van-button plain hairline round type="default" size="small" class="bnt" @click="delOrder(orderInfo.id)">取消订单</van-button>
                <van-button round type="primary" size="small" style="margin-left: .18rem" @click="pay">立即付款</van-button>
            </template>
            <template v-if="orderInfo.status === 2">
                <van-button round type="primary" size="small" style="margin-left: .18rem" @click="urge">催发货</van-button>
            </template>
            <template v-if="orderInfo.status === 4">
                <van-button round type="primary" size="small" style="margin-left: .18rem" @click="setOrder(orderInfo.id)">确认收货</van-button>
            </template>
            <template v-if="orderInfo.status === 6">
                <van-button plain hairline round type="default" size="small" class="bnt" @click="delOrder(orderInfo.id)">删除订单</van-button>
                <van-button round type="primary" size="small" style="margin-left: .18rem"  to="/home">再逛逛</van-button>
            </template>
        </div>
    </div>
</template>

<script>
    import {OderService} from "../../api/order/order";
    import {BaseUrl, cookie, storage} from "../../assets/js/util";
    import {wxService} from "../../api/wx/wx";

    const STATUS = {
        "0": "请在10分钟之内完成支付",
        "2": "订单待发货",
        "4": "订单待收货",
        "6": "订单已完成"
    };
    export default {
        name: "OrderDetail",
        data() {
            return {
                id: "",
                orderInfo: {},
                addressInfo: {},
                total: 0,
                BaseUrl: BaseUrl,
            }
        },
        beforeRouteLeave(to, from, next){
            if(to.name === 'StatusOrder'){
                this.$router.push({name:'home'});
            }
            next();
        },
        created() {
            this.id = this.$route.params.id
            this.orderDetailData()
        },
        computed: {
            refundOrder() {
                return this.orderInfo.status > 0;
            }
        },
        methods: {
            urge(){
              this.$toast.success("已完成催促，请耐心等待")
            },
            statusMsg(status) {
                return STATUS[status];
            },
            async orderDetailData() {
                await OderService.getOrderDetail({
                    id: this.id
                }).then(res => {
                    console.log(res)
                    this.orderInfo = res.data
                    this.total = res.data.batch.length;
                    this.addressInfo = res.data.addressid
                })
            },
            pay() {
                let data = {
                    bodys: "pay" + this.orderInfo.order,
                    order: this.orderInfo.order,
                    price: this.orderInfo.totalprice,
                    openid: cookie.getCookie("openid")
                }
                wxService.wx_Pay(data).then(res => {
                    let data = res
                    this.onBridgeReady(data)
                })
            },
            onBridgeReady(data) {
                let that = this
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        'appId': data.appId,//公众号名称，由商户传入
                        'timeStamp': String(data.timeStamp),    //时间戳，自1970年以来的秒数。这里必须要转换为字符串。ios跟android表现不同。后台返回的是数值，但是微信方面必须要json参数都是字符串形式，android会自动转换成字符串（当时我在这里也找了很久的博文才知道的）
                        'nonceStr': data.nonceStr,//随机串
                        'package': data.package,
                        'signType': data.signType,//微信签名方式：
                        'paySign': data.paySign//微信签名
                    },
                    function (res) {
                        let msg = res.err_msg
                        let orderInfo = {}
                        orderInfo.addressid = that.addressId;
                        orderInfo.order = that.order;
                        orderInfo.batch = that.id
                        if (msg === 'get_brand_wcpay_request:ok') {
                            that.$toast.success("支付成功")
                            that.orderDetailData()
                        } else if (msg === 'get_brand_wcpay_request:cancel') {
                            that.$toast.fail("支付失败")
                        }
                    }
                )
            },
            delOrder(id){
                this.$dialog.confirm({
                    message:'确认要取消订单?'
                }).then(res=>{
                    OderService.delOrder({
                        id:id
                    }).then(res=>{
                        this.$toast.success("订单取消成功.")
                        this.$router.go(-1);
                    })
                })
            },
            setOrder(id){
                let data  = {
                    id:id,
                    status:6
                }
                this.$dialog.confirm({
                    message:'此订单确认已收货?'
                }).then(res=>{
                    OderService.setOrder(data).then(res=>{
                        this.$toast.success("订单修改成功.")
                        this.orderDetailData()
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    #OrderDetail {
        width: 100%;
        height: 100%;
        position: absolute;

        .header {
            padding: 0 .3rem;
            height: 1.5rem;
            background: $theme;

            .picture {
                width: 1.1rem;
                height: 1.1rem;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .data {
                color: hsla(0, 0%, 100%, .8);
                font-size: .24rem;
                margin-left: .27rem;

                .state {
                    font-size: .3rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: .07rem;
                }
            }
        }

        .on {
            background-color: #666;
        }

        .address {
            font-size: .26rem;
            color: #868686;
            background-color: #fff;
            padding: .25rem .3rem .3rem .3rem;

            .name {
                font-size: .3rem;
                color: #282828;
                margin-bottom: .1rem;

                .phone {
                    margin-left: .4rem;
                }
            }
        }

        .line {
            width: 100%;
            height: .03rem;

            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }

        .orderGoods {
            background-color: #fff;
            margin-top: .12rem;

            .total {
                width: 100%;
                height: .86rem;
                padding: 0 .3rem;
                border-bottom: .01rem solid #eee;
                font-size: .3rem;
                color: #282828;
                line-height: .86rem;
            }

            .goodWrapper {
                .item {
                    margin-left: .3rem;
                    padding-right: .3rem;
                    border-bottom: .02rem solid #f0f0f0;
                    height: 1.8rem;

                    .picture {
                        width: 1.3rem;
                        height: 1.3rem;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: .06rem;
                        }
                    }

                    .text {
                        width: 5.37rem;
                        position: relative;

                        .name {
                            font-size: .28rem;
                            color: #282828;
                            width: 4.53rem;
                        }

                        .num {
                            font-size: .26rem;
                            color: #868686;
                        }

                        .money {
                            font-size: .26rem;
                            margin-top: .17rem;
                            color: #ff8500;
                        }
                    }
                }
            }
        }

        .wrapper {
            background-color: #fff;
            margin-top: .12rem;
            padding: .3rem;

            .item {
                font-size: .28rem;
                color: #282828;

                .conter {
                    color: #868686;
                    width: 5rem;
                    text-align: right;
                }
            }

            .item ~ .item {
                margin-top: .2rem;
            }

            .actualPay {
                .money {
                    font-weight: 700;
                    font-size: .3rem;
                    color: #ff8500;
                }
            }
        }

        .footer {
            width: 100%;
            height: 1rem;
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #fff;
            padding: 0 .3rem;
            border-top: 1px solid #eee;

            .bnt {
                color: #aaa;
                border: 1px solid #ddd;
            }
        }
    }
</style>
<template>
    <div id="recharge">
        <div class="my-recharge">
            <p>
                充值金额
            </p>
            <!--            <label for="">-->
            <!--                <input type="number" value="" placeholder="请输入充值金额" v-model="Money">-->
            <!--            </label>-->
            <div class="recharge-list ">
                <ul>
                    <li class="acea-row row-middle" v-for="(item,index) in rechargeList"
                        @click="addClass(item.price)"
                        :class="{on:item.price === current}">
                        <div class="name">
                            <h1>优惠{{index+1}}：</h1>
                        </div>
                        <div class="price1">
                            <h2>
                                充值
                                <em>￥{{item.price1}}</em>
                            </h2>
                        </div>
                        <div class="price2">
                            <h2>
                                <em>送</em>
                                ￥ {{item.price2}}
                            </h2>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="button">
                <van-button type="primary" size="large" block @click="pay" color="#fe941f">立即充值</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {wxService} from "../../api/wx/wx";
    import {cookie, storage} from "../../assets/js/util";
    import {UserService} from "../../api/user/user";

    export default {
        name: "recharge",
        data() {
            return {
                Money: '',
                order: '',
                current: 0,
                rechargeList: [
                    {
                        price1: '500',
                        price2: '50',
                        price:500,
                    },
                    {
                        price1: '1000',
                        price2: '120',
                        price:1000
                    },
                    {
                        price1: '2000',
                        price2: '300',
                        price:2000
                    }
                ]
            }
        },
        mounted() {
            this.getOrder()
        },
        methods: {
            getOrder(){
                let time = new Date();
                let Year = time.getFullYear()
                let Month = ("0" + (time.getMonth() + 1)).slice(-2);
                let getDate = time.getDate();
                this.order = Year + "" + Month + "" + getDate + this.randomString(5)
            },
            pay() {
                if (this.current === 0) {
                    return this.$toast.fail('请选择充值金额')
                }
                this.Money = this.current
                this.getOrder()
                let data = {
                    bodys: "充值" + this.order,
                    order: this.order,
                    price: this.Money,
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
                        if (msg === 'get_brand_wcpay_request:ok') {
                            that.$toast.success("充值成功")
                            that.addBalance()
                        } else if (msg === 'get_brand_wcpay_request:cancel') {
                            that.$toast.fail("充值失败")
                        }
                    }
                )
            },
            addBalance() {
                let data = {
                    order: this.order,
                    price: this.Money,
                    uid: storage.get("uid"),
                    status: 1
                }
                UserService.addBalance(data).then(res => {
                    let code = res.code
                    if (code !== 200) {
                        return this.$toast.fail(res.data.success)
                    }
                    this.$toast.success(res.data.success)
                })
            },
            randomString(len) {
                //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
                var chars = '0123456789';
                var tempLen = chars.length, tempStr = '';
                for (var i = 0; i < len; ++i) {
                    tempStr += chars.charAt(Math.floor(Math.random() * tempLen));
                }
                return tempStr;
            },
            addClass(price){
                this.current=price;
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #recharge {
        .my-recharge {
            padding: 0.5rem .2rem .5rem .2rem;
            background: #fff;
            color: #544e4c;

            p {
                font-size: .35rem;
                padding-bottom: .5rem;
            }

            input {
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

            .recharge-list {
                ul {
                    .on {
                        border: 1px solid #ca9563;
                        background: #f9f2ea;
                    }

                    li {
                        border: 1px solid #c6c6c6;
                        border-radius: 5px;
                        margin-bottom: 15px;
                        padding: 14px 15px;

                        .name {
                            width: 30%;

                            h1 {
                                font-weight: normal;
                                font-size: 15px;
                                color: #666666;
                            }
                        }

                        .price1 {
                            flex: 1;
                            min-width: 0;
                            font-size: 16px;
                            color: #333;

                            h2 {
                                color: #444;
                                font-weight: normal;
                            }
                        }

                        .price2 {
                            font-size: 15px;
                            color: #444;
                            font-weight: normal;

                            h2 {
                                em {
                                    background:red;
                                    color: #fff;
                                    border-radius: 2px;
                                    padding: 0.02rem 0.08rem;
                                    font-weight: normal;
                                }

                                color: #444;
                                font-weight: normal;
                            }
                        }
                    }
                }
            }

            .button {
                margin: .5rem 0;
            }
        }
    }
</style>
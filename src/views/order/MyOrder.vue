<template>
    <div id="MyOrder">
        <div class="header">
            <div class="acea-row row-between-wrapper picTxt">
                <div class="text">
                    <div class="name">订单信息</div>
                </div>
                <div class="picture">
                    <img src="../../assets/img/orderTime.png" alt="">
                </div>
            </div>
        </div>
        <div class="nav">
            <van-tabs v-model="active"
                      animated
                      sticky
                      :border="false"
                      color="#28BE57"
                      title-active-color="#28BE57"
            >
                <!-- 待支付 -->
                <van-tab v-for="(item,index) in itemsTitle" :key="index">
                    <div slot="title" @click="to_next(item.status)">
                        {{item.title}}
                    </div>
                    <OrderType :order-type-data-array="ArrayList"></OrderType>
                </van-tab>
            </van-tabs>
        </div>

    </div>
</template>

<script>
    import OrderType from "./OrderType";
    import {OderService} from "../../api/order/order";
    import {cookie} from "../../assets/js/util";


    export default {
        name: "MyOrder",
        components: {OrderType},
        data() {
            return {
                active: '',
                itemsTitle: [
                    {
                        title: '全部',
                        status: 88
                    },
                    {
                        title: '待付款',
                        status: 0
                    },
                    {
                        title: '待发货',
                        status: 2
                    },
                    {
                        title: '待收货',
                        status: 4
                    },
                ],
                ArrayList: []
            }
        },
        created() {
            this.getOrderData()
        },
        mounted() {
            let type = parseInt(this.$route.params.type) || 0
            let status;
            switch (type) {
                case 1:
                    status = 0
                    break;
                case 2:
                    status = 2
                    break;
                case 3:
                    status = 4
                    break;
            }
            this.getOrderData(status)
            this.active = parseInt(this.$route.params.type) || 0
        },
        methods: {
            to_next(status) {
                this.ArrayList = []
                this.getOrderData(status)
            },
            async getOrderData(status) {
                let statusData;
                this.toast = this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0
                });
                if (status === undefined) {
                    statusData = 88;
                } else {
                    statusData = status
                }
                let data = {
                    openid: cookie.getCookie("openid"),
                    status: statusData
                }
                await OderService.getOrder(data).then(res => {
                    let code = res.code
                    if (code === 400) {
                        this.ArrayList = [];
                        this.toast.clear()
                        return
                    }
                    this.ArrayList = res.data
                    this.toast.clear()
                })
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #MyOrder {
        position: absolute;
        width: 100%;

        .header {
            height: 2.3rem;
            padding: 0 .3rem;
            background: $theme;

            .picTxt {
                height: 1.9rem;

                .text {
                    color: hsla(0, 0%, 100%, .8);
                    font-size: .26rem;

                    .name {
                        font-size: .34rem;
                        font-weight: 700;
                        color: #fff;
                        margin-bottom: .2rem;
                    }
                }

                .picture {
                    width: 1.22rem;
                    height: 1.09rem;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .nav {
        }
    }
</style>
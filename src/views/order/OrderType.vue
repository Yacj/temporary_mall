<template>
    <div id="OrderType">
        <template v-if="orderTypeDataArray.length>0">
            <div class="list">
                <div class="item" v-for="(item,index) in orderTypeDataArray">
                    <div class="title acea-row row-between-wrapper">
                        <div class="acea-row row-middle">
                            {{item.time}}
                        </div>
                        <div class="font">
                            {{ getStatus(item.status)}}
                        </div>
                    </div>
                    <div @click="$router.push({ path: '/order/detail/' + item.id})">
                        <div class="item-info acea-row row-between row-top"
                             v-for="cart in item.batch"
                             :key="cart.id">
                            <div class="picture">
                                <img :src="baseUrl + cart.img" alt="">
                            </div>
                            <div class="text acea-row row-between">
                                <div class="name">
                                    {{cart.name}}
                                </div>
                                <div class="money">
                                    <div>
                                        ￥{{cart.price}}
                                    </div>
                                    <div class="">
                                        x {{cart.number}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="totalPrice">
                        总金额
                        <span class="money">
                            ￥{{item.totalprice}}
                        </span>
                    </div>
                    <div class="bottom acea-row row-right row-middle">

                    </div>
                </div>
            </div>
        </template>
        <div v-else
             class="noDataPlaceHold">
            <van-empty image="error" description="暂无订单"/>
        </div>
    </div>
</template>

<script>
    import {BaseUrl} from "../../assets/js/util";

    const STATUS = {
        "0":"待付款",
        "2":"待发货",
        "4":"待收货",
        "6":"已完成"
    };

    export default {
        name: "OrderType",
        props: {
            orderTypeDataArray: Array,
        },
        data() {
            return {
                baseUrl: BaseUrl,
                totalPrice:0
            }
        },
        mounted() {
        },
        methods: {
            getStatus(status) {
                return STATUS[status];
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #OrderType {
        .list {
            width: 6.9rem;
            margin: .14rem auto 0 auto;
            .item{
                background-color: #fff;
                border-radius: .06rem;
                margin-bottom: .14rem;
                .title{
                    height: .84rem;
                    padding: 0 .3rem;
                    border-bottom: .01rem solid #eee;
                    font-size: .28rem;
                    color: #282828;
                    .font{
                        color: $theme;
                    }
                }
                .item-info{
                    padding: 0 .3rem;
                    margin-top: .22rem;
                    .picture{
                        width: 1.2rem;
                        height: 1.2rem;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: .06rem;
                        }
                    }
                    .text{
                        width: 4.86rem;
                        font-size: .28rem;
                        color: #999;
                        margin-top: .06rem;
                        .name{
                            width: 3.06rem;
                            color: #282828;
                        }
                        .money{
                            text-align: right;
                        }
                    }
                }
                .totalPrice{
                    font-size: .26rem;
                    color: #282828;
                    text-align: right;
                    margin: .27rem 0 0 .3rem;
                    padding: 0 .3rem .3rem 0;
                    border-bottom: .01rem solid #eee;
                    .money{
                        font-size: .28rem;
                        font-weight: 700;
                        color: #ff8500;
                    }
                }
            }
        }
    }
</style>
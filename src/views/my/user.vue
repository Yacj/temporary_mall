<template>
    <div id="user">
        <div class="header acea-row row-between-wrapper">
            <div class="acea-row row-between-wrapper">
                <div class="picture">
                    <img :src="userAvatar === '' ? require('../../assets/img/avatar.png'):userAvatar" alt="">
                </div>
                <div class="text">
                    <div class="acea-row row-middle">
                        <div class="name">
                            {{userName}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="order">
                <div class="title acea-row row-between-wrapper">
                    <div class="">我的订单</div>
                    <router-link :to="'/order/list/'" class="allOrder">
                        全部订单
                        <van-icon name="arrow" class="icon"/>
                    </router-link>
                </div>
                <div class="orderState acea-row row-middle">
                    <router-link :to="{ path: '/order/list/' + 1 }" class="item">
                        <div class="picture">
                            <img src="../../assets/img/order/fukuan.png"/>
                        </div>
                        <div>待付款</div>
                    </router-link>
                    <router-link :to="{ path: '/order/list/' + 2 }" class="item">
                        <div class="picture">
                            <img src="../../assets/img/order/fahuo.png"/>
                        </div>
                        <div>待发货</div>
                    </router-link>
                    <router-link :to="{ path: '/order/list/' + 3 }" class="item">
                        <div class="picture">
                            <img src="../../assets/img/order/shouhuo.png"/>
                        </div>
                        <div>待收货</div>
                    </router-link>
                    <router-link :to="{ path: '/order/list/' + 4 }" class="item">
                        <div class="picture">
                            <img src="../../assets/img/order/wancheng.png"/>
                        </div>
                        <div>已完成</div>
                    </router-link>
                </div>
            </div>
<!--            <div class="property">-->
<!--                <div class="title acea-row row-between-wrapper">-->
<!--                    <div class="">我的财产</div>-->
<!--                </div>-->
<!--                <div class="nav acea-row row-middle">-->
<!--                    <router-link :to="{ path: '/user/account' }" class="item">-->
<!--                        <div class="num">{{now_money}}</div>-->
<!--                        <div>余额</div>-->
<!--                    </router-link>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="service">-->
<!--                <div class="title acea-row row-between-wrapper">-->
<!--                    <div class="">我的服务</div>-->
<!--                </div>-->
<!--                <div class="serviceList acea-row row-middle">-->
<!--                    <template v-for="(item, index) in MyMenus">-->
<!--                        <div-->
<!--                                class="item"-->
<!--                                :key="index"-->
<!--                                @click="goPages(index)"-->
<!--                        >-->
<!--                            <div class="picture">-->
<!--                                <img :src="item.pic" alt=""/>-->
<!--                            </div>-->
<!--                            <div>{{ item.name }}</div>-->
<!--                        </div>-->
<!--                    </template>-->
<!--                    &lt;!&ndash;<div&ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->
            <div class="cell">
                <router-link to="/my/account">
                    <van-cell title="我的余额" is-link :value="Balance" icon="balance-o" />
                </router-link>
                <router-link to="/my/address">
                    <van-cell title="收货地址" is-link  icon="location-o" />
                </router-link>
            </div>
        </div>

        <tabbar :active="2"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "../../components/Tabbar/Tabbar";
    import {storage} from "../../assets/js/util";

    export default {
        name: "user",
        components: {Tabbar},
        data() {
            return {
                userAvatar: '',
                userName: '登陆',
                MyMenus: [
                    {
                        name: '地址信息',
                        pic: require('../../assets/img/order/address.png')
                    }
                ],
                now_money:0,
                Balance:0
            }
        },
        beforeCreate() {
            document.body.style.backgroundColor = 'rgb(245, 245, 245)'
        },
        beforeDestroy() {
            document.body.style.backgroundColor = ''
        },
        created() {
            this.getUserData()
        },
        mounted() {
            // this.$store.commit('showLoading')
        },
        methods: {
            getUserData() {
                let Info = storage.get('wxInfo')
                this.userAvatar = Info["headimgurl"];
                this.userName = Info["nickname"]
            },
            goPages() {

            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    @mixin title{
        height: .88rem;
        padding: 0 .3rem;
        border-bottom: 1px dashed #eee;
        font-size: .3rem;
        color: #282828;
    }
    #user {
        width: 100%;
        height: 100%;
        position: absolute;

        .header {
            padding: 0 .3rem;
            height: 1.9rem;
            position: relative;
            background: $theme;

            &:after {
                position: absolute;
                left: 0;
                right: 0;
                bottom: -.98rem;
                z-index: -1;
                content: "";
                height: 1rem;
                width: 100%;
                border-radius: 0 0 50% 50%;
                background-color: #00c049;
            }

            .picture {
                width: 1.2rem;
                height: 1.2rem;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: .03rem solid #f5f5f5;
                }
            }

            .text {
                width: 4.34rem;
                color: #fff;
                margin-left: .35rem;
                text-align: left;

                .name {
                    font-size: .32rem;
                    max-width: 2.6rem;
                    width: unset;
                }
            }
        }

        .wrapper {
            padding: 0.2rem;
            .property{
                background-color: #fff;
                margin-top: .15rem;
                border-radius: .1rem;
                .title{
                    @include title
                }
                .nav{
                    background-color: #fff;
                    border-radius: .06rem;
                    height: 1.4rem;
                    .item{
                        width: 25%;
                        text-align: center;
                        font-size: .26rem;
                        color: #333;
                        .num{
                            margin-top: .1rem;
                            font-size: .36rem;
                            color: #282828
                        }
                    }
                }
            }
            .order {
                background-color: #fff;
                border-radius: .1rem;
                margin-top: .15rem;

                .title {
                    @include title;
                    .allOrder {
                        font-size: .26rem;
                        color: #666;

                        .icon {
                            font-size: .25rem;
                            margin-left: .07rem;
                            top: 2px;
                            position: relative;
                        }
                    }
                }

                .orderState {
                    height: 1.6rem;

                    .item {
                        font-size: .26rem;
                        color: #454545;
                        flex: 1;
                        text-align: center;

                        .picture {
                            width: .5rem;
                            height: .5rem;
                            margin: 0 auto .18rem auto;
                            position: relative;

                            img {
                                height: 100%;
                            }
                        }
                    }
                }
            }

            .service {
                background-color: #fff;
                margin-top: .15rem;
                border-radius: .1rem;

                .title {
                    @include title;
                }
                .serviceList {
                    padding: .08rem 0 .27rem 0;

                    .item {
                        width: 25%;
                        text-align: center;
                        font-size: .26rem;
                        color: #333;
                        margin-top: .3rem;

                        .picture {
                            width: .52rem;
                            height: .52rem;
                            margin: 0 auto .16rem auto;
                            position: relative;

                            img {
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .cell{
                background-color: #fff;
                margin-top: .15rem;
                border-radius: .1rem;
            }
        }
    }
</style>
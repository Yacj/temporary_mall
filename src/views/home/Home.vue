<template>
    <div class="home">
        <div class="swiper">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item
                        v-for="(item,index) in banner"
                        :key="index">
                    <img :src="item.filepath" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="notice">
            <van-notice-bar text="上线了" left-icon="volume-o"/>
        </div>
        <div class="wrapper">
            <div class="title acea-row row-center-wrapper">
                <img src="../../assets/img/leftTxt.png" alt="">
                <span class="text">
                   人气推荐
                </span>
                <img src="../../assets/img/leftTxt.png" alt="" class="right">
            </div>
            <div class="hotList acea-row row-middle">
                <router-link
                        :to="{ path: '/detail/' + item.id }"
                        class="item"
                        v-for="(item, index) in HotList"
                        :key="index"
                >
                    <div class="picture">
                        <img :src="BaseUrl+item.img" alt="">
                    </div>
                    <div class="text">
                        <div class="name line1">{{ item.name }}</div>
                        <div class="money font-color-orange">
                            ￥<span class="num">{{ item.price }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="wrapper">
            <div class="title acea-row row-center-wrapper">
                <img src="../../assets/img/leftTxt.png" alt="">
                <span class="text">
                    精品推荐
                </span>
                <img src="../../assets/img/leftTxt.png" alt="" class="right">
            </div>
            <div class="Product acea-row row-between-wrapper">
                <router-link
                        :to="{ path: '/detail/' + item.id }"
                        class="item"
                        v-for="(item, index) in ProductList"
                        :key="index"
                >
                    <div class="picture">
                        <img :src="BaseUrl+item.img" alt="">
                    </div>
                    <div class="text">
                        <div class="name line1">{{ item.name }}</div>
                        <div class="money font-color-orange">
                            ￥<span class="num">{{ item.price }}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="" style="height: 1.2rem"></div>
        <tabbar :active="0"></tabbar>
    </div>
</template>

<script>

    import Tabbar from "../../components/Tabbar/Tabbar.vue";
    import {homeService} from "../../api/home/home";
    import {BaseUrl} from "../../assets/js/util";

    export default {
        name: 'Home',
        components: {Tabbar},
        data() {
            return {
                banner: [],
                HotList:[],
                ProductList: [],
                BaseUrl: BaseUrl
            }
        },
        beforeCreate() {
            document.body.style.backgroundColor = 'rgb(245, 245, 245)'
        },
        beforeDestroy() {
            document.body.style.backgroundColor = ''
        },
        created() {
            this.getHomeData()
        },
        mounted() {
            // this.$store.commit('showLoading')
            //    this.$store.commit('hideLoading')
        },
        methods: {
            async getHomeData() {
                await homeService.Get_API_PC_Image().then(res => {
                    let data = res.data;
                    this.banner = data
                })
                await homeService.getGoods().then(res=>{
                    let data = res.data;
                    this.HotList = data
                })
                await homeService.getProduct().then(res => {
                    let data = res.data;
                    this.ProductList = data
                })
            },
            test() {
                this.$router.push({
                    path: '/login',
                    query: {
                        userId: '123'
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @mixin title {
        border-top: 1px solid #eee;
        padding-top: .34rem;
        margin: 0 .3rem;
    }

    .home {
        .my-swipe {
            height: 200px;

            img {
                width: 100%;
                height: 200px;
            }
        }

        .notice {
            border-bottom: .2rem solid #f3f5f7;
        }

        .wrapper {
            width: 100%;
            background-color: #fff;
            margin-top: .2rem;

            .title {
                font-size: .34rem;
                font-weight: 700;
                color: #282828;
                height: .97rem;

                img {
                    width: .42rem;
                    height: .26rem;
                    display: block;
                }

                .text {
                    padding: 0 .2rem;
                }

                .right {
                    transform: rotate(180deg);
                }
            }

            .Product {
                padding: 0 .3rem;
                margin-top: -.14rem;

                .item {
                    width: 3.3rem;
                    border: 1px solid #e5e5e5;
                    border-radius: .06rem;
                    margin-top: .29rem;

                    .picture {
                        width: 100%;
                        height: 3.3rem;

                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: .06rem .06rem 0 0;
                        }
                    }

                    .text {
                        padding: .18rem .15rem .27rem .15rem;
                        .name{
                            font-size: .3rem;
                            color: #282828;
                        }
                        .money{
                            font-weight: 700;
                            font-size: .26rem;
                            margin: .03rem 0 .06rem 0;
                            color: #ff8500;
                            .num{
                                font-size: .34rem;
                            }
                        }
                    }
                }
            }
            .hotList{
                padding: 0 .3rem;
                .item{
                    width: 2.18rem;
                    margin: .17rem .18rem 0 0;
                    &:nth-of-type(3n){
                        margin-right: 0;
                    }
                    .picture{
                        width: 100%;
                        height: 2.18rem;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: .06rem;
                        }
                    }
                    .name{
                        font-size: .26rem;
                        color: #333;
                        margin-top: .15rem;
                    }
                    .money{
                        font-size: .3rem;
                        font-weight: 700;
                        color: #ff8500;
                    }
                }
            }
        }
    }
</style>

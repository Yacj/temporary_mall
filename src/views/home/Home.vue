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
        <div class="recommend">
            <div class="title acea-row row-between-wrapper">
                <div class="text">
                    <div class="name">
                        精品推荐
                    </div>
                </div>
                <router-link :to="{ path: '/hot_new_goods/' + 1 }" class="more">
                    更多
                    <van-icon name="arrow" class="icon"/>
                </router-link>
            </div>
            <goods-list :good-list="recommendList"></goods-list>
        </div>
        <tabbar :active="0"></tabbar>
    </div>
</template>

<script>

    import Tabbar from "../../components/Tabbar/Tabbar.vue";
    import {homeService} from "../../api/home/home";
    import GoodsList from "../../components/goodsList/GoodsList";

    export default {
        name: 'Home',
        components: {GoodsList, Tabbar},
        data() {
            return {
                banner: [],
                recommendList:[
                    {
                        name:'1',
                        price:232
                    },
                    {
                        name:'2',
                        price:500
                    }
                ]
            }
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

        .recommend {
            .title {
                @include title;
                .text{
                    font-size: .24rem;
                    color: #999;
                    width: 5.3rem;
                    text-align: left;
                    .name{
                        color: #282828;
                        font-size: .3rem;
                        font-weight: 700;
                        margin-bottom: .05rem;
                        position: relative;
                    }
                }
                .more{
                    font-size: .26rem;
                    color: #333;
                    .icon{
                        margin-left: .02rem;
                        font-size: .26rem;
                    }
                }
            }
        }
    }
</style>

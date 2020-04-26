<template>
    <div id="category">
        <div class="aside">
            <div
                    class="item acea-row row-center-wrapper"
                    :class="index === navActive ? 'font-color-green' : ''"
                    v-for="(item, index) in categoryTwo"
                    :key="index"
                    @click="twoSortTap(index,item.id)"
            >
                <span>{{ item.name }}</span>
            </div>
        </div>
        <div class="content">
            <div class="list">
                <template v-if="productList.length > 0 ">
                    <router-link
                            class="item acea-row row-between-wrapper van-hairline--bottom"
                            v-for="(item, index) in productList"
                            :key="index"
                            :to="{ path: '/detail/' + item.id }"
                    >
                        <div class="picture">
                            <img :src="baseUrl + item.img"/>
                        </div>
                        <div class="text">
                            <div class="name line1">{{ item.name }}</div>
                            <div class="sales">介绍：{{ item.content }}</div>
                            <div class="money font-color-orange">
                                ￥<span class="num">{{ item.price }}</span>
                            </div>
                        </div>
                    </router-link>
                </template>
                <div class="nodata" v-else>
                    <van-empty image="error" description="暂无数据" />
                </div>
            </div>
        </div>
        <div style="height:1.2rem;"></div>
        <tabbar :active="1"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "../../components/Tabbar/Tabbar";
    import {homeService} from "../../api/home/home";
    import {BaseUrl} from "../../assets/js/util";

    export default {
        name: "category",
        components: {Tabbar},
        data() {
            return {
                navActive: 0,
                active:0,
                baseUrl:BaseUrl,
                categoryTwo: [],
                productList: []
            }
        },
        created() {
            this.getColumnData()
        },
        methods: {
            async getColumnData() {
                await homeService.getColumn().then(res => {
                    this.categoryTwo = res.data
                    this.active = res.data[0].id
                    this.getColumnList()
                })
            },
            twoSortTap(index,id) {
                this.navActive = index
                this.active = id
                this.productList = []
                this.getColumnList();
            },
           async getColumnList() {
                let data = {
                    id: this.active
                }
               await homeService.commodity(data).then(res=>{
                    this.productList = res.data
                })
            },
            goDetail(index) {
                console.log(index)
            }
        }
    }
</script>

<style scoped lang="scss">

    #category {
        width: 100%;
        height: 100%;
        position: absolute;

        .aside {
            position: fixed;
            width: 1.8rem;
            left: 0;
            top: 0;
            bottom: 0;
            background-color: #f7f7f7;
            overflow-y: auto;
            overflow-x: hidden;

            .item {
                height: .98rem;
                width: 100%;
                font-size: .26rem;
                color: #424242;
                position: relative;
            }

            .font-color-green {
                background-color: #fff;
                width: 100%;
                text-align: center;
                color: $theme;
                font-weight: 700;
                font-size: .28rem;

                &:before {
                    position: absolute;
                    width: .04rem;
                    height: .35rem;
                    background-color: $theme;
                    top: 50%;
                    margin-top: -.175rem;
                    left: 0;
                    content: "";
                }
            }
        }
        .content{
            background: #fff;
            margin: 0.2rem 0 0 1.8rem;
            .list{
                padding: 0 .2rem 0 .17rem;
                .item{
                    margin-bottom: .35rem;
                    width: 5.33rem;
                    position: relative;
                    .picture{
                        width: 1.58rem;
                        height: 1.58rem;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: .06rem;
                        }
                    }
                    .text{
                        width: 3.55rem;
                        .name{
                            font-size: .3rem;
                            color: #222;
                            margin-top: .05rem;
                        }
                        .sales{
                            font-size: .22rem;
                            color: #aaa;
                            margin-top: .08rem;
                        }
                        .money{
                            font-size: .28rem;
                            margin-top: .18rem;
                            color: #ff8500;
                            .num{
                                font-size: .3rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
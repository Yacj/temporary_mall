<template>
    <div id="OrderType">
        <template v-if="orderTypeDataArray.length>0">
            <div class="list">
<!--                <div class="item" v-for="(item,index) in orderTypeDataArray">-->
<!--                    <div class="title acea-row row-between-wrapper">-->
<!--                        <div class="acea-row row-middle">-->
<!--                            {{item.time}}-->
<!--                        </div>-->
<!--                        <div class="font">-->
<!--                            {{item.status}}-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="">-->
<!--                        <div class="item-info acea-row row-between row-top">-->

<!--                        </div>-->
<!--                    </div>-->
<!--                 -->
<!--                </div>-->
                <van-card
                        num="2"
                        price="2.00"
                        desc="描述信息"
                        title="商品标题"
                        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                        v-for="(item,index) in orderTypeDataArray"
                >
                    <template #price-top>
                        <van-button size="mini">按钮</van-button>
                    </template>
                    <template #footer>
                        <van-button size="mini">{{item.name}}</van-button>
                        <van-button size="mini">按钮</van-button>
                    </template>
                </van-card>
            </div>
        </template>
        <div v-else
             class="noDataPlaceHold">
            <van-empty image="error" description="暂无数据" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderType",
        props: {
            orderTypeDataArray: Array
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
    #OrderType{
        .list{
            margin: .14rem auto 0 auto;
        }
    }
</style>
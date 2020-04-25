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
                    <div slot="title" @click="to_next(index)">
                        {{item}}
                    </div>
                    <OrderType :order-type-data-array="ArrayList"></OrderType>
                </van-tab>
            </van-tabs>
        </div>

    </div>
</template>

<script>
    import OrderType from "./OrderType";
    export default {
        name: "MyOrder",
        components: {OrderType},
        data() {
            return {
                active:'',
                itemsTitle: ['全部','待付款', '待发货', '待收货','已完成'],
                ArrayList:[
                    {
                        name:'付款'
                    }
                ]
            }
        },
        beforeCreate() {
            document.body.style.backgroundColor = 'rgb(245, 245, 245)'
        },
        beforeDestroy() {
            document.body.style.backgroundColor = ''
        },
        created() {
            this.getOrderData()
        },
        mounted() {
            this.active= parseInt(this.$route.params.type) || 0
        },
        methods: {
            to_next(index){
                console.log(index)
            },
            getOrderData(){
                console.log(this.active);
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
#MyOrder{
    position: absolute;
    width: 100%;
    .header{
        height: 2.3rem;
        padding: 0 .3rem;
        background: $theme;
        .picTxt{
            height: 1.9rem;
            .text{
                color: hsla(0,0%,100%,.8);
                font-size: .26rem;
                .name{
                    font-size: .34rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: .2rem;
                }
            }
            .picture{
                width: 1.22rem;
                height: 1.09rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .nav{
    }
}
</style>
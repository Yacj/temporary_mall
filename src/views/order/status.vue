<template>
    <div id="status">
        <div class="iconfont icon-duihao2" v-if="status === '2'">
        </div>
        <div class="iconfont icon-chahao2" v-else style="background: red;text-shadow: none">
        </div>
        <div class="status">
            {{orderstatus}}
        </div>
        <div class="wrapper">
            <div class="item acea-row row-between-wrapper">
                <div class="">订单编号</div>
                <div class="itemCom">
                    {{order_id}}
                </div>
            </div>
            <div class="item acea-row row-between-wrapper">
                <div>下单时间</div>
                <div class="itemCom">
                    {{orderTime}}
                </div>
            </div>
        </div>
        <div class="">
            <van-button type="primary" block round style="margin-bottom: 0.2rem"  @click="$router.push({ path: '/order/detail/' + id })">查看订单</van-button>
            <van-button  type="primary" plain block round to="/home">返回首页</van-button>
        </div>
    </div>
</template>

<script>
    import {OderService} from "../../api/order/order";
    import {cookie, formatDate, storage, timestampToTime} from "../../assets/js/util";

    export default {
        name: "status",
        data() {
            return {
                id:'',
                status:'2',
                orderstatus:'',
                order_id:'',
                orderTime:''
            }
        },
        created() {
            this.getStatus()
        },
        methods: {
            getStatus(){
                let order = storage.get('order')
                let data = {
                    batch:order.batch,
                    openid:cookie.getCookie("openid"),
                    addressid:order.addressid,
                    order:order.order,
                    status:order.status
                }
                OderService.saveOrder(data).then(res=>{
                    let data = res.data;
                    this.order_id = data.order;
                    this.orderTime = timestampToTime(data.time)
                    this.status = data.status
                    this.id =data.id
                    if(data.status === "0"){
                        this.orderstatus = '支付失败'
                    }else{
                        this.orderstatus = '支付成功'
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
#status{
    background-color: #fff;
    margin: 1.95rem auto 0 -3.45rem;
    border-radius: .1rem;
    padding: .01rem 0 .28rem 0;
    width: 6.9rem;
    left: 50%;
    position: absolute;
    .iconfont{
        font-size: .7rem;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 1.3rem;
        text-shadow: 0 4px 0 $theme;
        background: $theme;
        border: .06rem solid #f5f5f5;
        margin: -.76rem auto 0 auto;
    }
    .status{
        font-size: .32rem;
        font-weight: 700;
        text-align: center;
        margin: .25rem 0 .37rem 0;
    }
    .wrapper{
        border: 1px solid #eee;
        margin: 0 .3rem .47rem .3rem;
        padding: .35rem 0;
        border-left: 0;
        border-right: 0;
        .item{
            font-size: .28rem;
            color: #282828;
            .itemCom{
                color: #666;
            }
        }
        .item~.item{
            margin-top: .2rem;
        }
    }
}
</style>
<template>
    <div id="detail">
        <div class="goodsDetail">
            <div>
                <div class="goodsImg">
                    <img src="https://img.ddimg.mobi/product/73729284b788d1558072397291.jpg!deliver.product.list" alt="">
                </div>
                <div class="wrapper">
                    <div class="introduce">方便面</div>
                    <div class="title acea-row row-between row-bottom">
                        <div class="money">
                            ￥
                            <span class="num">
                            279
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-intro">
                <div class="title">产品介绍</div>
                <div class="content">

                </div>
            </div>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000"/>
            <van-goods-action-icon icon="cart-o" text="购物车"/>
            <van-goods-action-button
                    color="#3b3b3b"
                    type="warning"
                    text="加入购物车"
                    @click="onClickButton"

            />
            <van-goods-action-button
                    color="#00c049"
                    type="danger"
                    text="立即购买"
                    @click="onClickButton"
            />
        </van-goods-action>
        <van-sku v-model="show" :sku="sku" :goods="goods" :hide-stock="sku.hide_stock"  @buy-clicked="onBuyClicked"/>
    </div>
</template>

<script>
    export default {
        name: "detail",
        beforeCreate() {
            document.body.style.backgroundColor = 'rgb(245, 245, 245)'
        },
        beforeDestroy() {
            document.body.style.backgroundColor = ''
        },
        data() {
            return {
                goods: {title:'方便面',picture: 'https://img.ddimg.mobi/product/73729284b788d1558072397291.jpg!deliver.product.list'},
                show:false,
                sku: {
                    id:'',
                    tree: [],
                    list: [{
                        id: 2259,
                        price: 100,
                        name: '方便面',
                        s1: "1215",
                        stock_num: 10
                    }],
                    price: "1.00",
                    stock_num: 17,
                    collection_id: 2261,
                    none_sku:true,
                    hide_stock: false
                }
            };
        },
        created() {
        this.id = this.$route.params.id
        },
        mounted() {

        },
        methods: {
            onBuyClicked(data) {
                console.log(data);
                // this.$router.push({
                //     path:'/order/subimt'
                // })
                this.$router.push({
                    path:'/order/submit/' + this.id
                })
            },
            onClickButton(){
                this.show = true
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
    #detail {
        width: 100%;
        position: absolute;

        .goodsDetail {
            .goodsImg {
                width: 100%;

                img {
                    width: 100%;
                    height: 80%;
                }
            }

            .wrapper {
                background-color: #fff;

                .title {
                    margin: 0 .3rem;
                    padding-top: .25rem;

                    .money {
                        font-size: .28rem;
                        font-weight: 700;
                        color: #ff8500;

                        .num {
                            font-size: .48rem;
                        }
                    }
                }
                .introduce{
                    font-size: .32rem;
                    font-weight: 700;
                    margin: .1rem .3rem 0 .3rem;
                }
            }
            .product-intro{
                margin-top: .2rem;
                .title{
                    font-size: .3rem;
                    color: #282828;
                    height: .86rem;
                    width: 100%;
                    background-color: #fff;
                    text-align: center;
                    line-height: .86rem;
                }
                .content{
                    width: 100%;
                }
            }
        }
    }
</style>
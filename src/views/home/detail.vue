<template>
    <div id="detail">
        <div class="goodsDetail">
            <div>
                <div class="goodsImg">
                    <img :src="baseUrl+img"
                         alt="">
                </div>
                <div class="wrapper">
                    <div class="title acea-row row-between row-bottom">
                        <div class="money">
                            ￥
                            <span class="num">
                           {{price}}
                        </span>
                        </div>
                    </div>
                    <div class="introduce">{{name}}</div>
                    <div class="label acea-row row-between-wrapper">
                        <div class="">
                            库存：
                            {{stock}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-intro">
                <div class="title">产品介绍</div>
                <div class="content" v-html="content">

                </div>
            </div>
            <div style="height: 1.3rem"></div>
        </div>
        <van-goods-action>
            <template >
            </template>
            <van-goods-action-icon icon="star-o" text="收藏"  v-show="!sc" @click="handle_likes"/>
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000"  v-show="sc" @click="handle_likes"/>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="tocart" :badge="badge"/>
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
        <van-sku v-model="show" :sku="sku" :goods="goods"
                 :hide-stock="sku.hide_stock"
                 @add-cart="addCart"
                 @buy-clicked="onBuyClicked">
        </van-sku>
    </div>
</template>

<script>
    import {homeService} from "../../api/home/home";
    import {BaseUrl, cookie, HTMLDecode, storage} from "../../assets/js/util";

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
                name:'',
                price:'',
                img:'',
                stock:'',
                baseUrl:BaseUrl,
                content:'',
                goods: {
                    picture: ''
                },
                show: false,
                sc:true,
                badge:'',
                sku: {
                    id: '',
                    tree: [],
                    price: "1.00",
                    stock_num: 17,
                    collection_id: '',
                    none_sku: true,
                    hide_stock: false
                }
            };
        },
        created() {
            this.id = this.$route.params.id
            this.getDetailData()
        },
        mounted() {
        },
        methods: {
            getDetailData() {
                let data = {
                    sid:this.id,
                    uid:storage.get("uid")
                }
              homeService.goodsDetail({
                  id:this.id
              }).then(res=>{
                  let data = res.data;
                  let content =  HTMLDecode(data.imgs)
                  this.name = data.name
                  this.price = data.price
                  this.img = data.img
                  this.stock = data.stock
                  this.content = this.dataHtml(content)

                  this.goods.picture = this.baseUrl+data.img
                  this.sku.id = data.id;
                  this.sku.collection_id = data.id
                  this.sku.price = data.price
                  this.sku.stock_num =  data.stock
              })
                homeService.getGoodStore(data).then(res=>{
                    this.sc = res.data
                })
            },
            dataHtml(str){
                let imgReg = /<img.*?(?:>|\/>)/gi;//正则匹配图片（g表示匹配所有结果i表示区分大小写）
                let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;  //正则匹配src属性
                let arr = str.match(imgReg);
                if(arr === null){
                    return str
                }
                for (var i = 0; i < arr.length; i++) {
                    var src = arr[i].match(srcReg);
                    //获取图片地址
                    if (src[1]) {
                        str = str.replace(src[1], this.baseUrl + src[1]);
                    }
                }
                return str;
            },
            onBuyClicked(data) {
                // if(data.selectedSkuComb.stock_num === 0){
                //     return this.$toast.fail("此商品库存不足,无法购买")
                // }
                let str = data.selectedSkuComb.id + ":"+data.selectedNum
                this.$router.push({
                    path: '/order/submit/' + str
                })
            },
            onClickButton() {
                this.show = true
            },
            handle_likes(){
                let data = {
                    sid:this.id,
                    uid:storage.get("uid")
                }
                if(this.sc){
                    this.sc = false
                    homeService.delGoodStore(data).then(res=>{
                        let code = res.code
                        if(code !== 200){
                            this.$toast.fail('取消收藏失败')
                        }
                        this.$toast.success("已取消收藏")
                    })
                }else{
                    this.sc = true
                    homeService.addGoodStore(data).then(res=>{
                        let code = res.code
                        if(code !== 200){
                            this.$toast.fail('收藏失败')
                        }
                        this.$toast.success("收藏成功")
                    })
                }
            },
            addCart(data){
                // if(data.selectedSkuComb.stock_num === 0){
                //     return this.$toast.fail("此商品库存不足,无法加入购物车")
                // }
                let info = {
                    sid:this.id,
                    uid:storage.get("uid"),
                    number:data.selectedNum
                }
                this.badge = data.selectedNum
                homeService.addCart(info).then(res=>{
                    this.show = false;
                    this.$toast.success(res.data.success)
                })
            },
            tocart(){
                this.$router.push({
                    path:'/cart'
                })
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

                .introduce {
                    font-size: .32rem;
                    font-weight: 700;
                    margin: 0 .3rem 0 .3rem;
                }
                .label{
                    margin: .22rem .3rem 0 .3rem;
                    font-size: .24rem;
                    color: #82848f;
                    padding-bottom: .25rem;
                }
            }

            .product-intro {
                margin-top: .2rem;

                .title {
                    font-size: .3rem;
                    color: #282828;
                    height: .86rem;
                    width: 100%;
                    background-color: #fff;
                    text-align: center;
                    line-height: .86rem;
                }

                .content {
                    width: 100%;
                }
            }
        }
    }
    ::v-deep .van-button--warning{
        background: #3b3b3b;
    }
    ::v-deep .van-button--danger{
        background: $theme;
    }
</style>
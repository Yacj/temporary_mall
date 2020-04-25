<template>
    <div>
        <div>
            <van-sku v-model="show" :sku="sku" :goods="goods" :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked"
                     @add-cart="onAddCartClicked"/>
            <van-swipe class="goods-swipe" :autoplay="3000">
                <van-swipe-item v-for="thumb in goods.thumb" :key="thumb.url"><img :src="thumb.src"/></van-swipe-item>
            </van-swipe>
            <van-cell-group>
                <van-cell>
                    <div class="goods-title">{{ goods.title }}</div>
                    <div class="goods-price">{{ formatPrice(goods.price) }}</div>
                </van-cell>
                <van-cell class="goods-express">
                    <van-col span="10">运费：{{ goods.express }}</van-col>
                    <van-col span="14">剩余：{{ goods.remain }}</van-col>
                </van-cell>
            </van-cell-group>
            <van-cell-group class="goods-cell-group">
                <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
                    <template slot="title"><span class="van-cell-text">领军者旗舰店</span>
                        <van-tag class="goods-tag" type="danger">旗舰店</van-tag>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-cell-group class="goods-cell-group">
                <van-cell title="查看商品详情" is-link @click="sorry"/>
            </van-cell-group>
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" @click="sorry">客服</van-goods-action-icon>
                <van-goods-action-icon icon="cart-o" @click="show = true">购物车</van-goods-action-icon>
                <van-goods-action-button type="warning" @click="show = true">加入购物车</van-goods-action-button>
                <van-goods-action-button type="danger" @click="sorry">立即购买</van-goods-action-button>
            </van-goods-action>
        </div>
    </div>
</template>
<script>import {
    Cell,
    CellGroup,
    Col,
    GoodsAction,
    GoodsActionButton,
    GoodsActionIcon,
    Icon,
    Swipe,
    SwipeItem,
    Tag
} from "vant";

export default {
    components: {
        [Tag.name]: Tag,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionIcon.name]: GoodsActionIcon,
        [GoodsActionButton.name]: GoodsActionButton
    }, data() {
        return {
            goods: {title: "美国伽力果（约680g/3个）", price: 2680, express: "免运费", remain: 19, thumb: [],},
            id: this.$route.params.id,
            show: false,
            sku: {
                tree: [{
                    k: "选择",
                    v: [{
                        id: "1215",
                        name: "手机",
                        imgUrl: "http://demo.dtcms.net/upload/201504/20/thumb_201504200046594439.jpg"
                    }],
                    k_s: "s1"
                }],
                list: [{
                    id: 2259, price: 100,
                    s1: "1215",
                    stock_num: 10
                }], price: "1.00", stock_num: 17,
                collection_id: 2261, none_sku: false,
                hide_stock: false
            }
        };
    },
    created() {
        this.getLunbotu();
    }, methods: {
        onBuyClicked(data) {
            this.$toast("buy:" + JSON.stringify(data));
            console.log(JSON.stringify(data));
        },
        onAddCartClicked(data) {
            this.$toast("add cart:" + JSON.stringify(data));
        }, formatPrice() {
            return "¥" + (this.goods.price / 100).toFixed(2);
        }, onClickCart() {
            this.$router.push("cart");
        }, getLunbotu() {
            console.log(this.id)
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if (result.body.status === 0) {
                    this.goods.thumb = result.body.message;
                }
            });
        }
    }
};</script>
<style lang="less">.van-sku-messages {
    display: none;
}

.demo-sku {
    .sku-container {
        padding: 0 15px;
    }
}

.goods {
    padding-bottom: 50px;

    &-swipe {
        img {
            width: 100%;
            display: block;
        }
    }

    &-title {
        font-size: 16px;
    }

    &-price {
        color: #f44;
    }

    &-express {
        color: #999;
        font-size: 12px;
        padding: 5px 15px;
    }

    &-cell-group {
        margin: 15px 0;

        .van-cell__value {
            color: #999;
        }
    }

    &-tag {
        margin-left: 5px;
    }
}</style>

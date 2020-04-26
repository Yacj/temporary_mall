<template>
    <div id="cart">
        <div class="nav acea-row row-between-wrapper">
            <div>购物数量</div>
            <div class="span">
                {{num}}
            </div>
        </div>
        <div class="cartLit">
            <template v-if="cartList.length > 0">
                <ul class="goods-list cart-list">
                    <li class="goods-item" v-for="(item, index) in cartList">
                        <div class="item-selector">
                            <div class="icon-selector" :class="{'selector-active': item.checked}" @click="selectGoods(item)">
                                <svg t="1504061791962" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2922" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12">
                                    <path d="M908.288 127.488l-537.6 537.6-254.976-254.976L0 525.824l254.976 254.976 115.712 115.712L486.4 780.8l537.6-537.6z"
                                          fill="#ffffff" p-id="2923"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="goods-img">
                            <img v-bind:src="item.img" v-bind:alt="item.name">
                        </div>
                        <div class="goods-info">
                            <p class="goods-title">{{ item.name }}</p>
                            <div class="goods-price">
                                <span>¥<b>{{ item.price }}</b></span>
                            </div>
                            <span class="des">库存{{ item.stock }}件</span>
                            <div class="goods-num">
                                <div class="num-btn" @click="changeQty(true, item)">+</div>
                                <div class="show-num">{{ item.quantity }}</div>
                                <div class="num-btn" @click="changeQty(false, item)">-</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="action-bar" :class="{ 'del-box': delFlag }">
                    <!-- del-box -->
                    <div class="g-selector" @click="checkAll">
                        <div class="item-selector">
                            <div class="icon-selector" v-bind:class="{'selector-active': checkAllFlag}">
                                <svg t="1504061791962" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2922" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12">
                                    <path d="M908.288 127.488l-537.6 537.6-254.976-254.976L0 525.824l254.976 254.976 115.712 115.712L486.4 780.8l537.6-537.6z"
                                          fill="#ffffff" p-id="2923"></path>
                                </svg>
                            </div>
                        </div>
                        <span>全选</span>
                    </div>
                    <div class="action-btn buy-btn">去结算({{ selectedNum }})</div>
                    <div class="action-btn del-btn" @click="delGoods">删除({{ selectedNum }})</div>
                    <div class="total">合计：<span>¥<b>{{ totalPrice }}</b></span></div>
                </div>
            </template>
            <div class="nodata" v-else>
                <van-empty image="error" description="暂无商品，去添加点什么吧"/>
            </div>
        </div>
        <tabbar :active="2"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "../../components/Tabbar/Tabbar";

    export default {
        name: "cart",
        components: {Tabbar},
        data() {
            return {
                num: 0,
                cartList: [
                    {
                        name:'12'
                    },
                    {
                        name:'23'
                    }
                ],
                delFlag:'',
                checkAllFlag:true,
                totalPrice:0,
                selectedNum:0
            }
        },
        created() {
        },
        methods: {
            selectGoods(){

            },
            changeQty(){

            },
            checkAll(){

            },
            delGoods(){

            }
        }
    }
</script>

<style scoped lang="scss">
    #cart {
        width: 100%;
        position: absolute;

        .nav {
            width: 100%;
            height: .8rem;
            background-color: #fff;
            padding: 0 .3rem;
            font-size: .28rem;
            color: #282828;
            position: fixed;
            left: 0;
            z-index: 5;
            top: .16rem;
            border-bottom: 1px solid #f5f5f5;

            .num {
            }
        }
    }
    .cart-list .goods-info {
        width: 68%;
    }

    .item-selector {
        width: 12%;
    }

    .icon-selector {
        position: relative;
        margin: 16px auto 0 auto;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #ccc;
        cursor: pointer;
    }

    .selector-active {
        background-color: #7a45e5;
        border-color: #7a45e5;
    }

    .selector-active .icon {
        position: absolute;
        top: 2px;
        left: 2px;
    }

    .goods-num {
        position: absolute;
        right: 10px;
        top: 4px;
        width: 32px;
        color: #999;
        text-align: center;
    }

    .show-num {
        line-height: 28px;
    }

    .num-btn {
        width: 100%;
        height: 24px;
        font-size: 20px;
        line-height: 20px;
        cursor: pointer;
    }

    .action-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 52px;
        font-size: 15px;
        background-color: #fff;
        border-top: 1px solid #ddd;
    }

    .g-selector {
        float: left;
        width: 70px;
        margin-left: 4%;
        height: 52px;
        cursor: pointer;
    }

    .g-selector .item-selector {
        position: relative;
        display: inline-block;
    }

    .g-selector span {
        position: absolute;
        margin-left: 20px;
        color: #5F646E;
        top: 15px;
    }

    .total {
        float: right;
        color: #363636;
        font-size: 14px;
        line-height: 50px;
        margin-right: 20px;
    }

    .total span {
        color: #7A45E5;
    }

    .total b {
        font-size: 17px;
        margin-left: 4px;
    }

    .action-btn {
        float: right;
        width: 120px;
        height: 100%;
        color: #fff;
        text-align: center;
        font-weight: 300;
        line-height: 52px;
        cursor: pointer;
    }

    .buy-btn {
        background-color: #7A45E5;
    }

    .del-btn {
        display: none;
        background-color: #FF4069;
    }

    .del-box .total {
        display: none;
    }

    .del-box .buy-btn {
        display: none;
    }

    .del-box .del-btn {
        display: block;
    }
</style>
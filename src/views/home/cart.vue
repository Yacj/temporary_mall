<template>
    <div id="cart">
        <div class="nav acea-row row-between-wrapper">
            <div>
                购物数量 <span class="num font-color-orange">{{length}}</span>
            </div>
            <div @click="toggleDelBtn">
                <div class="administrate acea-row row-center-wrapper" v-show="!delFlag">
                    编辑
                </div>
                <div class="administrate acea-row row-center-wrapper" v-show="delFlag">
                    完成
                </div>
            </div>

        </div>
        <div class="cartLit" style="margin-top: 1rem;">
            <template v-if="cartList.length > 0">
                    <transition-group appear tag="ul">
                        <li class="goods-item" v-for="(item, index) in cartList" :key="index">
                            <div class="item-selector">
                                <div class="icon-selector" :class="{'selector-active': item.checked}"
                                     @click="selectGoods(item)">
                                    <svg t="1504061791962" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="2922"
                                         xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12">
                                        <path d="M908.288 127.488l-537.6 537.6-254.976-254.976L0 525.824l254.976 254.976 115.712 115.712L486.4 780.8l537.6-537.6z"
                                              fill="#ffffff" p-id="2923"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="goods-img">
                                <img :src="baseUrl+item.smallImage" :alt="item.name">
                            </div>
                            <div class="goods-info">
                                <p class="goods-title">{{ item.name }}</p>
                                <div class="goods-price">
                                    <span>¥<b>{{ item.price }}</b></span>
                                </div>
                                <span class="des">
                                库存 {{item.stock}}件
                            </span>
                                <div class="carnum acea-row row-center-wrapper">
                                    <div class="num-btn reduce" @click="changeQty(true, item)">+</div>
                                    <div class="show-num">{{ item.num }}</div>
                                    <div class="num-btn plus" @click="changeQty(false, item)">-</div>
                                </div>
                            </div>
                        </li>
                    </transition-group>
                <div style="height: 1rem"></div>
                <div class="action-bar" :class="{ 'del-box': delFlag }">
                    <!-- del-box -->
                    <div class="g-selector" @click="checkAll">
                        <div class="item-selector">
                            <div class="icon-selector" :class="{'selector-active': checkAllFlag}">
                                <svg t="1504061791962" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg" p-id="2922"
                                     xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12">
                                    <path d="M908.288 127.488l-537.6 537.6-254.976-254.976L0 525.824l254.976 254.976 115.712 115.712L486.4 780.8l537.6-537.6z"
                                          fill="#ffffff" p-id="2923"></path>
                                </svg>
                            </div>
                        </div>
                        <span>全选</span>
                    </div>
                    <div class="action-btn buy-btn" @click="goEdit">去结算({{ selectedNum }})</div>
                    <div class="action-btn del-btn" @click="delGoods">删除({{ selectedNum }})</div>
                    <div class="total">合计：<span>¥<b>{{ totalPrice }}</b></span></div>
                </div>
            </template>
            <div class="nodata" v-else>
                <van-empty image="error" description="暂无商品，去添加点什么吧"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Tabbar from "../../components/Tabbar/Tabbar";
    import {homeService} from "../../api/home/home";
    import {add, BaseUrl, mul, storage} from "../../assets/js/util";

    export default {
        name: "cart",
        components: {Tabbar},
        data() {
            return {
                num: 0,
                length: 0,
                cartList: [],
                delFlag: '',
                checkAllFlag: false,
                selectedNum: 0,
                baseUrl: BaseUrl,
                subtotal: 0
            }
        },
        created() {
            this.cartData()
        },
        methods: {
            async cartData() {
                let that = this
                await homeService.getCart({
                    uid:storage.get("uid")
                }).then(res => {
                    let data = res.data.data
                    let code = res.code;
                    if (code !== 200) {
                        that.cartList = [];
                        that.length = 0
                        return
                    }
                    that.cartList = data
                    that.length = data.length
                    that.totalPrice = res.data.totalscore
                    that.checkAllFlag = !that.checkAllFlag;
                    that.cartList.forEach(function (item) {
                        if (that.checkAllFlag) {
                            that.selectedNum = that.cartList.length;
                            item.checked = true;
                        }
                    });
                })
            },
            selectGoods(item) {
                item.checked = !item.checked;
                item.checked ? ++this.selectedNum : --this.selectedNum;
                this.selectedNum === this.cartList.length
                    ? this.checkAllFlag = true
                    : this.checkAllFlag = false
                this.countMoney()
            },
            changeQty(isAdd, item) {
                let num = item.num,
                    stock = item.stock;
                if (isAdd && num < stock) {
                    this.$set(item, "num", ++num);
                } else if (!isAdd && num > 1) {
                    this.$set(item, "num", --num);
                }
                this.countMoney()
            },
            countMoney() {
                let carMoney = 0;
                let array = this.cartList
                for (let i = 0; i < array.length; i++) {
                    if (array[i].checked === true) {
                        carMoney = add(carMoney, mul(array[i].num, array[i].price));
                    }
                }
                this.totalPrice = carMoney
            },
            checkAll() {
                let that = this
                this.checkAllFlag = !this.checkAllFlag;
                this.cartList.forEach(function (item) {
                    if (that.checkAllFlag) {
                        item.checked = true;
                        that.selectedNum = that.cartList.length;
                        that.countMoney()
                    } else {
                        item.checked = false;
                        that.selectedNum = 0;
                        that.countMoney()
                    }
                });
            },
            delGoods() {
                let cart = this.cartList;
                let str = "";
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].checked === true) {
                        str += cart[i].cartid + ","
                    }
                }
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }
                let data = {
                    cid: str
                }
                homeService.delCart(data).then(res => {
                    let code = res.code;
                    if (code !== 200) {
                        return this.$toast.fail("删除失败")
                    }
                    this.cartData()
                    this.$toast.success(res.data.success)
                })
            },
            toggleDelBtn: function () {
                this.delFlag = !this.delFlag;
            },
            goEdit(){
                let cart = this.cartList;
                let str = ""
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].checked === true) {
                        str += cart[i].sid+":"+cart[i].num + ","
                    }
                }
                if(str === ''){
                    return this.$toast.fail("请选择商品进行结算")
                }
                if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                }
                this.$router.push({
                    path: '/order/submit/' + str
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .v-enter,
    .v-leave-to {
        opacity: 0; //设置元素的不透明级别：
        transform: translateY(80px);// 开始和结束位置在Y轴的80px处
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.6s ease;// 从Y轴的80px处渐渐移动到上面
    }
    /* 下面的 .v-move 和 .v-leave-active 配合使用，能够实现列表后续的元素，渐渐地漂上来的效果 */
    .v-move { transition: all 0.6s ease; }
    .v-leave-active{ position: absolute; }

    #cart {
        width: 100%;
        height: 100%;
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
            top:0;
            border-bottom: 1px solid #f5f5f5;

            .num {
            }

            .administrate {
                font-size: .26rem;
                color: #282828;
                width: 1.1rem;
                height: .46rem;
                border-radius: .06rem;
                border: 1px solid #868686;
            }
        }

        .cart-list {
            height: 560px;
        }

        .goods-item {
            display: flex;
            margin-bottom: 8px;
            padding: 10px 6px;
            min-height: 62px;
            background: #fff;

            .item-selector {
                width: 18%;

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
                    background-color: $theme;
                    border-color: $theme;

                    .icon {
                        position: absolute;
                        top: 2px;
                        left: 2px;
                    }
                }
            }

            .goods-img {
                position: relative;
                margin-right: 4%;
                display: block;
                width: 30%;
                margin-bottom: 20%;

                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                }
            }

            .goods-info {
                position: relative;
                width: 80%;

                .goods-title {
                    width: 80%;
                    height: 38px;
                    color: #363636;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                .goods-price {
                    margin-top: 6px;
                    line-height: 1;

                    span {
                        font-size: 15px;
                        color: $theme;
                    }
                }

                .des {
                    font-size: 12px;
                    color: #888;
                }

                .carnum {
                    height: .44rem;
                    position: absolute;
                    bottom: .07rem;
                    right: 0;

                    div {
                        border: 1px solid #a4a4a4;
                        width: .66rem;
                        text-align: center;
                        height: 100%;
                        line-height: .44rem;
                        font-size: .28rem;
                        color: #a4a4a4;
                    }

                    .reduce {
                        border-right: 0;
                        border-radius: .03rem 0 0 .03rem;
                        line-height: .39rem;
                    }

                    .show-num {
                        color: #282828;
                    }

                    .plus {
                        border-left: 0;
                        border-radius: 0 .03rem .03rem 0;
                        line-height: .38rem;
                    }
                }

                .goods-num {
                    position: absolute;
                    right: 10px;
                    top: 4px;
                    width: 32px;
                    color: #999;
                    text-align: center;

                    .num-btn {
                        width: 100%;
                        height: 24px;
                        font-size: 20px;
                        line-height: 20px;
                        cursor: pointer;
                    }

                    .show-num {
                        line-height: 28px;
                    }
                }
            }
        }

        .action-bar {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 52px;
            font-size: 15px;
            background-color: #fff;
            border-top: 1px solid #ddd;

            .g-selector {
                float: left;
                width: 70px;
                margin-left: 4%;
                height: 52px;
                cursor: pointer;

                .item-selector {
                    position: relative;
                    display: inline-block;
                    width: 12%;

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
                        background-color: $theme;
                        border-color: $theme;

                        .icon {
                            position: absolute;
                            top: 2px;
                            left: 2px;
                        }
                    }
                }

                span {
                    position: absolute;
                    margin-left: 20px;
                    color: #5F646E;
                    top: 15px;
                }
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
                background-color: $theme;
            }

            .del-btn {
                display: none;
                background-color: #FF4069;
            }

            .total {
                float: right;
                color: #363636;
                font-size: 14px;
                line-height: 50px;
                margin-right: 20px;

                span {
                    color: $theme;
                }

                b {
                    font-size: 17px;
                    margin-left: 4px;
                }
            }
        }

        .del-box {
            .total {
                display: none;
            }

            .buy-btn {
                display: none;
            }

            .del-btn {
                display: block;
            }
        }

    }
</style>
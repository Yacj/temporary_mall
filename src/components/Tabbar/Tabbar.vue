<template>
    <div id="Tabbar">
        <van-tabbar v-model="actives">
            <van-tabbar-item
                    :icon="item.icon"
                    :info="item.info"
                    :dot="item.dot"
                    @click="footerNavigateTo(item)"
                    v-for="(item,index) in footerlist"
                    :key="index">{{ item.name }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    let buyersFooterList = [
        {
            index: 0,
            name: '首页',
            path: '/home',
            icon: 'wap-home-o',
            dot: false,
            info: ''// 此处为空时 dom不显示
        },
        {
            index: 1,
            name: '购物车',
            path: '/search',
            icon: 'shopping-cart-o',
            dot: false,
            info: ''
        },
        {
            index: 2,
            name: '我的',
            path: '/my',
            icon: 'manager-o',
            dot: false,
            info: ''
        }
    ]
    export default {
        name: "Tabbar",
        data() {
            return {
                actives: this.active,
                footerlist: buyersFooterList
            }
        },
        props: ['active'],
        mounted() {
        },
        methods: {
            // 点击底部跳转到对应的path
            footerNavigateTo(obj) {
                this.$router.push({path: obj.path})
            }
        },
    }
</script>
<style scoped lang="scss">
    .van-tabbar-item--active {
        color:$theme;
    }

    #Tabbar {
        z-index: 101;
    }
</style>
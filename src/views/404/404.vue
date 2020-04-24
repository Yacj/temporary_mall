<template>
    <div id="not-defined">
        <van-empty
                class="custom-image"
                image="https://s1.ax1x.com/2020/04/24/JrsvvV.png"
                description="抱歉！您访问的页面不存在，请返回上一级或点击下方按钮返回首页..."
        >
            <van-button type="primary"
                        block
                        round
                        @click="goto()"
                        style="width: 160px"
                        color="linear-gradient(to right, #4bb0ff, #6149f6)">
                返回首页
            </van-button>
        </van-empty>

        </div>
    </div>
</template>

<script>
    export default {
        name: "not-defined",
        data() {
            return {}
        },
        mounted() {
        },
        methods: {
            goto(){
                this.$router.go(-1);
            }
        },
        component: {
            //someComponent
        }
    }
</script>
<style scoped lang="scss">
#not-defined{
}
</style>
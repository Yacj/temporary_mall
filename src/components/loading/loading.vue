<template>
    <div id="loading">
        <div>
            <div class="loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="loading-text">正在加载页面</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
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
#loading{
    height: 100%;
    position: fixed;
    width: 100%;
    background-size: cover;
    text-align: center;
    z-index: 10000;
    background: #fff;
    >div{
        height: 100%;
        width: 100%;
        justify-content: center;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .loader{
        position: absolute;
        width: 100%;
        text-align: center;
        top: 40%;
        .dot{
            width: 8px;
            height: 8px;
            background: $theme;
            border-radius: 100%;
            display: inline-block;
            margin-left: 8px;
            animation: slide 1s infinite;
            &:nth-child(1){
                animation-delay: 0.3s;
            }
            &:nth-child(2){
                animation-delay: 0.6s;
            }
        }
        .loading-text{
            font-size: 14px;
            padding-left: 5px;
            color: #6b6b6b;
        }
    }
}
@-webkit-keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes slide {
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
}

</style>
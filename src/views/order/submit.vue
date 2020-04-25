<template>
    <div id="submit">
        <div class="allAddress">
            <div class="address acea-row row-between-wrapper">
                <div class="addressCon" v-if="addressInfo.name !== undefined && addressInfo.name.length > 0">
                    <div class="name">
                        {{addressInfo.name}}
                        <span class="phone">
                            {{addressInfo.phone}}
                        </span>
                    </div>
                    <div class="">
                        {{addressInfo.info}}
                    </div>
                </div>
                <div class="addressCon" v-else>
                    <div class="setAddress">
                        设置地址
                    </div>
                </div>
                <van-icon name="arrow" class="icon"/>
            </div>
            <div class="line">
                <img src="../../assets/img/line.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "submit",
        data() {
            return {
                addressInfo:{}
            }
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
#submit{
    width: 100%;
    position: absolute;
    .allAddress{
        width: 100%;
        .address{
            height: 1.5rem;
            margin: 0 auto;
            padding: .28rem .3rem;
            background-color: #fff;
            .addressCon{
                width: 6.1rem;
                font-size: .26rem;
                color: #666;
                .name{
                    font-size: .3rem;
                    color: #282828;
                    font-weight: 700;
                    margin-bottom: .1rem;
                    .phone{
                        margin-left: .5rem;
                    }
                }
                .setAddress{
                    color: #333;
                    font-size: .28rem;
                }
            }
            .icon{
                font-size: .35rem;
                color: #707070;
            }
        }
        .line{
            width: 7.1rem;
            margin: 0 auto;
            height: .03rem;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
}
</style>
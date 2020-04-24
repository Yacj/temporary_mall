<template>
  <div class="home">
      <div class="swiper">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item
                        v-for="(item,index) in banner"
                        :key="index">
                  <img :src="item.filepath" alt="">
              </van-swipe-item>
          </van-swipe>
      </div>
   <tabbar :active="0"></tabbar>
  </div>
</template>

<script>

import Tabbar from "../../components/Tabbar/Tabbar";
import {homeService} from "../../api/home/home";
export default {
  name: 'Home',
    components: {Tabbar},
    data(){
      return{
          banner:[],
      }
    },
    created() {
     this.getHomeData()
    },
    mounted() {
      // this.$store.commit('showLoading')
    //    this.$store.commit('hideLoading')
    },
    methods:{
        async getHomeData(){
            await homeService.Get_API_PC_Image().then(res=>{
                let data = res.data;
                this.banner = data
            })
        },
        test(){
            this.$router.push({
                path:'/login',
                query:{
                    userId:'123'
                }
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .my-swipe{
        height: 200px;
        img{
            width: 100%;
            height: 200px;
        }
    }
</style>

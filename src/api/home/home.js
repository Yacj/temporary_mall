/* 根据不同的模块 封装 不同的api请求 如 home模块 就是 home/home.js*/
import {get, post} from '../api'

export const homeService = {
    /*
    获取轮播图
    * */
    Get_API_PC_Image(param) {
        return get('/index/Get_API_PC_Image', param)
    },
    /*精品推荐*/
    getProduct(param) {
        return get('/home/getrecome', param)
    },
    /*人气推荐*/
    getGoods(param) {
        return get('/home/getgoods', param)
    },
    getColumn(param){
        return get('/home/getcolumn',param)
    },
    commodity(param){
        return get('/Goods/getgoods',param)
    },
    goodsDetail(param){
        return get('/Goods/goodsdetail',param)
    },
    addGoodStore(param){
        return post('/collection/addgoodstore',param)
    },
    delGoodStore(param){
        return post('/collection/delgoodstore',param)
    },
    getGoodStore(param){
        return post('/collection/getgoodstore',param)
    },
    addCart(param){
        return post('/cart/addcart',param)
    },
    getCart(param){
        return get('/cart/getcart',param)
    }
}
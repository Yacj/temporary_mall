/* 根据不同的模块 封装 不同的api请求 如 home模块 就是 home/home.js*/
import { get, post} from '../api'
export const homeService = {
    /*
    获取轮播图
    * */
    Get_API_PC_Image(param){
        return get('/index/Get_API_PC_Image',param)
    }
}
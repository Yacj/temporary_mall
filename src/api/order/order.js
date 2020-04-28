import  {get,post} from "../api";
export const OderService = {
    getGoods(param){
        return get('/settle/getgoods',param)
    },
    getAddress(param){
        return get('/settle/getaddre',param)
    },
    getOrder(param){
        return get('/order/getorder',param)
    },
    saveOrder(param){
        return post('/order/saveorder',param)
    },
    getOrderDetail(param){
        return get('/order/getorderdateil',param)
    },
    delOrder(param){
        return post('/order/delorder',param)
    },
    setOrder(param){
        return post('/order/setorder',param)
    }
}
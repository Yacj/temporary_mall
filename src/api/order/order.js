import  {get,post} from "../api";
export const OderService = {
    getGoods(param){
        return get('/settle/getgoods',param)
    },
    getAddress(param){
        return get('/settle/getaddre',param)
    },
    saveOrder(param){
        return post('/order/saveorder',param)
    }
}
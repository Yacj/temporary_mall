import {get, post} from "../api";

export const UserService = {
    saveAddress(param){
        return post('/address/saveaddre',param)
    },
    getAddress(param){
        return get('/address/getaddress',param)
    },
    setAddress(param){
        return post('/address/setaddre',param)
    },
    getAddressDetail(param){
        return get('/address/getaddredatail',param)
    },
    delAddress(param){
        return post('/address/deladdre',param)
    },
    editAddress(param){
        return post('/address/editaddre',param)
    },
    addBalance(param){
        return post('/Balance/addBalance',param)
    }
}
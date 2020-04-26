import {get, post} from "../api";

export const UserService = {
    saveAddress(param){
        return post('/Address/saveaddre',param)
    },
    getAddress(param){
        return get('/Address/getaddress',param)
    },
    setAddress(param){
        return post('/Address/setaddre',param)
    }
}
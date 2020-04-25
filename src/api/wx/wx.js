import {get} from "../api";

export const wxService = {
    get_wx_user(param) {
        return get('/weixin/get_weixin_user', param)
    },
    wx_Pay(param) {
        return get('/weixin/wx_Pay',param)
    }
}

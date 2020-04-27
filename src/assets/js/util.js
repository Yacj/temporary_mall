/*Cookie*/
// setCookie("username",'101',365);
// console.log(getCookie('username'))
//  delCookie('username')
export let cookie = {
    setCookie(name, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = name + "=" + cvalue + "; " + expires;
    },
    getCookie(name) {
        var name = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }

}

/*storage*/
/*
storage.set('list',''list);
storage.get('list')
*/
export let storage = {
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    get(key){

        return JSON.parse(localStorage.getItem(key))
    },
    remove(){
        localStorage.removeItem(key)
    }
}

/*验证手机号*/
/**
 * @param { string } value
 */
export const isMPStrict = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value);

/* 数字加逗号*/
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/*微信*/
export  const wxBrowser = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"

/**/
export const BaseUrl = 'https://www.tuopuvip.com/'

export const HTMLDecode = text =>{
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}
export function mul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
        m = 0;
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
        m = m || 0;
    }
    return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
    );
}

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：add(arg1,arg2)
//返回值：arg1加上arg2的精确结果
export function add(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m + arg2 * m) / m).toFixed(n);
}
export function  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
}
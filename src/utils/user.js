import Cookie from 'js-cookie'
const key = 'authorization'

//获取cookie
export function getToken(){
    return Cookie.get(key)
}

//设置cookie
export function setToken(value){
    return Cookie.set(key,value,{expires:1})
}

//删除cookie
export function removeToken(){
    return Cookie.remove(key)
}
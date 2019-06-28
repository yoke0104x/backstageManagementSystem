import { login,type,insertQuestionsType, getUserInfo, getViewAuthority} from '../services/index'
import {setToken, getToken} from '@/utils/user'
import { routerRedux } from 'dva/router';
//引入路由表
import allView from '@/router/config.js'

export default {
    // 命名空间
    namespace: 'user',

    // 模块内部的状态
    state: {
      userInfo: {},
      viewAuthority: [],  // 用户所拥有的视图权限
      myView: [],  // 拥有权限的前端路由
      forbiddenView: [] //没有权限访问的路由
    },

    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        return history.listen(({ pathname }) => {
          // console.log('pathname...', pathname);
          if (pathname.indexOf('/login') === -1) {
            // 不去登陆页面做token检测
            if (!getToken()){
              // 利用redux做路由跳转
              dispatch(routerRedux.replace({
                pathname: `/login`,
                search:`?redirect=${encodeURIComponent(pathname)}`
              }))
            }else{
              // 1.1.2 有登录态，请求用户信息,请求用户权限
              dispatch({
                type: 'getUserInfo'
              })
            }
          }else{
            // 去登陆页面，如果已登陆跳回首页
            if (getToken()){
               // 利用redux做路由跳转
               dispatch(routerRedux.replace({
                pathname: `/`,
              }))
            }
          }
        });
      },
    },

    // 异步操作
    effects: {
        *login({ payload }, { call, put }) {
            let data = yield call(login, payload);
            // console.log('data...', payload);
            if (data.code === 1){
                setToken(data.token);
            }
            // 2.获取用户信息
            let userInfo = yield call(getUserInfo);
            // console.log('userInfo...', userInfo);
            window.localStorage.userInfo = JSON.stringify(userInfo)
            yield put({
                type: 'save',
                payload: data.code === 1?1:-1
            })
        },
        *type({payload},{ call, put }) {
          let exo = yield call(type)
          if(payload !== undefined){
            var data = yield call(insertQuestionsType,payload)
            yield put({
              type:"insertType",
              payload:{...data}
            })
          }
          
          yield put({
            type:"exo",
            payload:exo
          })
        },
        *getUserInfo({payload}, {call, put, select}){
          // 1.判断是否有权限信息
          let myView = yield select(state=>state.user.myView);
          if (myView.length){
            return;
          }
   
          // 2.获取用户信息
          let userInfo = yield call(getUserInfo);
          // console.log('userInfo...', userInfo);
          yield put({
            type: 'updateUserInfo',
            payload: userInfo.data
          })
   
          // 3.根据id获取视图权限
          let viewAuthority = yield call(getViewAuthority, userInfo.data.user_id);
         //  console.log('viewAuthority...', viewAuthority);
          yield put({
            type: 'updateViewAuthority',
            payload: viewAuthority.data
          })
       }
    },

    // 同步操作
    reducers: {
        save(state, action) {
            return {
                ...state,
                detail: action.payload,
            };
        },
        exo(state,{payload}){
          return { ...state, exo: payload }
        },
        insertType(state,action){
          return { ...state, addCode: action.payload }
        },
        updateUserInfo(state, {payload}){
          return {...state, userInfo: payload}
        },
        updateViewAuthority(state, {payload}){
          // 筛选出我所有的前端路由权限
          let myView = allView.routes,
              forbiddenView = [];
          myView.forEach(item=>{
            item.children = item.children.filter(value=>{
              if (payload.findIndex(id=>id.view_id===value.id) !== -1){
                return true;
              }else{
                forbiddenView.push(value.path);
                return false;
              }
            })
          })
          console.log('myView...', myView);
          return {...state, viewAuthority: payload, myView, forbiddenView}
        }
    }
};
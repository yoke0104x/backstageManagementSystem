export default {
    // 命名空间
    namespace: 'global',
  
    // 模块内部的状态
    state: {
      locale: 'zh'
    },
  
    // 同步操作
    reducers: {
      changeLocale(state, {payload}){
        return {...state, locale: payload}
      }
    }
  };
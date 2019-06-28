import {studentList,student,studentdetail} from '../services/index'
export default {
    // 命名空间
    namespace: 'macking',
  
    // 模块内部的状态
    state: {},
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        
      },
    },
  
    // 异步操作
    effects: {
      *mackingList({ payload }, { call, put }) {  // eslint-disable-line
        let data = yield call(studentList)
        yield put({type:'macking',payload:data.data})

        let data1 = yield call(student,payload)
        yield put({type:'student',payload:data1.exam})

        if(payload){
            let data1 = yield call(studentdetail,payload)
                yield put({type:'studentdetail',payload:data1.exam})

        }
      },
    },
  
    // 同步操作
    reducers: {
        macking(state, action) {
            return { ...state,stanList:action.payload};
        },
        student(state, action) {
            return { ...state,studt:action.payload};
        },
        studentdetail(state, action) {
          return { ...state,studentdetail:action.payload};
      },
    },
  
  };
  
import {examType,subject,getQuestionsType,questions,condition,questionsAdd,update,examfnDate,examStudentList,putexam} from '../services/index'
console.log(examType)
export default {
    // 命名空间
    namespace: 'add',

    // 模块内部的状态
    state: {
        add:[]
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
           
        },
    },

    // 异步操作
    effects: {
        *examTypes({payload}, { call, put}){
            let exam_type = yield call(examType);
            let data = yield call(subject);
            let data1 = yield call(getQuestionsType);
            let data2 = yield call(questions);

            if(payload){
                if(payload){
                    let data3 = yield call(condition,payload);
                    yield put({type:'condition',payload:data3.data})
                }
                if(payload.user_id){
                    let data5 = yield call(update,payload);
                    console.log(data5)
                }
                if(payload.subject_id){
                    let date = yield call(examfnDate,payload);
                    yield put({type:'examfnDate',payload:date})
                }
            }
            let studentList = yield call(examStudentList,payload);
                console.log(studentList)
            yield put({type:'save',payload:exam_type.data})
            yield put({type:'subject',payload:data.data})
            yield put({type:'getQuestionsType',payload:data1.data})
            yield put({type:'questions',payload:data2.data})
            yield put({type:'studentList',payload:studentList.exam})
        },
        *questionsAdd({payload}, { call, put}){
            let data4 = yield call(questionsAdd,payload);
            console.log(data4)
            yield put({type:'questionsAdd',payload:data4})
        },

        *putarr({payload}, { call, put}){
            let data = yield call(putexam,payload);
            console.log(data)
            yield put({type:'putexam',payload:data.code})
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
        subject(state, action){
            return {
                ...state,
                subject: action.payload,
            };
        },
        getQuestionsType(state,action){
            return {
                ...state,
                getQuestionsType: action.payload,
            };
        },
        questions(state,action){
            return {
                ...state,
                questions: action.payload,
            };
        },
        condition(state,action){
            return {
                ...state,
                condition: action.payload,
            };
        },
        questionsAdd(state,action){
            return {
                ...state,
                questionsAdd: action.payload,
            };
        },
        studentList(state,action){
            return {
                ...state,
                studentList: action.payload,
            };
        },
        examfnDate(state,action){
            return {
                ...state,
                arr: action.payload,
            };
        },
        putexam(state,action){
            return {
                ...state,
                isexam: action.payload,
            };
        }
    },

};
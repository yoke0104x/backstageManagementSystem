import { room, grade, studentarr, roomdelete, gradedelete, studentdelete, addroom, addgrade, subject } from '../services/index'
export default {
    // 命名空间
    namespace: 'management',

    // 模块内部的状态
    state: {

    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line

        },
    },

    // 异步操作
    effects: {
        *addclass({ payload }, { call, put }) {
            if (payload) {
                let addrooms = yield call(addroom, payload)
                yield put({ type: 'addrooms', payload: addrooms.data })
            }
        },
        *add({ payload }, { call, put }) {
            if (payload) {
                    let addgrades = yield call(addgrade, payload)
                    yield put({ type: 'addgrades', payload: addgrades.data })
            }
        },
        *examTypes({ payload }, { call, put }) {
            let romms = yield call(room)
            yield put({ type: 'rooms', play: romms.data })

            let grades = yield call(grade)
            yield put({ type: 'grades', play: grades.data })

            let students = yield call(studentarr)
            yield put({ type: 'students', play: students.data })

            if (payload) {
                let roomdeletes = yield call(roomdelete, payload)
                yield put({ type: 'roomdeletes', play: roomdeletes.data })
            }

            if (payload) {
                let gradedeletes = yield call(gradedelete, payload)
                yield put({ type: 'gradedeletes', play: gradedeletes.data })
            }

            if (payload) {
                let studentdeletes = yield call(studentdelete, payload)
                yield put({ type: 'studentdeletes', play: studentdeletes.data })
            }

            let subjects = yield call(subject)
            yield put({ type: 'subjects', play: subjects.data })

        }
    },

    // 同步操作
    reducers: {
        rooms(state, action) {
            return {
                ...state,
                romms: action.play
            }
        },
        grades(state, action) {
            return {
                ...state,
                grades: action.play
            }
        },
        students(state, action) {
            return {
                ...state,
                students: action.play
            }
        },
        roomdeletes(state, action) {
            return {
                ...state,
                roomdeletes: action.play
            }
        },
        gradedeletes(state, action) {
            return {
                ...state,
                gradedeletes: action.play
            }
        },
        studentdeletes(state, action) {
            return {
                ...state,
                studentdeletes: action.play
            }
        },
        addrooms(state, action) {
            return {
                ...state,
                addrooms: action.play
            }
        },
        addgrades(state, action) {
            return {
                ...state,
                addgrades: action.play
            }
        },
        subjects(state, action) {
            return {
                ...state,
                subjects: action.play
            }
        },
    },
};
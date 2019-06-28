// import Addeaxm from '../views/Exam/Questions/addExam';
// import Viewexam from '../views/Exam/Questions/viewExam';
// import Typeexam from '../views/Exam/Questions/typeExam';
// import Adduser from '../views/Exam/Usermanagement/addUser';
// import Viewuser from '../views/Exam/Usermanagement/viewUser';
// import Addexams from '../views/Exam/Exammanagement/addExams';
// import Examlist from '../views/Exam/Exammanagement/examList';
// import Class from '../views/Exam/manageMent/classManagement';
// import Classrooms from '../views/Exam/manageMent/classroomManagement';
// import Student from '../views/Exam/manageMent/studentManagement';
// import Classroom from '../views/Exam/Markmanagement/classRoom';
// import Detailexam from '../views/Exam/Questions/detailExam';
import dynamic from 'dva/dynamic';
//试题管理
const Addeaxm = dynamic({
  component: () => import('@/views/Exam/Questions/addExam'),
});

const Viewexam = dynamic({
  component: () => import('@/views/Exam/Questions/viewExam'),
});
const Typeexam = dynamic({
  component: () => import('@/views/Exam/Questions/typeExam'),
});
//用户管理
const Adduser = dynamic({
  component: () => import('@/views/Exam/Usermanagement/addUser'),
});
const Viewuser = dynamic({
  component: () => import('@/views/Exam/Usermanagement/viewUser'),
});
//考试管理
const Addexams = dynamic({
  component: () => import('@/views/Exam/Exammanagement/addExams'),
});
const Examlist = dynamic({
  component: () => import('@/views/Exam/Exammanagement/examList'),
});
//班级管理
const Class = dynamic({
  component: () => import('@/views/Exam/manageMent/classManagement'),
});
const Classrooms = dynamic({
  component: () => import('@/views/Exam/manageMent/classroomManagement'),
});
const Student = dynamic({
  component: () => import('@/views/Exam/manageMent/studentManagement'),
});
//阅卷管理
const Classroom = dynamic({
  component: () => import('@/views/Exam/Markmanagement/classRoom'),
});
const TabsFrom = dynamic({
  component: () => import('@/views/Exam/Markmanagement/tabform'),
});
console.log(Viewexam)


export default {
  routes: [{
    name: 'router.exam',
    children: [{
      name: 'router.exam.add',
      key: 1,
      id: 'main-addQuestions',
      path: '/questions/add',
      component: Addeaxm
    }, {
      name: 'router.exam.classify',
      key: 2,
      id: 'main-watchQuestions',
      path: '/questions/view',
      component: Typeexam
    }, {
      name: 'router.exam.test',
      id: 'main-questionsType',
      key: 3,
      path: '/questions/type',
      component: Viewexam
    }]
  }, {
    name: 'router.user',
    children: [{
      name: 'router.user.adduser',
      id: 'main-watchQuestions',
      key: 4,
      path: '/questions/adduser',
      component: Adduser
    }, {
      name: 'router.user.show',
      id: 'main-questionsType',
      key: 5,
      path: '/questions/viewuser',
      component: Viewuser
    }]
  }, {
    name: 'router.marking',
    children: [{
      name: 'router.marking.add',
      id: 'main-watchQuestions',
      key: 6,
      path: '/questions/addexams',
      component: Addexams
    }, {
      name: 'router.marking.lists',
      id: 'main-questionsType',
      key: 7,
      path: '/questions/examlist',
      component: Examlist
    }]
  }, {
    name: 'router.class',
    children: [{
      name: 'router.class.classmanage',
      id: 'main-watchQuestions',
      key: 8,
      path: '/questions/classManagement',
      component: Class
    }, {
      name: 'router.class.teammanage',
      id: 'main-questionsType',
      key: 9,
      path: '/questions/studentManagement',
      component: Classrooms
    }, {
      name: 'router.class.student',
      id: 'main-questionsType',
      key: 10,
      path: '/questions/classroomManagement',
      component: Student
    }]
  }, {
    name: 'router.markings',
    children: [{
      name: 'router.markings.class',
      id: 'main-watchQuestions',
      key: 11,
      path: '/questions/classroom',
      component: Classroom
    },{
      name: 'router.markings.tabs',
      id: 'main-watchQuestions',
      key: 12,
      path: '/questions/tabfrom',
      component: TabsFrom
    }]
  }]
}

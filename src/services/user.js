import request from '../utils/request';

// 登陆接口
export function login(params){
  return request({
    url: '/user/login',
    method: 'POST',
    data: params
  })
}

// 获取用户信息
export function getUserInfo(){
  return request({
    url: '/user/userInfo'
  })
}

// 获取用户权限
export function getViewAuthority(user_id){
  return request({
    url: '/user/new?user_id='+user_id
  })
}

export function type() {
  return request({
    url:"/exam/getQuestionsType",
    method:"GET"
  })
}

//获取试题类型
export function examType(){
  return request({
    url: '/exam/examType',
    method: 'GET',
  })
}

//获取考试类型
export function subject(){
  return request({
    url: '/exam/subject',
    method: 'GET',
  })
}

//获取考试类型
export function getQuestionsType(){
  return request({
    url: '/exam/getQuestionsType',
    method: 'GET',
  })
}


//获取所有的试题
export function questions(){
  return request({
    url: '/exam/questions/new',
    method: 'GET',
  })
}

//添加试题类型
export function insertQuestionsType(params){
  return request({
    url: `/exam/insertQuestionsType?text=${params.text}&sort=${params.sort}`,
    method: 'GET'
  })
}

//添加试题类型
export function condition(){
  return request({
    url: `/exam/questions/condition`,
    method: 'GET'
  })
}
//添加试题接口
export function questionsAdd(params){
  return request({
    url: `/exam/questions`,
    method: 'POST',
    data:params
  })
}

//更新试题
export function update(params){
  return request({
    url: `/exam/questions/update`,
    method: 'POST',
    data:params
  })
}

//展示用户数据
export function userView(){
  return request({
    url: `/user/user`,
    method: 'GET'
  })
}


//展示身份数据
export function identity(){
  return request({
    url: `/user/identity`,
    method: 'GET'
  })
}


//展示api权限接口
export function api_authority(){
  return request({
    url: `/user/api_authority`,
    method: 'GET'
  })
}

//展示身份和api权限关系
export function identity_api_authority_relation(){
  return request({
    url: `/user/identity_api_authority_relation`,
    method: 'GET'
  })
}

//获取视图权限数据
export function view_authority(){
  return request({
    url: `/user/view_authority`,
    method: 'GET'
  })
}

//展示身份和视图权限关系
export function authority_relation(){
  return request({
    url: `/user/identity_view_authority_relation`,
    method: 'GET'
  })
}
//添加用户
export function adduser(params){
  return request({
    url: `/user`,
    method: 'POST',
    data:params
  })
}
//更新用户
export function updateuser(params){
  return request({
    url: `/user/user`,
    method: 'POST',
    data:params
  })
}

//展示身份
export function identityato(params){
  return request({
    url: `/user/identity`,
    method: 'GET',
    data:params
  })
}

//添加身份
export function edit(params){
  return request({
    url: `/user/identity/edit?identity_text=${params.text}`,
    method: 'GET'
  })
}
//添加身份
export function authorityApi(params){
  return request({
    params:{
      api_authority_text:params.api_authority_text,
      api_authority_url : params.api_authority_url,
      api_authority_method : params.api_authority_method
    },
    url: '/user/authorityApi/edit',
    method: 'GET'
  })
}

//添加试题容器接口
export function usernew(params){
  return request({
    url: `/user/identity_api_authority_relation`,
    method: 'GET'
  })
}
//添加视图接口权限
export function authoritys(params){
  return request({
    url: `/user/authorityView/edit?view_authority_text=${params.view_authority_text}&view_id=${params.view_id}`,
    method: 'GET'
  })
}
//添加视图权限
export function authority(params){
  return request({
    url: `/user/view_authority`,
    method: 'GET'
  })
}
//给身份设置api接口权限
export function tityApi(params){
  return request({
    url: `/user/setIdentityApi`,
    method: 'POST',
    data:params
  })
}
//给身份设置视图权限
export function setiden(params){
  return request({
    url: `/user/setIdentityView`,
    method: 'POST',
    data:params
  })
}

//创建试卷接口
export function examfnDate(params){
  return request({
    url: `/exam/exam`,
    method: 'POST',
    data:params
  })
}

//创建试卷接口
export function examStudentList(params){
  return request({
    url: `/exam/exam`,
    method: 'GET'
  })
}

//更新试卷接口
export function putexam(params){
  return request({
    url: `/exam/exam/${params.str}`,
    method: 'PUT',
    data:{
      question_ids:params.question_ids
    }
  })
}

//获取试卷详情（教师端）接口
export function examtrench(params){
  return request({
    url: `/exam/exam/${params}`,
    method: 'GET'
  })
}


//获取学生试卷列表接口
export function studentList(params){
  return request({
    url: `/manger/grade`,
    method: 'GET'
  })
}

//获取学生试卷列表接口
export function student(params){
  return request({
    url: `/exam/student?grade_id=${params}`,
    method: 'GET'
  })
}

//获取学生试卷列表接口
export function studentdetail(params){
  return request({
    url: `/exam/student/${params}`,
    method: 'GET'
  })
}

//添加教室
export function addroom(params){
  return request({
    url: `/manger/room`,
    method: 'POST',
    data:params
  })
}

//添加班级
export function addgrade(params){
  return request({
    url: `/manger/grade`,
    method: 'POST',
    data:params
  })
}

//获取全部教室
export function room(params){
  return request({
    url: `/manger/room`,
    method: 'GET'
  })
}

//获取全部班级
export function grade(params){
  return request({
    url: `/manger/grade`,
    method: 'GET'
  })
}

//获取全部学生
export function studentarr(params){
  return request({
    url: `/manger/student`,
    method: 'GET'
  })
}

//删除教室接口
export function roomdelete(params){
  return request({
    url: `/manger/room/delete`,
    method: 'DELETE',
    data:{
      room_id:params
    }
  })
}

//删除班级接口
export function gradedelete(params){
  return request({
    url: `/manger/grade/delete`,
    method: 'DELETE',
    data:{
      grade_id:params
    }
  })
}

//删除学生接口
export function studentdelete(params){
  return request({
    url: `/manger/student/${params}`,
    method: 'DELETE'
  })
}

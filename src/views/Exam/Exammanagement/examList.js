import React, { Component } from 'react';
import { Button, Select,Tabs} from 'antd';
import { connect } from 'dva';
const { TabPane } = Tabs;
const { Option } = Select;

class addUser extends Component {
    state={
        detail:[],
        subject:[],
        detailValue:'',
        subjectValue:'',
        examList:[]
    }
    componentDidMount(){
        this.props.examType()
    }
    componentWillReceiveProps(newProps){
        let {detail,subject,studentList} = newProps
        this.setState({
            detail,
            subject,
            examList:studentList
        })
    }
    render() {
        let {detail,subject,examList} = this.state
        return (
            <div className="content">
                <h2 style={{marginTop: "10px" }}>试卷列表</h2>
                <div className="conent_els">
                     <div>
                     <span>考试类型:</span>
                     <Select placeholder="请选择考试类型" style={{ width: '150px' }} onChange={this.handleChange}>
                        {
                            detail && detail.map((el,i)=>{
                              return <Option key={i} value={el.exam_id}>{el.exam_name}</Option>
                            })
                        }
                    </Select>
                     </div>
                     <div>
                     <span>课程:</span>
                     <Select placeholder="请选择课程类型" style={{ width: '150px' }} onChange={this.handleChange}>
                        {
                            subject && subject.map((el,i)=>{
                                return <Option key={i} value={el.subject_id}>{el.subject_text}</Option>
                            })
                        }
                    </Select>
                     </div>
                     <Button type="primary" icon="search">查询</Button>
                </div>
                <div className="el_conent">
                    <div className="tabs_conent">
                        <span>试卷列表</span>
                        <Tabs onChange={this.callback} type="card">
                            <TabPane tab="全部" key="1"></TabPane>
                            <TabPane tab="进行中" key="2"></TabPane>
                            <TabPane tab="已结束" key="3"></TabPane>
                        </Tabs>
                    </div>
                    <div className="ulsList">
                        <ul className="uls">
                            <li className="active_top"><ol><li>试卷信息</li>
                            <li>班级</li>
                            <li>创建人</li>
                            <li>开始时间</li>
                            <li>结束时间</li>
                            <li>操作</li></ol></li>
                            {
                                examList && examList.map((el,i)=>{
                                    return <li key={i}><ol><li>{el.title}</li>
                                    <li><div>考试班级</div><div >{el.grade_name.map((item,index)=>{
                                        return <span key={index}>{item}</span>
                                    })}</div></li>
                                    <li>{el.user_name}</li>
                                    <li>{el.start_time}</li>
                                    <li>{el.end_time}</li>
                                    <li><a href="javascript:;" onClick={this.topstype.bind(this,el.exam_exam_id)}>详情</a></li></ol></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    topstype=(e)=>{
        let {history:{push}} = this.props
        push(`/questions/viewDetail?id=${e}`)
    }
}
const mapStateToProps = state => {
  return { ...state.add }
}

const mapDisaptchToProps = dispatch => {
  return {
      examType(payload) {
          dispatch({
              type: 'add/examTypes',
              payload
          })
      }
  }
}
export default connect(mapStateToProps, mapDisaptchToProps)(addUser);

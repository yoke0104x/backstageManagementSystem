import React, { Component } from 'react';
import { Button, Select,Table} from 'antd';

import { connect } from 'dva';
const { Option } = Select;

class addUser extends Component {
    constructor(props){
        super(props)
        this.state={
            detail:[],
            subject:[],
            detailValue:'',
            subjectValue:'',
            examList:[],
            columns:[
                {
                  title: '班级',
                  key:'4',
                  render: (text, record) => {
                    let str = props.location.search.split('=')[2]
                      return <span>{str}</span>
                  }
                },
                {
                  title: '姓名',
                  dataIndex: 'student_name',
                  key: '1',
                },
                {
                  title: '阅卷状态',
                  key:'5',
                  render: (text, record) => {
                      return <span>{text.status?'已阅':'未阅'}</span>
                  }
                },
                {
                  title: '开始时间',
                  key: '2',
                  dataIndex: 'start_time'
                },
                {
                    title: '结束时间',
                    key: '3',
                    dataIndex: 'end_time'
                },
                {
                    title: '成才率',
                    key:'6',
                    render: (text, record) => (
                        <span>-</span>
                    )
                },
                {
                  title: '操作',
                  key: '7',
                  render: (text, record) => {
                      function arr(e){
                        let {history:{push}} =props
                        push(`/questions/detailclass?id=${e}`)
                      }
                    return <span>
                      <a href="javascript:;" onClick={()=>{
                          arr(text.exam_student_id)
                      }}>批卷</a>
                    </span>
                  }
                },
              ],
        }
    }
    
    componentDidMount(){
        let str = this.props.location.search.split('=')[1].split('&')[0]
        this.props.examType(str)
    }
    componentWillReceiveProps(newProps){
        console.log(newProps)
        this.setState({
            subject:newProps.stanList,
            examList:newProps.studt
        })
    }
    render() {
        let {detail,subject,examList,columns} = this.state
        console.log(examList)
        return (
            <div className="content">
                <h2 style={{marginTop: "10px" }}>试卷列表</h2>
                <div className="conent_els">
                     <div>
                     <span>状态:</span>
                     <Select placeholder="" style={{ width: '150px' }} onChange={this.handleChange}>
                        {
                            detail && detail.map((el,i)=>{
                              return <Option key={i} value={el.exam_id}>{el.exam_name}</Option>
                            })
                        }
                    </Select>
                     </div>
                     <div>
                     <span>班级:</span>
                     <Select placeholder="请选择班级" style={{ width: '150px' }} onChange={this.handleChange}>
                        {
                            subject && subject.map((el,i)=>{
                                return <Option key={i} value={el.grade_id}>{el.grade_name}</Option>
                            })
                        }
                    </Select>
                     </div>
                     <Button type="primary" icon="search">查询</Button>
                </div>
                <div className="el_conent">
                    <Table columns={columns} dataSource={examList} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
  return { ...state.macking }
}

const mapDisaptchToProps = dispatch => {
  return {
      examType(payload) {
          dispatch({
              type: 'macking/mackingList',
              payload
          })
      }
  }
}
export default connect(mapStateToProps, mapDisaptchToProps)(addUser);

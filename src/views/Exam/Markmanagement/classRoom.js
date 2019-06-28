import React, { Component } from 'react'
import { connect } from 'dva';
import { Table} from 'antd';
class viewDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            stanList:[],
            columns:[
                {
                  title: '班级名',
                  dataIndex: 'grade_name',
                  key: 'name'
                },
                {
                  title: '课程名称',
                  dataIndex: 'subject_text',
                  key: 'age',
                },
                {
                  title: '阅卷状态',
                  dataIndex: '',
                  key: 'address',
                },
                {
                  title: '课程名称',
                  key: 'subject_text',
                  dataIndex: 'subject_text'
                },
                {
                    title: '成材率',
                    key: 'room_text',
                    dataIndex: 'room_text'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: (text, record) => {
                      function arr(e,i){
                        let {history:{push}} =props
                        push(`/questions/marklist?id=${e}&room=${i}`)
                      }
                    return <span>
                      <a href="javascript:;" onClick={()=>{
                          arr(text.grade_id,text.grade_name)
                      }}>批卷</a>
                    </span>
                  }
                },
              ],
        }
    }
    
    render() {
        let {columns,stanList} = this.state
        return (
            <div className="content">
                <h2 style={{marginTop: "10px" }}>待批班级</h2>
                <div className="el_conent">
                    <Table columns={columns} dataSource={stanList} />
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.props.examType()
    }
    componentWillReceiveProps(newProps){
        this.setState({
            stanList:newProps.stanList
        })
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
export default connect(mapStateToProps, mapDisaptchToProps)(viewDetail);
  

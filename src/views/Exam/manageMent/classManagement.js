import React, { Component } from 'react';
import { Modal, Button, Input, Select, Table, Divider ,message} from 'antd';
import { connect } from "dva"
import "./index.scss"
const { Option } = Select;

class classManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns : [
                {
                    title: '班级名',
                    dataIndex: 'grade_name',
                    render: text => <a href="javascript:;">{text}</a>
                },
                {
                    title: '课程名',
                    dataIndex: 'subject_text'
                },
                {
                    title: '教室号',
                    dataIndex: 'room_text'
                },
                {
                    title: '操作',
                    render: (text, record) => {
                        function btn(e) {
                            props.adduser(e)
                        }
                        return <span>
                            <a href="javascript:;" onClick={()=>{
                                btn(text.room_id)
                            }}>删除 {record.name}</a>
                        </span>
                    }
                },
            ]
        }

    }
    state = {
        visible: false,
        data: [],
        arr:[],
        name:'',
        select2:'',
        select1:''
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        let { name ,select1,select2} = this.state;
        this.props.addrom({
            grade_name: name,
            room_id:select1,
            subject_id:select2
        })
        message.info("插入成功");
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        this.props.adduser();
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.grades,
            arr:newProps.romms,
            list:newProps.subjects
        })
    }
    render() {
        let {arr,columns,name,data,list} = this.state
        return (
            <div className="arrrrr content">
               <h2 style={{ marginTop: "10px" }}>班级管理</h2>
                <div>
                    <Button type="primary" onClick={this.showModal} style={{margin:'0  0 20px 0'}}>
                        + 添加班级
                    </Button>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        okText="确认"
                        cancelText="取消"
                        onCancel={this.handleCancel}
                    >
                        <p>班级名</p>
                        <Input placeholder="请输入班级名"  value={name} onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    })
                                }}></Input>
                        <p>教室号</p>
                        <Select
                            labelInValue
                            defaultValue={{ key: '请渲染教室号' }}
                            style={{ width: 120 }}
                            onChange={this.handleChange1.bind(this)}
                        >
                            {
                                arr && arr.map((el, i) => {
                                    return <Option key={i} value={el.room_id}>{el.room_text}</Option>
                                })
                            }
                        </Select>
                        <p>课程名</p>
                        <Select
                            labelInValue
                            defaultValue={{ key: '请输入课程名' }}
                            style={{ width: 120 }}
                            onChange={this.handleChange2.bind(this)}
                        >
                            {
                                list && list.map((item, i) => {
                                    return <Option key={i} value={item.subject_id}>{item.subject_text}</Option>
                                })
                            }
                        </Select>
                    </Modal>
                </div>
                <div className="el_conent">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        );
    }
    handleChange1 = (value) => {
        this.setState({
            select1: value.key
        })
    }
    handleChange2 = (value) => {
        this.setState({
            select2: value.key
        })
    }
}
const mapStateToProps = state => {
    return {
        ...state.management
    }
}

const mapDisaptchToProps = dispatch => {
    return {
        adduser(payload) {
            dispatch({
                type: 'management/examTypes',
                payload
            })
        },
        addrom(payload) {
            dispatch({
                type: 'management/add',
                payload
            })
        }
    }
}
export default connect(mapStateToProps, mapDisaptchToProps)(classManagement);
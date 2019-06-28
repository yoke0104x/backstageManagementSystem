import React, { Component } from 'react';
import { connect } from "dva"
import { Input, Select, Button, Table } from 'antd';
import "./index.scss"
const { Option } = Select;

function handleChange(value) {

}

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class studentManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns :[
                {
                    title: '姓名',
                    dataIndex: 'student_name',
                    render: text => <a href="javascript:;">{text}</a>,
                },
                {
                    title: '学号',
                    dataIndex: 'student_id',
                },
                {
                    title: '班级',
                    dataIndex: 'grade_name',
                },
                {
                    title: '教室',
                    dataIndex: 'room_text',
                },
                {
                    title: '密码',
                    dataIndex: 'student_pwd',
                },
                {
                    title: '操作',
                    render: (text, record) => {
                        function btn(e) {
                            props.adduser(e)
                        }
                        return <span>
                            <a href="javascript:;" onClick={()=>{
                                btn(text.student_id)
                            }}>删除 {record.name}</a>
                        </span>
                    }
                },
            ]
        }

    }
    state = {
        data: [],
        arr: [],
        list: []
    }
    componentDidMount() {
        this.props.adduser();
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.students,
            arr: newProps.romms,
            list: newProps.grades
        })
    }
    render() {
        
        let { data, arr, list ,columns} = this.state
        return (
            <div className="content">
                <h2 style={{ marginTop: "10px" }}>学生管理</h2>
                <div className="nav el_conent" style={{height:'auto'}}>
                    <Input placeholder="输入学生姓名"></Input>
                    <Select labelInValue defaultValue={{ key: '请选择教室号' }} style={{ width: 120 }} onChange={handleChange} className="select">
                        {
                            arr && arr.map((el, i) => {
                                return <Option key={i} value={el.room_id}>{el.room_text}</Option>
                            })
                        }
                    </Select>
                    <Select labelInValue defaultValue={{ key: '班级名' }} style={{ width: 120 }} onChange={handleChange} className="select">
                        {
                            list && list.map((el, i) => {
                                return <Option key={i} value={el.grade_id}>{el.grade_name}</Option>
                            })
                        }
                    </Select>
                    <Button type="primary">搜索</Button>
                    <Button type="primary">重置</Button>
                </div>
                <div className="el_conent">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </div>
            </div>
        );
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
        }
    }
}
export default connect(mapStateToProps, mapDisaptchToProps)(studentManagement);
import React, { Component } from 'react';
import { Table, Button, Modal, Input, Divider, message } from 'antd';
import { connect } from "dva"
import "./index.scss"
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
class classroomManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
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
                            <a href="javascript:;" onClick={() => {
                                btn(text.room_id)
                            }}>删除 {record.name}</a>
                            <Divider type="vertical" />
                        </span>
                    }
                },
            ]
        }

    }
    state = {
        data: [],
        visible: false,
        name: ""
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        let { name } = this.state;
        this.props.addclasss({
            room_text: name
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
            data: newProps.romms
        })
    }
    render() {
        let { data, columns, name } = this.state
        return (
            <div className="content">
                <div>
                <h2 style={{marginTop: "10px" }}>教室管理</h2>
                    <div>
                        <Button type="primary" onClick={this.showModal} style={{margin:'0  0 20px 0'}}>
                            + 添加教室
                        </Button>
                        <Modal
                            title="Basic Modal"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            okText="确认"
                            cancelText="取消"
                            onCancel={this.handleCancel}>
                            <p>班级名</p>
                            <Input placeholder="请输入班级名" value={name} onChange={(e) => {
                                this.setState({
                                    name: e.target.value
                                })
                            }}></Input>
                        </Modal>
                    </div>
                    <div className="el_conent">
                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                    </div>
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
        },
        addclasss(payload) {
            dispatch({
                type: 'management/addclass',
                payload
            })
        }
    }
}
export default connect(mapStateToProps, mapDisaptchToProps)(classroomManagement);
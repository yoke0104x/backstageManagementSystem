import React, { Component } from 'react';
import { Tabs, Input, Button, Select, message } from 'antd';
import { connect } from 'dva';
import "./addUser.scss"
const { TabPane } = Tabs;
const { Option } = Select;

class addUser extends Component {
    state = {
        name: '',
        pwd: '',
        names: '',
        pwds: '',
        select1: '',
        select2: '',
        select3: '',
        select4: '',
        Identity: '',
        apiname: '',
        apiurl: '',
        apifangfa: '',
        classification:"",
        labels:'',
        data: [],
        arr: [],
        list: []
    }
    constructor(props) {
        super(props);
        this.state = {
            mode: 'top',
        };
    }
    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({ mode });
    };
    componentDidMount() {
        this.props.adduser();
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            data: newProps.identity,
            arr: newProps.usernew,
            list: newProps.authority
        })
    }
    render() {
        let { name, pwd, names, pwds, data, Identity, arr, list } = this.state
        return (
            <div className="content box">
                <h2 style={{marginTop: "10px",width:'100%'}}>添加用户</h2>
                <div className="box_list">
                    <div className="list_box">
                        <Tabs>
                            <TabPane tab="添加用户" key="1" className="tabpane">
                                <Input className="input" placeholder="请输入用户名" value={name} onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    })
                                }}></Input>
                                <Input className="input" placeholder="请输入密码" value={pwd} onChange={(e) => {
                                    this.setState({
                                        pwd: e.target.value
                                    })
                                }}></Input>
                                <Select className="select" labelInValue defaultValue={{ key: '选择身份ID' }} style={{ width: 120 }} onChange={this.handleChange1.bind(this)}>
                                    {
                                        data && data.map((el, i) => {
                                            return <Option key={i} value={el.identity_id}>{el.identity_text}</Option>
                                        })
                                    }
                                </Select>
                                <Button type="primary" onClick={this.btn.bind(this)}>添加</Button>
                                <Button>重置</Button>
                            </TabPane>
                            <TabPane tab="更新用户" key="2" className="tabpane">
                                <Select className="select" labelInValue defaultValue={{ key: '选择身份ID' }} style={{ width: 120 }} onChange={this.handleChange2.bind(this)}>
                                    <Option value="jack">Jack (100)</Option>
                                    <Option value="lucy">Lucy (101)</Option>
                                </Select>
                                <Input className="input" placeholder="请输入用户名" value={names} onChange={(e) => {
                                    this.setState({
                                        names: e.target.value
                                    })
                                }}></Input>
                                <Input className="input" placeholder="请输入密码" value={pwds} onChange={(e) => {
                                    this.setState({
                                        pws: e.target.value
                                    })
                                }}></Input>
                                <Select className="select" labelInValue defaultValue={{ key: '选择身份ID' }} style={{ width: 120 }} onChange={this.handleChange3.bind(this)}>
                                    <Option value="jack">Jack (100)</Option>
                                    <Option value="lucy">Lucy (101)</Option>
                                </Select>
                                <Button type="primary" type="primary" onClick={this.btn3.bind(this)}>添加</Button>
                                <Button>重置</Button>
                            </TabPane>
                        </Tabs>
                    </div>

                </div>
                <div className="box_list">
                    <div className="list_box">
                        <h1>添加身份</h1>
                        <Input className="input" placeholder="请您添加身份" value={Identity} onChange={(e) => {
                            this.setState({
                                Identity: e.target.value
                            })
                        }}></Input>
                        <Button type="primary" onClick={this.btn1.bind(this)}>添加</Button>
                        <Button>重置</Button>
                    </div>
                </div>
                <div className="box_list">
                    <div className="list_box">
                        <h1>添加api身份权限</h1>
                        <Input className="input" placeholder="请输入api接口权限名称" onChange={(e) => {
                            this.setState({
                                apiname: e.target.value
                            })
                        }}></Input>
                        <Input className="input" placeholder="请输入api接口权限url" onChange={(e) => {
                            this.setState({
                                apiurl: e.target.value
                            })
                        }}></Input>
                        <Input className="input" placeholder="请输入api接口权限方法" onChange={(e) => {
                            this.setState({
                                apifangfa: e.target.value
                            })
                        }}></Input>
                        <Button type="primary" onClick={this.btn2.bind(this)}>添加</Button>
                        <Button>重置</Button>
                    </div>

                </div>
                <div className="box_list">
                    <div className="list_box">
                        <h1>添加视图接口权限</h1>
                        <Select className="select" labelInValue defaultValue={{ key: '试题分类' }} style={{ width: 120 }} onChange={this.handleChange4.bind(this)}>
                            {
                                list && list.map((el, i) => {
                                    return <Option key={i} value={el.view_id} >{el.view_authority_text}</Option>
                                })
                            }
                        </Select>
                        <Button type="primary" onClick={this.btn4.bind(this)}>添加</Button>
                        <Button>重置</Button>
                    </div>

                </div>
                <div className="box_list">
                    <div className="list_box">
                        <h1>给身份设置api接口权限</h1>
                        <Select className="select" labelInValue defaultValue={{ key: '选择身份ID' }} style={{ width: 120 }} onChange={this.handleChange5.bind(this)}>
                            {
                                data && data.map((el, i) => {
                                    return <Option key={i} value={el.identity_id}>{el.identity_text}</Option>
                                })
                            }
                        </Select>
                        <Select className="select" labelInValue defaultValue={{ key: '选择api接口' }} style={{ width: 120 }} onChange={this.handleChange6.bind(this)}>
                            {
                                arr && arr.map((el, i) => {
                                    return <Option key={i} value={el.identity_api_authority_relation_id}>{el.api_authority_text}</Option>
                                })
                            }
                        </Select>
                        <Button type="primary" onClick={this.btn5.bind(this)}>添加</Button>
                        <Button>重置</Button>
                    </div>
                </div>
                <div className="box_list">
                    <div className="list_box">
                        <h1>给身份设置api接口权限</h1>
                        <Select className="select" labelInValue defaultValue={{ key: '选择身份ID' }} style={{ width: 120 }} onChange={this.handleChange7.bind(this)}>
                            {
                                data && data.map((el, i) => {
                                    return <Option key={i} value={el.identity_id}>{el.identity_text}</Option>
                                })
                            }
                        </Select>
                        <Select className="select" labelInValue defaultValue={{ key: '选择视图接口权限' }} style={{ width: 120 }} onChange={this.handleChange8.bind(this)}>
                            {
                                list && list.map((el, i) => {
                                    return <Option key={i} value={el.view_authority_id}>{el.view_authority_text}</Option>
                                })
                            }
                        </Select>
                        <Button type="primary" onClick={this.btn6.bind(this)}>添加</Button>
                        <Button>重置</Button>
                    </div>
                </div>
            </div>
        );
    }
    handleChange1 = (value) => {
        this.setState({
            select1: value
        })
    }
    handleChange2 = (value) => {

    }
    handleChange3 = (value) => {

    }
    handleChange4 = (value) => {
        this.setState({
            classification:value.key,
            labels:value.label
        })
    }
    handleChange5 = (value) => {
        this.setState({
            select1: value.key
        })
    }
    handleChange6 = (value) => {
        this.setState({
            select2: value.key
        })
    }
    handleChange7 = (value) => {
        this.setState({
            select3: value.key
        })
    }
    handleChange8 = (value) => {
        this.setState({
            select4: value.key
        })
    }
    btn = () => {
        let { name, pwd, select1 } = this.state;
        var that = this
        that.props.addUSE({
            user_name: name,
            user_pwd: pwd,
            identity_id: select1
        })
    }
    btn1 = () => {
        let { Identity } = this.state;
        this.props.adduu({
            text: Identity
        })
        message.info("插入成功");
    }
    btn2 = () => {
        let { apiname, apiurl, apifangfa } = this.state;
        this.props.adduser({
            api_authority_text: apiname,
            api_authority_url: apiurl,
            api_authority_method: apifangfa
        })
        message.info("插入成功");
    }
    btn3 = () => {
        let { apiname, apiurl, apifangfa } = this.state;
        this.props.adduser({
            user_id: apiname,
            user_name: apiurl,
            user_pwd: apifangfa,
            identity_id: apifangfa
        })
        message.info("插入成功");
    }
    btn4 = () => {
        let { classification,labels} = this.state;
        this.props.updateusers({
            view_authority_text: classification,
            view_id: labels
        })
    }
    btn5 = () => {
        let { select1,select2} = this.state;
        this.props.titys({
            identity_id: select1,
            api_authority_id: select2
        })
    }
    btn6 = () => {
        let { select3,select4} = this.state;
        this.props.sets({
            identity_id: select3,
            view_authority_id: select4
        })
    }
}

const mapStateToProps = state => {
    return {
        ...state.view
    }
}

const mapDisaptchToProps = dispatch => {
    return {
        adduser(payload) {
            dispatch({
                type: 'view/examTypes',
                payload
            })
        },
        addUSE(payload) {
            dispatch({
                type: 'view/addUSER',
                payload
            })
        },
        adduu(payload) {
            dispatch({
                type: 'view/adduu',
                payload
            })
        },
        updateusers(payload) {
            dispatch({
                type: 'view/updrss',
                payload
            })
        },
        titys(payload) {
            dispatch({
                type: 'view/tity',
                payload
            })
        },
        sets(payload) {
            dispatch({
                type: 'view/set',
                payload
            })
        }
    }
}
export default connect(mapStateToProps, mapDisaptchToProps)(addUser);
import React, { Component } from 'react'
import { Input, Select, Button, Modal ,message} from 'antd';
// import Editor from 'for-editor'
import Editor from '../../../vendor/for-editor'
import { connect } from 'dva';
const { Option } = Select;
const confirm = Modal.confirm;

class Addexam extends Component {

    state = {
        value: '',
        value1: '',
        value2: '',
        select1:'',
        select2:'',
        select3:'',
        detail: [],
        subject: [],
        getQuestionsType: [],
        str:{},
    }
    componentDidMount() {
        this.props.examType();
        let str = window.localStorage.getItem("str")
        let stry = JSON.parse(str)
        if(str){
            this.setState({
                value: stry.questions_stem,
                value1: stry.title,
                value2: stry.questions_answer,
                select1:stry.exam_name,
                select2:stry.subject_text,
                select3:stry.questions_type_text,
            })
        }
    }
    componentWillReceiveProps (newProps) {
        this.setState({
            detail: newProps.detail,
            subject: newProps.subject,
            getQuestionsType: newProps.getQuestionsType
        })
    }
    render() {
        let { value, value1, detail, subject, getQuestionsType,value2,str} = this.state
        
        return (
            <div className="content">
                <h2 style={{ marginTop: "10px" }}>{str.questions_stem?'编辑试题':'添加试题'}</h2>
                <div className="el_conent">
                    <p>题目信息</p>
                    <p>题干</p>
                    <Input size="large" placeholder="请输入题目标题，不超过20个字" value={value1} allowClear onChange={(e) => {
                        this.setState({
                            value1: e.target.value
                        })
                    }} />
                    <p style={{ marginTop: '20px' }}>题目主题</p>

                    <Editor value={value} onChange={this.handleChange.bind(this)} />

                    <p style={{ marginTop: '20px' }}>请选择考试类型：</p>
                    <div>
                        <Select defaultValue='周考二' style={{ width: 120 }} onChange={this.select1.bind(this)}>
                            {
                                detail.map((el, i) => {
                                    return <Option key={i} value={el.exam_id}>{el.exam_name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <p style={{ marginTop: '20px' }}>请选择课程类型：</p>
                    <div>
                        <Select defaultValue="" style={{ width: 120 }} onChange={this.select2.bind(this)}>
                            {
                                subject && subject.map((el, i) => {
                                    return <Option key={i} value={el.subject_id}>{el.subject_text}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <p style={{ marginTop: '20px' }}>请选择题目类型：</p>
                    <div>
                        <Select defaultValue='' style={{ width: 120 }} onChange={this.select3.bind(this)}>
                            {
                                getQuestionsType && getQuestionsType.map((el, i) => {
                                    return <Option key={i} value={el.questions_type_id}>{el.questions_type_text}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <p style={{ marginTop: '20px' }}>答题信息</p>
                    <Editor value={value2} onChange={this.value2leChange.bind(this)} />
                    <Button type="primary" size='large' style={{ margin: '20px 0' }} onClick={this.btn.bind(this)}>提交</Button>
                </div>
            </div>
        )
    }

    select1 = (value) => {
        this.setState({
            select1:value
        })
    }
    select2 = (value) => {
        this.setState({
            select2:value
        })
    }
    select3 = (value) => {
        this.setState({
            select3:value
        })
    }
    handleChange = (value) => {
        this.setState({
            value:value
        })
    }
    value2leChange = (value) => {
        this.setState({
            value2:value
        })
    }
    
    btn = () => {
        // let {value,value1,value2,select1,select2,select3} = this.state;
        var that = this
        confirm({
            title: '你确定要添加这道试题吗?',
            content: '真的要添加吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                // that.props.addTop({
                //     questions_type_id:select3,
                //     questions_stem:value1,
                //     subject_id:select2,
                //     exam_id:select1,
                //     user_id:'w6l6n-cbvl6s',
                //     questions_answer:value2,
                //     title:value
                // })
                if(window.localStorage.getItem("str")){
                    message.info("更新成功");
                }else{
                    message.info("插入成功");
                }
                let {history:{push}} = that.props;
                push("/questions/view")
                window.localStorage.clear();
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
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
        },
        addTop(payload) {
            dispatch({
                type: 'add/questionsAdd',
                payload
            })
        }
    }
}
export default connect(mapStateToProps, mapDisaptchToProps)(Addexam);

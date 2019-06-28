import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Button
} from 'antd';
const { Option } = Select;
const {RangePicker } = DatePicker;
class addUser extends Component {
    
    state = {
      number: {
        value: 1,
      },
      select:[],
      select2:[],
      value:'',
      seletValue: ''
    };
    componentDidMount(){
      this.props.examType()
    }

    componentWillReceiveProps(newProps){
      this.setState({ 
        select:newProps.detail,
        select1:newProps.subject
      })
      if(newProps.arr){
        window.localStorage.all = JSON.stringify(newProps.arr.data)
        newProps.history.push("/questions/addevent")
      }
    }
    render() {
        let {getFieldDecorator} = this.props.form
        let {number,select,select1} = this.state
        return (
            <div className="content">
                <h2 style={{marginTop: "10px" }}>添加考试</h2>
                <div className="el_conent">
                  <Form onSubmit={this.handleSubmit}>
                  <Form.Item label="试卷名称">
                      {getFieldDecorator('name', {
                        rules: [
                          {
                            required: true,
                            message: '请输入试卷名称',
                          },
                        ],
                      })(<Input style={{width:'400px'}}/>)}
                    </Form.Item>
                    <Form.Item label="选择考试类型">
                      {getFieldDecorator('gender', {
                        rules: [{ required: true, message: '选择考试类型!' }],
                      })(
                        <Select
                          placeholder="选择考试类型!"
                          style={{width:'150px'}}
                        >
                          {
                            select && select.map((el,i)=>{
                              return <Option key={i} value={el.exam_id}>{el.exam_name}</Option>
                            })
                          }
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="选择课程">
                      {getFieldDecorator('genders', {
                        rules: [{ required: true, message: '选择课程类型' }],
                      })(
                        <Select
                          placeholder="选择课程类型"
                          style={{width:'150px'}}
                        >
                          {
                            select1 && select1.map((el,i)=>{
                              return <Option key={i} value={el.subject_id}>{el.subject_text}</Option>
                            })
                          }
                        </Select>,
                      )}
                    </Form.Item>
                    <Form.Item label="设置题量"
                     validateStatus={number.validateStatus}
                    >
                      {
                          getFieldDecorator('inputnum', {
                            rules: [{ required: true, message: '设置题量' }],
                          })(
                            <InputNumber min={3} max={10} setFieldsValue={number.value} onChange={this.handleNumberChange} />
                          )
                      }
                      
                    </Form.Item>
                    <Form.Item label="考试时间">
                      {getFieldDecorator('range-time-picker', [{ type: 'array', required: true, message: 'Please select time!' }])(
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                      )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit">
                      创建试卷
                    </Button>
                    </Form.Item>
                  </Form>
                </div>
            </div>
        );
    }
    handleSubmit=(e)=>{
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if(values.name && values.genders && values.gender){
            this.props.examType({
                subject_id:values.genders,
                exam_id:values.gender,
                title:values.name,
                number:values.inputnum,
                start_time:Number(values['range-time-picker'][0]['_d']),
                end_time:Number(values['range-time-picker'][1]['_d'])
            })
        }
      });
    }
    
    handleNumberChange=value=>{
      this.setState({
        number: {
          value,
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
      }
  }
}
export default connect(mapStateToProps, mapDisaptchToProps)( Form.create({ name: 'register' })(addUser));

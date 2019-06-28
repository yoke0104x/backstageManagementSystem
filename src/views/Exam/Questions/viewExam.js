import React, { Component } from 'react'
import { connect } from 'dva';
import { Radio,Select ,Button } from 'antd';
import ViewComponent from '../../../components/ViewComponent'
const { Option } = Select;

 class Viewexam extends Component {
    state={
        select1:'',
        select2:'',
        change:'',
        questions:[]
    }
    componentDidMount(){
        this.props.examType()
    }
    
    render() {
        let {subject,detail,getQuestionsType} = this.props
        let {questions} = this.state;
        return (
            <div className="content">
                <h2 style={{marginTop: "10px" }}>查看试题</h2>
                <div className="el_conent">
                    <div>
                        <span>课程类型：</span>
                        <Radio.Group defaultValue="a" onChange={this.change.bind(this)}>
                        <Radio.Button value="all">all</Radio.Button>
                            {
                                subject && subject.map((el,i)=>{
                                    return <Radio.Button key={i} value={el.subject_id}>{el.subject_text}</Radio.Button>
                                })
                            }
                        </Radio.Group>
                        <div className="el-Button">
                        <div>
                            <span>考试类型：</span>
                            <Select defaultValue='周考二' style={{ width: 120 }} onChange={this.select1.bind(this)}>
                                {
                                detail && detail.map((el,i)=>{
                                    return <Option key={i} value={el.exam_id}>{el.exam_name}</Option>
                                })
                                }
                            </Select> 
                        </div>
                        <div>
                        <span>题目类型：</span>
                            <Select defaultValue='' style={{ width: 120 }} onChange={this.select2.bind(this)}>
                            {
                            getQuestionsType && getQuestionsType.map((el,i)=>{
                                return <Option key={i} value={el.questions_type_id}>{el.questions_type_text}</Option>
                            })
                            }
                        </Select>
                        </div>
                        <Button type="primary" icon="search" onClick={this.btn.bind(this)}>搜索</Button>  
                        </div>
                    </div>
                </div>
                <div className="el_conent">
                    <ViewComponent data={questions} fn={(e)=>{
                        console.log(this)
                        this.props.history.push(`/questions/detail?id=${e}`)
                    }} fn1={(e)=>{
                        this.props.history.push(`/questions/add?id=${e}`)
                    }}/>
                </div>
            </div>
        )
    }
    
    select1=(value)=>{
        this.setState({
            select1:value
        })
    }

    select2=(value)=>{
        this.setState({
            select2:value
        })
    }
    change=(e)=>{
        this.setState({
            change:e.target.value
        })
    }
    btn=()=>{
        let {select1,select2,change} = this.state
        this.props.examType(`?questinos_id=${''}&questions_type_id=${change}&subject_id=${select1}&exam_id=${select2}`)
    }
    detailpush=()=>{
    }
    componentWillReceiveProps(newProps){
        this.setState({
            questions:newProps.questions
        })
        if(newProps.condition){
            this.setState({
                questions:newProps.condition.splice(Math.floor(Math.random()*3),Math.floor(Math.random()*10))
            })
        }
    }
}
const mapStateToProps = state => {
    return {...state.add}
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
export default connect(mapStateToProps,mapDisaptchToProps)(Viewexam)
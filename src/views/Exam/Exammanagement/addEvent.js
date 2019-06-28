import React, { Component } from 'react';
import { connect } from 'dva';
import { Button , Drawer,Icon} from 'antd';
import Arrrs from '../Questions/viewExam'
class addUser extends Component {
    
    state = {
        arr:{}
    };
    componentDidMount(){
        this.setState({
            arr:JSON.parse(window.localStorage.getItem("all"))
        })
    }
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        let {arr} = this.state;
        return (
            <div className="content">
                <h2 style={{marginTop: "10px" }}>添加考试</h2>
                <div className="el_conent">
                    <Button onClick={this.showDrawer}>添加新题</Button>
                    <Drawer
                        title="添加新题"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={1500}
                        >
                        <Arrrs />
                    </Drawer>
                    <div style={{width:'100%',textAlign:'center'}}>
                        <div>
                            <h2>{arr && arr.title}</h2>
                            <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
                        </div>
                    </div>
                    {
                        arr && arr.questions.map((el,i)=>{
                            return <div style={{width:'90%',border:'1px solid #ccc',margin:'20px auto',padding:'15px',boxSizing:'border-box'}} key={i}>
                                <p style={{display:'flex',justifyContent:'space-between'}}><span>{i+1}、{el.title}</span><span><a href="javascript:;">删除</a></span></p>
                                <pre><code>{el.questions_stem}</code></pre>
                            </div>
                        })
                    }
                    <p style={{textAlign:'center'}}><Button type="primary" onClick={this.btnsarr}><Icon type="plus" />创建试卷</Button></p>
                </div>
                
            </div>
        );
    }
    btnsarr=()=>{
        var arr = []
        JSON.parse(window.localStorage.getItem("all")).questions.forEach(element => {
            arr.push(element.questions_id)
        });
        this.props.examType({
            str:JSON.parse(window.localStorage.getItem("all")).exam_exam_id,
            question_ids:JSON.stringify(arr)
        })
    }
    componentWillReceiveProps(newProps){
        if(newProps.isexam === 1){
            newProps.history.push("/questions/examlist")
        }
    }
}
const mapStateToProps = state => {
  return { ...state.add }
}

const mapDisaptchToProps = dispatch => {
  return {
      examType(payload) {
          dispatch({
              type: 'add/putarr',
              payload
          })
      }
  }
}
export default connect(mapStateToProps, mapDisaptchToProps)(addUser);

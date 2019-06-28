import React, { Component } from 'react'
import { connect } from 'dva';
class viewDetail extends Component {
    state={
        stanList:[]
    }
    render() {
        let {stanList} = this.state
        return (
            <div className="content">
                <h2 style={{ marginTop: "10px" }}>试卷详情</h2>
                <div className="el_conent">{
                    stanList && stanList.map((el,i)=>{
                        return <div key={i} style={{border:'1px solid #000',margin:'30px 0',padding:'20px',boxSizing:'border-box'}}>
                            <div>{i+1}、{el.title}</div>
                            <h2 style={{fontSize:'30px',height:'auto'}}>{el.questions_stem.slice(2)}</h2>
                        </div>
                    })
                }
                </div>
            </div>
        )
    }
    componentDidMount(){
        let str = this.props.location.search.split('=')[1]
        this.props.examType(str)
    }
    componentWillReceiveProps(newProps){
        this.setState({
            stanList:newProps.authority
        })
    }
}
const mapStateToProps = state => {
    return { ...state.view }
  }
  
  const mapDisaptchToProps = dispatch => {
    return {
        examType(payload) {
            dispatch({
                type: 'view/detail',
                payload
            })
        }
    }
  }
  export default connect(mapStateToProps, mapDisaptchToProps)(viewDetail);
  

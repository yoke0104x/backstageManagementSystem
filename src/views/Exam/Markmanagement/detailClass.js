import React, { Component } from 'react'
import { connect } from 'dva';
class viewDetail extends Component {
    state={
        stanList:[]
    }
    render() {
        // let {stanList} = this.state
        return (
            <div className="content">
                <h2 style={{marginTop: "10px" }}>阅卷</h2>
                <div className="el_conent">{
                   
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
  

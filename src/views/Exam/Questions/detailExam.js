import React, { Component } from 'react';

export default class componentName extends Component {
    componentDidMount() {
        let str = window.localStorage.getItem("arr")
        this.setState({
            str: JSON.parse(str)
        })
    }
    state = {
        str: {}
    }
    render() {
        let { str } = this.state;
        return (
            <div className="content"><h2 style={{marginTop: "10px" }}>试题详情</h2>
                <div className="ant-layout-content" style={{ background: 'rgb(255, 255, 255)', padding: '24px', margin: '0px 0px 20px', borderRadius: '10px', flex: '1 1 0%' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <span>出题人：{str.user_name}</span>
                        <div></div>
                    </div>
                    <h3>题目信息</h3>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <div className="ant-tag ant-tag-blue">{str.questions_type_text}</div>
                        <div className="ant-tag ant-tag-geekblue">{str.subject_text}</div>
                        <div className="ant-tag ant-tag-orange">{str.exam_name}</div>
                    </div><h4>{str.title}</h4><div><div className="react-markdown">
                        <pre><p>{str.questions_stem}</p></pre>
                        <p>示例 2:</p>
                    </div></div></div>
                <div>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';

export default class componentName extends Component {
    render() {
        let {data} = this.props
        return (
            <div>
                {
                    data && data.map((el,i)=>{
                        return <div className="ant-list-item" key={i}>
                            <div className="ant-list-item-content ant-list-item-content-single" onClick={this.btn.bind(this,el)}>
                                <a href="">
                                    <div className="ant-list-item-meta">
                                        <div className="ant-list-item-meta-content">
                                            <h4 className="ant-list-item-meta-title">{el.title}</h4>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '10px' }}><div style={{ paddingBottom: '20px' }}>
                                        <div className="ant-tag ant-tag-blue">{el.questions_type_text}</div>
                                        <div className="ant-tag ant-tag-geekblue">{el.subject_text}</div>
                                        <div className="ant-tag ant-tag-orange">{el.exam_name}</div>
                                    </div><span style={{ marginBottom: '10px',display:'inline-block'}}>{el.user_name} 发布</span></div>
                                </a></div>
                            <ul className="ant-list-item-action">
                                <li><a href="javascript:;" onClick={this.push.bind(this,el)}>编辑</a>
                                </li>
                            </ul>
                        </div>
                    })
                }
            </div>
        );
    }
    btn=(e)=>{
        let localstorage = window.localStorage
        localstorage.arr = JSON.stringify(e)
        this.props.fn(`${e.questions_id}`)
    }

    push=(e)=>{
        let localstorage = window.localStorage
        localstorage.str = JSON.stringify(e)
        this.props.fn1(`${e.questions_id}`)
    }
}

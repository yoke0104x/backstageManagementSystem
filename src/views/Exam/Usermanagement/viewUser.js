import React, { Component } from 'react';
import { Tabs ,Table} from 'antd';
import { connect } from 'dva';
const { TabPane } = Tabs;
const array = [
  [
    {
      title: '用户名',
      dataIndex: 'user_name',
    },
    {
      title: '密码',
      dataIndex: 'user_pwd',
    },
    {
      title: '身份',
      dataIndex: 'identity_text',
    },
  ],[
    {
      title: '身份名称',
      dataIndex: 'identity_text',
    }
  ],[
    {
      title: 'api权限名称',
      dataIndex: 'api_authority_text',
    },
    {
      title: 'api权限url',
      dataIndex: 'api_authority_url',
    },
    {
      title: 'api权限方法',
      dataIndex: 'api_authority_method',
    },
  ],[{
    title: '身份名称',
    dataIndex: 'identity_text',
  },
  {
    title: 'api权限名称',
    dataIndex: 'api_authority_text',
  },
  {
    title: 'api权限url',
    dataIndex: 'api_authority_url',
  },{
    title: 'api权限方法',
    dataIndex: 'api_authority_method',
  }],[
    {
      title: '视图权限名称',
      dataIndex: 'view_authority_text',
    },{
      title: '视图id',
      dataIndex: 'view_id',
    }
  ],[
    {
      title: '身份',
      dataIndex: 'identity_text',
    },
    {
      title: '视图名称',
      dataIndex: 'view_authority_text',
    },{
      title: '视图id',
      dataIndex: 'view_id',
    }
  ]
]
class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index:0,
      userList:[],
      identityList:[],
      api_authorityList:[],
      identity_apiList:[],
      view_authorityList:[],
      authorityList:[]
    };
  }

  callback=(key)=> {
    this.setState({
      index:key-1
    })
  }
  componentDidMount(){
    this.props.userView()
  }
  componentWillReceiveProps(newProps){
    let {userList,identityList,api_authorityList,identity_apiList,view_authorityList,authorityList} = newProps
    this.setState({
      userList,
      identityList,
      api_authorityList,
      identity_apiList,
      view_authorityList,
      authorityList
    })
  }
  render() {
    let {index,userList,identityList,api_authorityList,identity_apiList,view_authorityList,authorityList} = this.state
    return (
      <div className="content">
        <h2 style={{marginTop: "10px" }}>用户展示</h2>
        <div className="contnet-el">
        <Tabs onChange={this.callback} type="card">
          <TabPane tab="用户管理" key="1">
            <h1>用户管理</h1>
            <Table columns={array[index]} dataSource={userList} size="middle"/>
          </TabPane>
          <TabPane tab="身份数据" key="2">
            <h1>身份数据</h1>
            <Table columns={array[index]} dataSource={identityList} size="middle"/>
          </TabPane>
          <TabPane tab="api权限接口" key="3">
            <h1>api权限接口</h1>
            <Table columns={array[index]} dataSource={api_authorityList} size="middle"/>
          </TabPane>
          <TabPane tab="身份和api接口关系" key="4">
            <h1>身份和api接口关系</h1>
            <Table columns={array[index]} dataSource={identity_apiList} size="middle"/>
          </TabPane>
          <TabPane tab="接口视图权限" key="5">
            <h1>接口视图权限</h1>
            <Table columns={array[index]} dataSource={view_authorityList} size="middle"/>
          </TabPane>
          <TabPane tab="身份和视图权限关系" key="6">
            <h1>身份和视图权限关系</h1>
            <Table columns={array[index]} dataSource={authorityList} size="middle"/>
          </TabPane>
        </Tabs>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {...state.view}
}

const mapDisaptchToProps = dispatch => {
  return {
    userView(payload) {
      dispatch({
        type: 'view/userView',
        payload
      })
    }
  }
}
export default connect(mapStateToProps,mapDisaptchToProps)(componentName)
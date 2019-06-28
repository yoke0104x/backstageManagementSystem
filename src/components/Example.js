import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import {injectIntl} from 'react-intl'
import {connect} from 'dva';
const { Sider } = Layout;
const { SubMenu } = Menu;

class Example extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentDidMount(){
    console.log(this.props.intl);
  }
  render() {
    return (
      <div className="routerA">
        <Sider>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"
              style={{ height: '100%', borderRight: 0 }}>
                {
                  this.props.myView.map((item, index)=>{
                    return <SubMenu key={item.name} title={
                      <span>
                        <Icon type="user" />
                          {this.props.intl.formatMessage({id: item.name})}
                      </span>
                    }>
                    {
                      item.children.map((value, key)=>{
                        return <Menu.Item key={value.key}>
                          <Link to={value.path}>{this.props.intl.formatMessage({id: value.name})}</Link>
                        </Menu.Item>
                      })
                    } 
                    </SubMenu>
                })
              }
          </Menu>
        </Sider>
      </div>
    )
  }
}
const mapStateToProps = state=>{
  return {
    myView: state.user.myView
  }
}
export default injectIntl(connect(mapStateToProps)(Example));

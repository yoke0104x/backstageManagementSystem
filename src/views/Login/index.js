import React, {useEffect} from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import styles from './index.scss';

function IndexPage(props){
  // 判断是否登陆
  useEffect(()=>{
    
    if (props.detail === 1){
      // 1.提示登陆成功
      message.success('登陆成功');
      // 2.存储cookie
      // 3.跳转主页面
      let pathName = decodeURIComponent(props.history.location.search.split('=')[1]);
      props.history.replace(pathName || '/');
    }else if(props.detail === -1){
      // 登陆失败
      message.error('用户名或密码错误')
    }
  }, [props.detail]);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.login({
          "user_name": values.username,
          "user_pwd": values.password
        })
      }
    });
  };

    const { getFieldDecorator } = props.form;
    return (
      <div className={styles.box}>
        <div className={styles.login}>
          <div className={styles.logins}>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入你的用户名!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ pattern: /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).*$/, message: '密码校验失败!密码包含大小写字母、数字、特殊符号' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(<Checkbox className={styles.pwd}>记住密码</Checkbox>)}
                <a className={styles.pwds} href="">
                  忘记密码
                </a>
                <Button type="primary" htmlType="submit" className={styles.btn}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
IndexPage.propTypes = {};
const mapStateToProps = state => {
  return {...state.user}
}

const mapDisaptchToProps = dispatch => {
  return {
    login(payload) {
      dispatch({
        type: 'user/login',
        payload
      })
    }
  }
}

export default connect(mapStateToProps, mapDisaptchToProps)(Form.create({})(IndexPage));
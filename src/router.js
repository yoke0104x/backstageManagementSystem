import React from 'react';
import { Router, Route, Switch,Redirect} from 'dva/router';
import Login from './views/Login/index';
import Home from './views/Exam/index';
import Four from './views/Exam/Other/404'
import Three from './views/Exam/Other/403'
import { connect } from "dva"

// 引入国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from '@/lang/zh-CN.js';
import enUS from '@/lang/en-US.js';
const localMap = {
  en: enUS,
  zh: zhCN
}

addLocaleData([...en, ...zh]);
const mapStateToProps = state=>{
  return {
    locale: state.global.locale
  }
}
const RouterView = connect(mapStateToProps)(({locale, history})=>{
  return <IntlProvider locale={locale} messages={localMap[locale]}>
    <Router history={history}>
      <Switch>
      
        <Route path="/login" component={Login} />
          <Route path="/questions" component={Home} />
          <Redirect form="/" to="/questions"></Redirect>
          <Route path="/403" component={Three} />
          <Route path="/404" component={Four} />
        </Switch>
      </Router>
  </IntlProvider>
})

function RouterConfig({ history }) {
  return (
    <RouterView history={history}/>
  );
}

export default RouterConfig;

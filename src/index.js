import dva from 'dva';
import './index.css';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user').default);
app.model(require('./models/gloabl').default);
app.model(require('./models/add').default);
app.model(require('./models/view').default);
app.model(require('./models/macking').default);
app.model(require('./models/management').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

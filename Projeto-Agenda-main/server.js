require('dotenv').config();


const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
    }
     )
    .then(() => {
        console.log('estou pronto');
        app.emit('pronto');
    })

    const session = require('express-session');
    const MongoStore = require('connect-mongo');
    const flash = require('connect-flash');

    const routes = require('./router');
    const path = require('path');
    const helmet = require('helmet');
    const csrf = require('csurf');

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware'); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  }));

const sessionOptions = session({
    secret:'jadlasn asdkalda  fjuhryuiw alksndayu()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view-login', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


app.use(csrf());
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('servidor executando na porta 3000');
        console.log('Acessar http://localhost:3000');
    });
});

app.use(express.static(__dirname + '/frontend/assets/css/style.css'));

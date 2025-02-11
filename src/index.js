import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import router from './routes.js';
import { auth } from './middlewares/auth-middleware.js';
import { tempData } from './middlewares/temp-data-middleware.js';

const app = express();
const port = 3000;

try {
    const uri = 'mongodb://127.0.0.1:27017/techStore';
    await mongoose.connect(uri);

    console.log('Db connected!');
} catch (err) {
    console.log('Couldn\'t connect');
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'asdasd',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}))
app.use(auth);
app.use(tempData);
app.use(router);

app.listen(port, console.log('Server is running on http://localhost:3000...'));
import express from 'express';
import router from './routes.js';
import handlebars from 'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

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
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(router);

app.listen(port, console.log('Server is running on http://localhost:3000...'));
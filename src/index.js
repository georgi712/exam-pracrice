import express from 'express';
import router from '../routes.js';
import handlebars from 'express-handlebars';
import path from 'path';

const app = express();
const port = 3000;

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(port, console.log('Server is running on http://localhost:3000...'));
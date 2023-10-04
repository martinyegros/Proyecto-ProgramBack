import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCarts from './routes/carts.router.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('static-files', express.static(`${__dirname}/public`));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.listen(8080, () => console.log('Listening on port 8080')); 
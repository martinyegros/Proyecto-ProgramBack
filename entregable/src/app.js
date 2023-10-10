import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import routerProducts from './routes/products.router.js';
import { __dirname, productsFilePath } from './utils.js';
import viewsRouter from './routes/views.router.js'
import ProductManager from './managers/product.manager.js';


const productManager = new ProductManager(productsFilePath);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));
app.use('/', viewsRouter);
app.use('/api/products', routerProducts);

const server = app.listen(8080, () => console.log('Listening on port 8080')); 

const io = new Server(server);

app.set('socketio', io);


io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('addProduct', async (data) => {
        console.log(data)
        try {
            await productManager.addProduct(data);
            io.emit('showProducts', await productManager.getProducts());
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('remover-producto', async (data) => {
        try {
            const id = Number(data)
            await productManager.deleteProduct(id);
            io.emit('showProducts', await productManager.getProducts());
        } catch (error) {
            console.error(error);
        }
    });
});
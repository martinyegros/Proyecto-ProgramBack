import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://martinyegros1:a4VUgRC3470YhLaT@clusterprogramback.rz2xhc0.mongodb.net/?retryWrites=true&w=majority')
        console.log('DB conectada');
        app.listen(8080, () => console.log('Listening on port 8080'));
    }
    catch (error) {
        console.error('DB connección fallida', error.message);
    }
};

startServer();

/* const server = app.listen(8080, () => console.log('Listening on port 8080')); 

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
}); */
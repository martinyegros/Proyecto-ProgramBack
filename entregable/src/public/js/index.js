const socket = io();

const container = document.getElementById('productos-cont');

const form1 = document.getElementById('formulario1');
const form2 = document.getElementById('formulario2');

socket.on('showProducts', data => {
    container.innerHTML = ``;
    
    data.forEach(prod => {
        container.innerHTML += `
            <ul class="producto">
                <li><span>title:</span> ${prod.title}</li>
                <li><span>description:</span> ${prod.description}</li>
                <li><span>code:</span> ${prod.code}</li>
                <li><span>price:</span> ${prod.price}</li>
                <li><span>status:</span> ${prod.status}</li>
                <li><span>stock:</span> ${prod.stock}</li>
                <li><span>category:</span> ${prod.category}</li>
                <li><span>id:</span> ${prod.id}</li>
            </ul>
        `
    });
});

form1.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = JSON.parse(document.getElementById('ag-producto').value);
    socket.emit('addProduct',  newProduct );
});

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('remover-producto').value;
    socket.emit('remover-producto',  id );
});
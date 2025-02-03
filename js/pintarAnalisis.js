function getItems(){
    let producto = localStorage.getItem('productos2');
    return producto? JSON.parse(producto) : [];
}

const productos = getItems();
const caja2 = $('#caja2');

productos.forEach(producto => {
    const titulo2 = $(`<h1 class="text-3xl font-bold text-center text-gray-800 mb-4">${producto.nombre}</h1>`);
    const precio2 = $(`<h2 class="text-2xl text-black-500 mb-4 text-center">Precio: ${producto.precio}</h2>`);
    const imagen2 = $(`<p class="flex justify-center"><img src='${producto.imagen}'></p><br>`);
    caja2.append(titulo2, precio2, imagen2);
});
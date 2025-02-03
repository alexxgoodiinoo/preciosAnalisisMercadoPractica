/**
 * Funcion para recoger los productos del localStorage
 * @returns un array con los productos
 */
function getItems(){
    let producto = localStorage.getItem('productos');
    return producto? JSON.parse(producto) : [];
}

const productos = getItems();
const tbody = $('#tbody');

productos.forEach(producto => {
    const fila = $(`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"></tr>`);
    const nombre = $(`<td class="px-6 py-4">${producto.nombre}</td>`);
    const plataforma = $(`<td class="px-6 py-4">${producto.plataforma}</td>`);
    const precio = $(`<td class="px-6 py-4">${producto.precio}</td>`);
    const imagen = $(`<td class="px-6 py-4"><img src='${producto.imagen}'></td>`);
    const boton = $(`<td class="px-6 py-4"><button class='comparar' data-nombre='${producto.nombre}'>Comparar precio</button></td>`);
    fila.append(nombre, plataforma, precio, imagen, boton);
    tbody.append(fila);
});
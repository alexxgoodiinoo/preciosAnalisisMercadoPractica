let datosLocalStorage = getItems();
let datosLocalStorage2 = getItems2();
const caja = $(`#caja`);

/**
 * Funcion para cuando pulses el boton de buscar, te haga la peticion a la api para poder scrapear la página
 */
$('#boton').on('click', async function(){
    const url = $('#url').val().trim();
    const urlCodificada = await encodeURIComponent(url);
    console.log(urlCodificada);
    fetch(`http://localhost:3000/api/${urlCodificada}`)
        .then((response) => response.json())
        .then((data) => {
            if(!existeProducto(data.nombre, datosLocalStorage)){
                datosLocalStorage.unshift(data),
                setItems(datosLocalStorage);
            }
            const titulo = $(`<h1 class="text-3xl font-bold text-center text-gray-800 mb-4">${data.nombre}</h1>`);
            const plataforma = $(`<h3 class="text-xl font-semibold text-gray-600 mb-3">${data.plataforma}</h3>`);
            const precio = $(`<p class="text-gray-500 mb-4">${data.precio}</p>`);
            const imagen = $(`<p class="flex justify-center"><img src='${data.imagen}'></p>`);
            caja.append(titulo, plataforma, precio, imagen);
        })
        .catch((error) => console.error(error))
})

/**
 * Funcion para que cuando tu pulses el boton de comparar, te haga el segundo scraping para recoger los datos para poder comparar con el producto inicial
 */
$(document).ready(function(){
    $('.comparar').on('click', async function(){
        const nombre = $(this).data('nombre').trim();
        fetch(`http://localhost:3000/nombre/${nombre}`)
            .then((response) => response.json())
            .then((productos) => {
                datosLocalStorage2.unshift(productos);
                setItems2(productos);
            })
            .catch((error) => console.error(error))
    });  
});

/**
 * Funcion para recoger los productos del localStorage
 * @returns un array con los productos
 */
function getItems(){
    let producto = localStorage.getItem('productos');
    return producto? JSON.parse(producto) : [];
}

/**
 * Funcion para recoger los productos del localStorage
 * @returns un array con los productos
 */
function getItems2(){
    let producto = localStorage.getItem('productos2');
    return producto? JSON.parse(producto) : [];
}

/**
 * Funcion para establecer los productos del localStorage
 */
function setItems(producto){
    localStorage.setItem('productos', JSON.stringify(producto));
}

/**
 * Funcion para establecer los productos del localStorage
 */
function setItems2(producto){
    localStorage.setItem('productos2', JSON.stringify(producto));
}

/**
 * Funcion para comprobar si un producto ya esta dentro del localStorage por su nombre
 * @param {string} nombre - Nombre del producto
 * @param {Array} productos - Array con todos productos
 * @returns true si el nombre ya esta dentro del array o false si no
 */
function existeProducto(nombre, productos){
    for(let producto of productos){
        if(producto.nombre === nombre) return true;
    }
    return false;
}
let datosLocalStorage = getItems();
let datosLocalStorage2 = getItems2();
const caja = $(`#caja`);

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

$(document).ready(function(){
    $('.comparar').on('click', async function(){
        const nombre = $(this).data('nombre').trim();
        fetch(`http://localhost:3000/nombre/${nombre}`)
            .then((response) => response.json())
            .then((productos) => {
                datosLocalStorage2.unshift(productos);
                setItems2(productos);
                const mensaje = $(`<p>Ya puedes consultar la comparación en el apartado de análisis</p>`);
                caja.append(mensaje);
            })
            .catch((error) => console.error(error))
    });  
});

function getItems(){
    let producto = localStorage.getItem('productos');
    return producto? JSON.parse(producto) : [];
}

function getItems2(){
    let producto = localStorage.getItem('productos2');
    return producto? JSON.parse(producto) : [];
}

function setItems(producto){
    localStorage.setItem('productos', JSON.stringify(producto));
}

function setItems2(producto){
    localStorage.setItem('productos2', JSON.stringify(producto));
}

function existeProducto(nombre, productos){
    for(let producto of productos){
        if(producto.nombre === nombre) return true;
    }
    return false;
}
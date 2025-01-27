let datosLocalStorage = getItems();

$('#boton').on('click', async function(){
    const url = $('#url').val().trim();
    const urlCodificada = await encodeURIComponent(url);
    console.log(urlCodificada);
    fetch(`http://localhost:3000/api/${urlCodificada}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data),
            datosLocalStorage.unshift(data),
            setItems(datosLocalStorage)
        })
        .catch((error) => console.error(error))
})

function getItems(){
    let producto = localStorage.getItem('productos');
    return producto? JSON.parse(producto) : [];
}

function setItems(producto){
    localStorage.setItem('productos', JSON.stringify(producto));
}
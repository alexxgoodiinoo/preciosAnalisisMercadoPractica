const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/:url', async(request, response) => {
    const urlCodificada = request.params.url;
    const url = decodeURIComponent(urlCodificada);
    console.log("aqui" . url);
    if(url){
        const productos = await scraping(url);
        response.status(200).json(productos);
    }else{
        response.status(404).end();
    }
})

async function scraping(url){
    try{
        const browser = await puppeteer.launch({
            headless: 'new'
        });
        const page = await browser.newPage();

        await page.goto(url);
        const productos = await page.evaluate(() => {
            const elementos = document.querySelectorAll('.clearfix');
            return Array.from(elementos).map(elemento => ({
                nombre: elemento.querySelector('.product-title')?.innerText || 'Sin titulo',
                precio: elemento.querySelector('.buy--price')?.innerText || 'Sin precio',
                plataforma: elemento.querySelector('.btn.btn-secondary-outline.btn-sm.sharp.active')?.innerText || 'Sin plataforma',
                imagen: elemento.querySelector('#product-cover')?.getAttribute('src')
            }));
        });

        await browser.close();
        return productos[0];
    }catch(error){
        console.error('Error: ', error);
    }
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Funciona");
});

app.get('/nombre/:nombre', async(request, response) => {
    const nombre = request.params.nombre;
    if(nombre){
        const productos = await scraping2(nombre);
        console.log("Productos encontrados:", productos);
        response.status(200).json(productos);
    }else{
        response.status(404).end();
    }
})

async function scraping2(nombre){
    try{
        const browser = await puppeteer.launch({
            headless: 'new'
        });
        const page = await browser.newPage();

        await page.goto(`https://www.eneba.com/es/marketplace?text=${nombre}`);
        const productos = await page.evaluate(() => {
            const elementos = document.querySelectorAll('.uy1qit');
            const productos =  Array.from(elementos).slice(1,5)
            return productos.map(elemento => ({
                nombre: elemento.querySelector('.YLosEL')?.innerText || 'Sin titulo',
                precio: elemento.querySelector('.L5ErLT')?.innerText || 'Sin precio',
                imagen: elemento.querySelector('.AYvEf0 img')?.getAttribute('src')
            }));
        });

        await browser.close();
        return productos;
    }catch(error){
        console.error('Error: ', error);
    }
}
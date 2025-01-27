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
            // const elementos = document.querySelectorAll('.detalle-section');
            const elementos = document.querySelectorAll('.clearfix');
            return Array.from(elementos).map(elemento => ({
                // nombre: elemento.querySelector('h1')?.innerText || 'Sin titulo',
                // precio: elemento.querySelector('.precio')?.innerText || 'Sin precio',
                // imagen: elemento.querySelector('a')?.href
                nombre: elemento.querySelector('.product-title')?.innerText || 'Sin titulo',
                precio: elemento.querySelector('.buy--price')?.innerText || 'Sin precio',
                plataforma: elemento.querySelector('.btn.btn-secondary-outline.btn-sm.sharp.active')?.innerText || 'Sin plataforma',
                imagen: elemento.querySelector('#product-cover')?.getAttribute('src')
            }));
        });

        await browser.close();
        console.log(productos[0]);
        return productos[0];
    }catch(error){
        console.error('Error: ', error);
    }
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Funciona");
});
import express from "express";
import { ProductManager } from "./managers/productManager.js";

const app = express();

const productService = new ProductManager();

const PORT = 8080;

let counter = 0;

const server = app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

// INDEX
app.get('/', (req,res)=>{
    res.send(`
                <h1>¡Hello from Express!</h1>
                <h2>Choose beetween the given paths:</h2>
                <ul>
                    <li>/products</li>
                    <li>/random</li>
                </ul>
            `);
})

// GET VISITS
app.get('/visits',(re,res)=>{
    counter++;
    res.send(`The server has been visited ${counter} times`);
})

//GET ALL PRODUCTS OR PRODUCTS BY CATEGORY
app.get('/products', async (req, res)=>{
    let products = await productService.getAll();
    let category = req.query.category;
//  let id = parseInt(req.query.id);

/*  if(id){
        let productsById = products.filter(prod => prod.id === id);
        if(productsById.length === 0){
            return res.send(`The product with id ${id} does not exist.`);
        }
        return res.send(productsById);
    }   
*/
    if(category){
        let productsByCategory = products.filter(prod => prod.category === category);
        if(productsByCategory.length === 0){
            return res.send(`The category ${category} does not exist.`);
        }
        return res.send(productsByCategory);
    }

    return res.send(products);
})

//GET PRODUCT BY ID
app.get('/products/:idProduct', async (req, res) => {
    let products = await productService.getAll();
    let id = req.params.idProduct
    if(!products[id] || id < 1){
        return res.send(`The product with id ${id} does not exist.`)
    }
    
    return res.send(products[id-1])
})

//GET A RANDOM PRODUCT
app.get('/random', async (req, res)=>{
    let products = await productService.getAll();
    let random = products[Math.floor(Math.random() * products.length)];
    res.send(random);
})


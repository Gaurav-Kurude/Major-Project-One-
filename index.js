require("dotenv").config();
const {initializeDatabase} = require("./db/db.connect");
const Products = require("./models/shopping.models");
const express = require("express");
const app = express();
app.use(express.json());
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hello Express!");
})

// to get all the shoppingItems in the Database
async function readAllShoppingItems(){
    try{
       const allShoppingItems = await Products.find();
       return allShoppingItems;
    } catch(error){
        console.log(error)
    }
}

app.get("/products", async (req, res) => {
    try{
        const products = await readAllShoppingItems();
        if(products.length != 0){
            res.json(products);
        }else{
            res.status(404).json({error: "No products found."})
        }
    }catch{
        res.status(500).json({error: "Failed to fetch products."});
    }
})

// This API call gets product by productId from the db.
async function readShoppingItemById(productId){
    try{
       const product = await Products.findById(productId)
       return product;
    }catch(error){
        throw error
    }
}

app.get("/products/:id", async (req, res) => {
    try{
    const product = await readShoppingItemById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404).json({error: "Product not found."})
    }
    }catch(error){
        res.status(500).json({error: "Failed to fetch product."})
    }
})

// This API call gets all categories from the db.
async function readAllShoppingCategories(){
    try{
       const allShoppingCategories = await Products.find();
       return allShoppingCategories;
    } catch(error){
        console.log(error)
    }
}

app.get("/categories", async (req, res) => {
    try{
        const categories = await readAllShoppingCategories();
        if(categories.length != 0){
            res.json(categories);
        }else{
            res.status(404).json({error: "No categories found."})
        }
    }catch{
        res.status(500).json({error: "Failed to fetch categories."});
    }
})

// This API call gets category by categoryId from the db.
async function readShoppingCategoriesById(categoryId){
    try{
       const shoppingCategory = await Products.findById(categoryId)
       return shoppingCategory;
    }catch(error){
        throw error
    }
}

app.get("/categories/:categoryId", async (req, res) => {
    try{
    const categories = await readShoppingCategoriesById(req.params.categoryId);
    if(categories){
        res.json(categories)
    }else{
        res.status(404).json({error: "Category not found."})
    }
    }catch(error){
        res.status(500).json({error: "Failed to fetch category."})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log("Server is running on port", PORT);
});

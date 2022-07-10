import fs from 'fs';

const path = "files/products.json";

class ProductManager {
 
    getAll = async() =>{
        try{
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path,'utf-8');
                let products = JSON.parse(fileData);
                return products;
                
            }else{
                return [];
            }
        }catch(error){
            console.log("Error: " + error);
        }
    }

    save = async(product) =>{
        try{
            let fileData = await this.getAll();
            if(fileData.length === 0){
                product.id = 1;
                fileData.push(product);
                await fs.promises.writeFile(path, JSON.stringify(fileData, null, '\t'));

            }else{
                product.id = fileData[fileData.length-1].id+1;
                fileData.push(product);
                await fs.promises.writeFile(path, JSON.stringify(fileData, null, '\t'));
            }   
        }catch(error){
            console.log("Error: " + error)
        }
    }

    getById = async (idNumber) =>{
        try{
            const fileData = await this.getAll();
            let product = fileData.find(prod => prod.id == idNumber);
            if(product == undefined) {
                return "The product could not be found.";

            }else{
                return product;
            }

        }catch(error){
            console.log("Error: " + error)
        }
    }

    deleteById = async (idNumber) =>{
        try {
            const fileData = await this.getAll();
            let product = fileData.find(prod => prod.id == idNumber)
            if(product == undefined){
                return "The product to remove does not exist."

            }else{
                let productIndex = fileData.indexOf(product);
                fileData.splice(productIndex, 1);
                await fs.promises.writeFile(path, JSON.stringify(fileData, null, '\t'));
                return (product)
            } 

        }catch(error){
            console.log("Error: " + error)
        }

        // OTRA MANERA DE HACERLO
/*      try{
            const fileData = await this.getAll();
            let newFileData = fileData.filter(prods => prods.id !== idNumber);
            await fs.promises.writeFile(path, JSON.stringify(newFileData, null, '\t'))
        }

        catch(error){
            console.log("Error: " + error)
        } */

    }

    deleteAll = async () =>{
        try{
            let fileData = await this.getAll();
            fileData = []
            await fs.promises.writeFile(path, JSON.stringify(fileData, null, '\t'));
            return "All products have been removed.";

        }catch(error){
            console.log("Error: " + error)
        }
    }

}

// module.exports = ProductManager;
export {ProductManager};
let cart = null;


module.exports = class Cart{
    static save(product){
        if (cart === null) {
            cart = { products: [], totalPrice: 0 };
        }

        const existingProductIndex = cart.products.findIndex(p => p._id == products._id); // to check product is existing in cart
        if (existingProductIndex >= 0) { // exist in cart already
            const exsitingProduct = cart.products[existingProductIndex];
            // exsitingProduct.qty += 1;
            console.log("Product add cart: " + exsitingProduct);
        } else { //not exist
            // product.qty = 1;
            cart.products.push(product);
        }

        // cart.totalPrice += product.price;
    }
}
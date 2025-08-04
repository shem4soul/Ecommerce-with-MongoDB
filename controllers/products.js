const products = [];

const getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
};

const postAddProduct = (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
};

const getProducts = (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products,    
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productsCSS: true
    });
    };


    module.exports = {
        postAddProduct,
        getAddProduct,
        getProducts
    }
const Stripe = require('stripe');
const products = require('./products');

const stripe = Stripe("sk_test_51OeIAsCNKLRbUXzdZ7pgMyG3Pw4OlL9xdE87vYL8jP7tTXA6wHrzenGbcGOwhXzqs53hZvrkFj3Em9DwoVkEqhmR00XVBB4hML");

(async () => {
    for (const product of products) {
        const stripeProduct = await stripe.products.create({
            name: product.name,
            default_price_data:{
                currency: product.currency,
                unit_amount: product.price ,
            },
            images: [product.image],
        });
        console.log(stripeProduct.name, ":", stripeProduct.id, );
    }
})();
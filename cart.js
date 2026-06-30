let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function addToCart(productId){

    let item = cart.find(
        product => product.product_id === productId
    );


    if(item){

        item.quantity++;

    } else {

        cart.push({
            product_id: productId,
            quantity: 1
        });

    }


    saveCart();

    updateCartCount();

    alert("محصول به سبد خرید اضافه شد 🌹");

}



function updateCartCount(){

    let count = cart.reduce(
        (total, item)=> total + item.quantity,
        0
    );


    let cartCount = document.getElementById("cart-count");


    if(cartCount){

        cartCount.innerText = count;

    }

}


updateCartCount();
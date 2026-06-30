let cart = JSON.parse(localStorage.getItem("cart")) || [];


const cartBox = document.getElementById("cart-items");
const totalPriceBox = document.getElementById("total-price");



async function showCart(){


    cartBox.innerHTML = "";
    
    let total = 0;



    if(cart.length === 0){

        cartBox.innerHTML = `
        <h3>سبد خرید خالی است 🛒</h3>
        `;

        totalPriceBox.innerText = 0;

        return;
    }



    const ids = cart.map(item => item.product_id);



    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .in("id", ids);



    if(error){

        console.log(error);
        return;

    }



    data.forEach(product=>{


        let item = cart.find(
            x => x.product_id === product.id
        );


        let quantity = item.quantity;



        total += product.price * quantity;



        cartBox.innerHTML += `

        <div class="card">


            <img src="${product.image}">


            <h3>${product.name}</h3>


            <p>
            تعداد: ${quantity}
            </p>


            <button onclick="decrease(${product.id})">
            -
            </button>


            <button onclick="increase(${product.id})">
            +
            </button>


            <button onclick="removeItem(${product.id})">
            حذف
            </button>


            <p>
            قیمت: ${product.price * quantity} تومان
            </p>


        </div>

        `;


    });



    totalPriceBox.innerText = total;


}



function increase(id){

    let item = cart.find(
        x => x.product_id === id
    );


    item.quantity++;

    save();

}



function decrease(id){

    let item = cart.find(
        x => x.product_id === id
    );


    if(item.quantity > 1){

        item.quantity--;

    } else {

        cart = cart.filter(
            x => x.product_id !== id
        );

    }


    save();

}



function removeItem(id){


    cart = cart.filter(
        x => x.product_id !== id
    );


    save();

}



function save(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    location.reload();

}



showCart();
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




// ثبت سفارش

const submitOrder = document.getElementById("submit-order");


if(submitOrder){


submitOrder.addEventListener("click", async function(){


let name = document.getElementById("customer-name").value;

let phone = document.getElementById("customer-phone").value;

let address = document.getElementById("customer-address").value;



if(
name === "" ||
phone === "" ||
address === ""
){

alert("لطفاً اطلاعات سفارش را کامل کنید");

return;

}



let total = Number(totalPriceBox.innerText);



const { data: order, error } = await supabaseClient
.from("orders")
.insert([

{

customer_name: name,

phone: phone,

address: address,

total_price: total,

status: "pending"

}

])

.select()

.single();



if(error){

console.log(error);

alert(JSON.stringify(error));

return;

}




let items = [];



for(let item of cart){


const { data: product, error: productError } = await supabaseClient
.from("products")
.select("price")
.eq("id", item.product_id)
.single();



if(productError){

console.log(productError);

alert(JSON.stringify(productError));

return;

}



items.push({

order_id: order.id,

product_id: item.product_id,

quantity: item.quantity,

price: product.price

});


}




const { error: itemError } = await supabaseClient
.from("order_items")
.insert(items);



if(itemError){

console.log(itemError);

alert(JSON.stringify(itemError));

return;

}



localStorage.removeItem("cart");


alert("سفارش شما با موفقیت ثبت شد 🌹");


window.location.href = "index.html";



});


}




showCart();

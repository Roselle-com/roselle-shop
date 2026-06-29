const SUPABASE_URL = "https://sgggoawcwzjuxnvpekjk.supabase.co";
const SUPABASE_KEY = "sb_publishable_cvHHMTAfS1zWR5Btm6qy3g__hZo9dSQ";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


async function getProducts(){

    const { data, error } = await supabaseClient
        .from("products")
        .select("*");

    if(error){
        console.log(error);
        return;
    }

    const productsBox = document.querySelector(".products");

    data.forEach(product=>{

        productsBox.innerHTML += `
        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.price} تومان</p>

            <button>
                افزودن به سبد خرید
            </button>

        </div>
        `;

    });


    const buttons = document.querySelectorAll("button");

    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            alert("محصول به سبد خرید اضافه شد.");
        });
    });

}

getProducts();
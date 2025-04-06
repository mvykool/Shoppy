//first get the container by its class
console.log("hello world");

const productsContainer = document.querySelector(".product-section");

//fetch products, and store them in a variable
let products = [];

const fetchData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    console.log(response);
    return response.json();
  } catch (error) {}
};

fetchData();

//first get the container by its class
console.log("hello world");

const container = document.querySelector(".product-section");

//fetch products, and store them in a variable
let products = [];

const fetchData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      console.log("error");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {}
};

fetchData();

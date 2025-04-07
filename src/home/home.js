//first get the container by its class

const container = document.querySelector(".product-section");
const listContainer = document.querySelector("#list-container");
const liElement = document.createElement("li");

//fetch products, and store them in a variable
let products = [];

const fetchData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    products = data;
  } catch (error) {
    console.log(error);
  }
};

fetchData();

//create a loop, that append the title of each product to the a liElement, and append the liElements to #list-container

console.log(products.length);

if (!products) {
  function display() {
    products.forEach((product) => {
      console.log(product.title);
    });
  }
  display();
}

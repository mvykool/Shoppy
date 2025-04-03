//first get the container by its class
const productsContainer = document.querySelector(".product-section");

//fetch products, and store them in a variable
let products = [];

const fetchData = async () => {
  try {
    const response = await fetch("");

    return response.json();
  } catch (error) {}
};

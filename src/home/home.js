//first get the container by its class

const container = document.querySelector(".product-section");
const listContainer = document.querySelector("#list-container");

//fetch products, and store them in a variable
let products = [];

//set initial main function

async function main() {
  try {
    const data = await fetchData();

    displayData(data);
  } catch (error) {
    console.error(error);
  }
}

const fetchData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

//create a loop, that append the title of each product to the a liElement, and append the liElements to #list-container
const displayData = async (data) => {
  console.log(data);
  data.forEach((product) => {
    const liElement = document.createElement("li");

    liElement.textContent = product.title;

    listContainer.append(liElement);
  });
};

main();

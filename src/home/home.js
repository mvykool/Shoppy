//first get the container by its class

const container = document.querySelector(".product-section");
const listContainer = document.querySelector("#list-container");

//fetch products, and store them in a variable
let products = [{}];

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

//create a loop, that append the title of each product a liElement that will create a new li tag, and append the liElements to #list-container
const displayData = async (data) => {
  data.slice(0, 4).forEach((product) => {
    const pEl = document.createElement("p");
    const imgEl = document.createElement("img");
    const itemContainer = document.createElement("div");

    products = { title: product.title, image: product.image };

    pEl.textContent = products.title;
    imgEl.src = products.image;

    //add the proper class to manipulate
    itemContainer.classList.add("item-container");
    itemContainer.append(imgEl);
    itemContainer.append(pEl);
    listContainer.append(itemContainer);
  });
};

main();

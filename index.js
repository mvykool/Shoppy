// select queries
//select main content div where all the content will be replaced
const mainContent = document.querySelector("#main-section");
const shopLink = document.querySelector(".shopLink");

//create a function that retrives the proper file based on the data-page

async function pageLoader(page) {
  //now i have to load the pages that matches the data-page
  const response = await fetch(page);

  const html = await response.text();
  mainContent.innerHTML = html;

  history.pushState({ page: page }, null, `#${page.slice(11)}`);
}

shopLink.addEventListener("click", (e) => {
  e.preventDefault();
  const page = shopLink.getAttribute("data-page");
  pageLoader(page);
});

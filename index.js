// select queries
//select main content div where all the content will be replaced
const mainContent = document.querySelector("#main-section");
const navLinks = document.querySelectorAll(".nav-link");
const homeLink = document.querySelector(".homeLink");
//initial home page
const homePage = homeLink.getAttribute("data-page");

//create a function that retrives the proper file based on the data-page

console.log(navLinks);
async function pageLoader(page) {
  //now i have to load the pages that matches the data-page
  const response = await fetch(page);

  const html = await response.text();
  mainContent.innerHTML = html;

  //push the string to the URL
  history.pushState({ page: page }, null, `#${page.slice(11)}`);
}

navLinks.forEach((page) => {
  page.addEventListener("click", (e) => {
    e.preventDefault();
    //get the data-page since the html file will be set there

    const pageView = page.getAttribute("data-page");
    //pass page to the pageloader function
    pageLoader(pageView);
  });
});

//create the initial state for the URL
pageLoader(homePage);
console.log(window.location.hash);

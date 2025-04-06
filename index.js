// select queries
//select main content div where all the content will be replaced
const mainContent = document.querySelector("#main-section");
const navLinks = document.querySelectorAll(".nav-link");
//initial home page
const homeLink = document.querySelector(".homeLink");
const homePage = homeLink.getAttribute("data-page");

//create a function that retrives the proper file based on the data-page

async function pageLoader(page) {
  //now i have to load the pages that matches the data-page
  //add loading class
  mainContent.classList.add("loader");

  const response = await fetch(page);

  const html = await response.text();
  mainContent.innerHTML = html;
  mainContent.classList.remove("loader");

  //load corresponding js file to each html file
  //example, src/home/home.html becomes src/home/home.js
  const jsPath = page.replace(".html", ".js");
  //create a new script in memory, this is a DOM methor to create elements
  const script = document.createElement("script");

  //set the 'src' attribute from script element to point to our corresponding JS file
  script.src = jsPath;

  //append the newly created script tag to the end of the body
  //this will insert the script in the DOM
  document.body.appendChild(script);

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

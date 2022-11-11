let cartSelector = document.getElementById("cart");

if (localStorage.getItem("cartCounter") === null) {
  localStorage.setItem("cartCounter", 0);
}
cartSelector.textContent = localStorage.getItem("cartCounter");

if (document.URL.includes("games.html")) {
  document.querySelector(".gaming-section").style.paddingTop = "116px";
}

if (document.URL.includes("index.html")) {
  document
    .getElementById("headerButton")
    .addEventListener("click", function () {
      window.scrollTo({
        top: document.querySelector(".gaming-section").offsetTop - 116,
        behavior: "smooth",
      });
    });
}
// en fetch om prudukterna och rabatterna på hemsidan
(function fetchData() {
  fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const html = data
        .map((item) => {
          return `
                <div class="tab_item">
                    <div class="tab_item_cap">
                        <img class="tab_item_cap_img" src="${
                          item && item.thumb
                        }" />
                    </div>
                    <div class="wrap-content">
                        <div class="tab_item_content">
                            <h4> ${item && item.title}</h4>
                        </div>
                        <div class="pricing">
                            <h4 class="dealrating"> ${
                              item && item.dealRating
                            }%</h4>
                            <h4 class="normalPrice"> ${
                              item && item.normalPrice
                            }$</h4>
                            <button id="${
                              item.internalName
                            }" onclick="addToCart(${
            item.internalName
          })">Buy</button>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
      document.querySelector("#games").insertAdjacentHTML("afterbegin", html);
    })
    .catch((error) => {
      console.log("error", error);
    });
})();
// adding shopping cart
function addToCart(item) {
  console.log(localStorage.getItem("cartCounter"));
  let cartCounter = parseInt(localStorage.getItem("cartCounter"));
  cartCounter++;
  localStorage.setItem("cartCounter", cartCounter);
  cartSelector.textContent = localStorage.getItem("cartCounter");
}
// adding empty cart
function emptyCart() {
  localStorage.setItem("cartCounter", 0);
  cartSelector.textContent = localStorage.getItem("cartCounter");
}

// Mobila hamburgarbaren
const burger = document
  .querySelector(".hamburger")
  .addEventListener("click", function () {
    const nav = document.querySelector("#nav-icon2");
    const mobileLinks = document.querySelector(".links");

    mobileLinks.classList.toggle("open");
    nav.classList.toggle("open");
  });

// Smooth scroll till spel sektionen
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

(function fetchCities() {
  fetch("https://avancera.app/cities/")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("error", error);
    });
})();

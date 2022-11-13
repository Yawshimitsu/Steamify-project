if (localStorage.getItem("cartCounter") === null) {
  localStorage.setItem("cartCounter", 0);
}
if (
  document.URL.includes("index.html") ||
  document.URL.includes("games.html")
) {
  let cartSelector = document.getElementById("cart");
  cartSelector.textContent = localStorage.getItem("cartCounter");

  // adding shopping cart
  function addToCart(item) {
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
}

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
      createChart(data);
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
      if (document.querySelector("#games")) {
        document.querySelector("#games").insertAdjacentHTML("afterbegin", html);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
})();

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

// Cities tabort, lägg till och ändra namn
(function fetchCities() {
  fetch("https://avancera.app/cities/")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      const startSelect = '<select name="cities" id="cities">';
      const endSelect = "</select>";
      const option = data
        .map((item) => {
          return `
          <option value="${item.id}">${item.name}</option>
            `;
        })
        .join("");
      const html = startSelect + option + endSelect;
      document.querySelectorAll(".listCities").forEach((selector) => {
        selector.insertAdjacentHTML("afterbegin", html);
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
})();

function renameCity() {
  const cityOldId = document.querySelector(
    "#renameCity .listCities option:checked"
  ).value;
  const cityNewName = document.querySelector("#renameCityInput").value;

  if (!cityOldId || !cityNewName) {
    return;
  }

  var patchData = {
    name: cityNewName,
  };

  fetch("https://avancera.app/cities/" + cityOldId, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, /",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchData),
  })
    .then((_) => {
      location.reload();
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function addCity() {
  const newCityName = document.querySelector("#addCityInput").value;
  if (!newCityName) {
    return;
  }
  var postData = {
    name: newCityName,
    population: Math.floor(Math.random() * 100000),
  };
  fetch("https://avancera.app/cities/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((_) => {
      location.reload();
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function removeCity() {
  const deleteCityId = document.querySelector(
    "#deleteCity .listCities option:checked"
  ).value;

  if (!deleteCityId) {
    return;
  }

  fetch("https://avancera.app/cities/" + deleteCityId, {
    method: "delete",
  })
    .then((_) => {
      location.reload();
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function createChart(games) {
  const element = document.getElementById("priceChart");
  if (!element) {
    return;
  }
  const ctx = element.getContext("2d");
  var prices = games.map((t) => t.normalPrice);
  var amountOfGamesPerPrice = [];

  prices
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .forEach((p) => {
      amountOfGamesPerPrice[p] = amountOfGamesPerPrice[p]
        ? amountOfGamesPerPrice[p] + 1
        : 1;
    });

  const _ = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(amountOfGamesPerPrice),
      datasets: [
        {
          label: "Games per price",
          data: Object.values(amountOfGamesPerPrice),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

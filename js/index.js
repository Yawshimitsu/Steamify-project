// en fetch om prudukterna och rabatterna på hemsidan
function fetchData() {
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
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");
      console.log(data);
      console.log(html);
      document.querySelector("#games").insertAdjacentHTML("afterbegin", html);
    })
    .catch((error) => {
      console.log("error", error);
    });
}

fetchData();

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
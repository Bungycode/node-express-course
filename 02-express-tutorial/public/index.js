const getProductsBtnEl = document.querySelector(".get-products");
const productsContainerEl = document.querySelector(".products-container");

const getProducts = () => {
  try {
    getProductsBtnEl.addEventListener("click", () => {
      fetch("/api/v1/products")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          productsContainerEl.innerHTML = "";

          const productListEl = document.createElement("ul");
          productsContainerEl.appendChild(productListEl);

          for (let i = 0; i < data.length; i++) {
            const productNameEl = document.createElement("li");
            productNameEl.innerHTML = `Product Name - ${data[i].name}<br><br>
                                      Product ID - ${data[i].id}<br><br>
                                      Product Image - ${data[i].image}<br><br>
                                      Product Price - ${data[i].price}<br><br>
                                      Product Description - ${data[i].desc}<br></br><br><br>
            `;
            productListEl.appendChild(productNameEl);
          }
        });
    });
  } catch (error) {
    console.log("Something went wrong with your request!", error);
    throw new Error(error);
  }
};

getProducts();

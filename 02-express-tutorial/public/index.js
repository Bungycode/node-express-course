console.log("javascript file is linked");

const getProductsBtnEl = document.querySelector(".get-products");
console.log(getProductsBtnEl);

const productsContainerEl = document.querySelector(".products-container");
console.log(productsContainerEl);

const getProducts = () => {
  getProductsBtnEl.addEventListener("click", () => {
    fetch("/api/v1/products")
      .then((response) => {
        console.log("response =", response);
        return response.json();
      })
      .then((data) => {
        console.log("data =", data);
        console.log("typeof data =", typeof data);
        console.log("data.length =", data.length);
        productsContainerEl.innerHTML = '';

        const productListEl = document.createElement("ul");
        productsContainerEl.appendChild(productListEl);
        console.log(productsContainerEl);

        for (let i = 0; i < data.length; i++) {
          const productNameEl = document.createElement("li");
          productNameEl.innerHTML = `Product Name - ${data[i].name}<br><br>
                                    Product ID - ${data[i].id}<br><br>
                                    Product Image - ${data[i].image}<br><br>
                                    Product Price - ${data[i].price}<br><br>
                                    Product Description - ${data[i].desc}<br></br><br><br>
          `;
          productListEl.appendChild(productNameEl)
        }
      });
  });
};

const init = () => {
  getProducts();
};

init();

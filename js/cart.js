function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let flagSignIn = localStorage.getItem("flagSignIn");
  let userCart = cart[flagSignIn];
  let total = 0;

  let result = `
      <tr>
          <th>Product ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th></th>
      </tr>`;
  if (flagSignIn) {
    for (let i = 0; i < userCart.length; i++) {
      result += `
      <tr>
      <td>${userCart[i].id}</td>
      <td class="img-userCart"><img src="${userCart[i].image}"></td>
      <td>${userCart[i].name}</td>
      <td>$${userCart[i].price}</td>
      <td>
      <button id="decrease" onclick="minus(${userCart[i].id})">-</button> 
      <span id="quantity">${userCart[i].quantity}</span>
      <button id="increase" onclick="plus(${userCart[i].id})">+</button>
      </td>
      <td id="amountProduct">
      $${(userCart[i].price * userCart[i].quantity).toFixed(2)}
      </td>
      <td><button class="delete" onclick=remove(${i})>Remove</button></td>
      </tr>
      `;

      total += Math.round(userCart[i].price * userCart[i].quantity);
    }
    if (flagSignIn == null) {
      document.getElementById("quantity").innerHTML = 0;
    }
    document.getElementById("total").innerHTML = total;
  }
  document.getElementById("table").innerHTML = result;
}
renderCart();

function remove(i) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let flagSignIn = localStorage.getItem("flagSignIn");
  let userCart = cart[flagSignIn];

  userCart.splice(userCart[i], 1);

  document.getElementById("quantity").innerHTML = userCart.length;
  cart = { ...cart, [flagSignIn]: userCart };
  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

function minus(idProduct) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let flagSignIn = localStorage.getItem("flagSignIn");
  let userCart = cart[flagSignIn];

  for (let i = 0; i < userCart.length; i++) {
    if (userCart[i].id == idProduct) {
      if (userCart[i].quantity == 1) {
        let confirm1 = confirm(
          "Do you want to remove this product from your cart?"
        );
        if (confirm1) {
          userCart.splice(userCart[i], 1);
          cart = { ...cart, [flagSignIn]: userCart };
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
          break;
        } else {
          return;
        }
      }
      userCart[i].quantity = --userCart[i].quantity;

      cart = { ...cart, [flagSignIn]: userCart };
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      break;
    }
  }
}
minus();

function plus(idProduct) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let flagSignIn = localStorage.getItem("flagSignIn");
  let userCart = cart[flagSignIn];

  for (let i = 0; i < userCart.length; i++) {
    if (userCart[i].id == idProduct) {
      userCart[i].quantity = ++userCart[i].quantity;

      cart = { ...cart, [flagSignIn]: userCart };
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      break;
    }
  }
}
plus();

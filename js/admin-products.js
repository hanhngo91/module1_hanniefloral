//------------------render list-------------------------
let a = 0;
let i = 0;
let thisPage = 1;
let limit = 6;
function renderList(i) {
  let listAdminProducts = JSON.parse(localStorage.getItem("products"));
  // a = Math.ceil(i * (listAdminProducts.length / limit));
  a = i * limit;
  let result = `
    <tr>
        <th>ID</th>
        <th>name</th>
        <th>type</th>
        <th>image</th>
        <th>price</th>
        <th>...</th>
    </tr>
    `;
  for (i = a; i < a + limit; i++) {
    !listAdminProducts[i]
      ? ""
      : (result += `
        <tr>
            <td>${listAdminProducts[i].id}</td>
            <td>${listAdminProducts[i].name}</td>
            <td>${listAdminProducts[i].type}</td>
            <td><img src="${listAdminProducts[i].image}" alt=""></td>
            <td>$${listAdminProducts[i]?.price}</td>
            <td><button onclick="edit(${listAdminProducts[i]?.id})">Edit</button> 
            <button onclick="remove(${listAdminProducts[i]?.id})">Remove</button></td>
        </tr>
        `);
  }
  listPage();
  document.getElementById("table").innerHTML = result;
}
renderList(i);
//-------------------------page seperation-----------------------
function listPage() {
  let listAdminProducts = JSON.parse(localStorage.getItem("products"));
  let count = Math.ceil(listAdminProducts.length / limit);
  document.querySelector(".listPage").innerHTML = "";
  if (thisPage != 1) {
    let prev = document.createElement("li");
    prev.innerText = "PREV";
    prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
    document.querySelector(".listPage").appendChild(prev);
  }
  for (i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i == thisPage) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", "changePage(" + i + ")");
    document.querySelector(".listPage").appendChild(newPage);
  }
  if (thisPage != count) {
    let next = document.createElement("li");
    next.innerText = "NEXT";
    next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
    document.querySelector(".listPage").appendChild(next);
  }
}

function changePage(i) {
  thisPage = i;
  loadItem(i);
}

function loadItem(i) {
  renderList(i - 1);
  listPage();
}
// -----------------------get img value-----------------------------
let newImgLink;
function handleOnChangeInputFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      newImgLink = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
// ----------------------add to localStorage list----------------------------
function addItem() {
  let products = JSON.parse(localStorage.getItem("products"));
  let inputId = document.getElementById("inputId").value;
  let inputName = document.getElementById("inputName").value;
  let inputType = document.getElementById("type").value;
  let inputPrice = document.getElementById("inputPrice").value;
  let newbie = {
    id: parseInt(inputId),
    name: inputName,
    type: inputType,
    image: newImgLink,
    price: parseFloat(inputPrice),
  };
  let flag = JSON.parse(localStorage.getItem("flag"));
  if (flag != null) {
    for (let j = 0; j < products.length; j++) {
      if (products[j].id == flag) {
        products.splice(j, 1, newbie);
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.removeItem("flag");
        renderList(0);
        return;
      }
    }
  }
  if (products == null) {
    products = [];
    products.push(newbie);
    localStorage.setItem("products", JSON.stringify(products));
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == newbie.id) {
        alert("This product already exists!");
        return;
      }
    }
    products.push(newbie); // push vào thì bị nhảy thêm 1 trang => logic phân trang sai
    console.log(products);
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
  }
  renderList();
}
//--------------------------remove product from localStorage------------------------
function remove(i) {
  console.log(i);
  let listAdminProducts = JSON.parse(localStorage.getItem("products"));
  for (let j = 0; j < listAdminProducts.length; j++) {
    if (listAdminProducts[j].id == i) {
      listAdminProducts.splice(j, 1);
      localStorage.setItem("products", JSON.stringify(listAdminProducts));
      renderList(0);
      break;
    }
  }
}

//--------------------------edit product------------------------------------
function edit(id) {
  let listAdminProducts = JSON.parse(localStorage.getItem("products"));
  for (let i = 0; i < listAdminProducts.length; i++) {
    if (listAdminProducts[i].id == id) {
      document.getElementById("inputId").value = listAdminProducts[i].id;
      document.getElementById("inputName").value = listAdminProducts[i].name;
      document.getElementById("type").value = listAdminProducts[i].type;
      newImgLink = listAdminProducts[i].image;
      document.getElementById("inputPrice").value = listAdminProducts[i].price;
      localStorage.setItem("flag", id);
      break;
    }
  }
}

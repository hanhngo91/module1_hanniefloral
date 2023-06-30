//------------------render list users-------------------------
function renderList() {
  let listUsers = JSON.parse(localStorage.getItem("userInfo"));

  let result = `
    <tr>
        <th>Email</th>
        <th>Status</th>
        <th>...</th>
    </tr>
    `;
  for (i = 0; i < listUsers.length; i++) {
    let userStatus = listUsers[i].status;
    result += `
        <tr>
            <td>${listUsers[i].email}</td>
            <td><button id="status_${i}" onclick="changeStatus(${i})">${userStatus}</button></td>
            <td><button onclick="remove(${listUsers[i].id})">Remove</button></td>
        </tr> 
        `;
  }
  document.getElementById("table").innerHTML = result;
}
renderList();

function changeStatus(id) {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo[id].status == "Active") {
    userInfo[id].status = "Locked";
    document.getElementById(`status_${id}`).innerHTML = "Locked";
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } else {
    userInfo[id].status = "Active";
    document.getElementById(`status_${id}`).innerHTML = "Active";
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
}

//--------------------------remove users from localStorage------------------------
function remove(i) {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (let j = 0; j < userInfo.length; j++) {
    if (userInfo[j].id == i) {
      removeCart(userInfo[j].email);
      userInfo.splice(j, 1);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      renderList();
      break;
    }
  }
  function removeCart(email) {
    delete cart[email];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderList();
  }
}

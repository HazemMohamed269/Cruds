let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

function getTotal() {
  if (price.value != " ") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#009087";
  }
}

// ===================

let dataPro;

if (localStorage.getItem("product") !== null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "create") {
    dataPro.push(newpro);
    showData();
  } else {
    dataPro[tmp] = newpro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);
  clearData();
};

// ======================

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// ======================

function showData() {
  let table = "";
  dataPro.forEach((element, index) => {
    table += `
            <tr>
                <td>${index}</td>
                <td>${element.title}</td>
                <td>${element.price}</td>
                <td>${element.taxes}</td>
                <td>${element.ads}</td>
                <td>${element.discount}</td>
                <td>${element.count}</td>
                <td>${element.total}</td>
                <td>${element.category}</td>
                <td><button onclick="updataData(${index})" id="updata">Updata</button></td>
                <td><button onclick=deleteData(${index}) id="delete">Delete</button></td>
            </tr>
            `;
  });

  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete-All (${dataPro.length})</button>
        `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// =====================

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// ===========================

function updataData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  getTotal();
  count.style.display = "none";
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  submit.innerHTML = "Updata";
  mood = "updata";
  tmp = i;
}
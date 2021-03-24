 cart = [];
function Product(name, price, amount) {
  this.name = name;
  this.price = price;
  this.amount = amount;
}
var totalCount;
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addProduct(name, price, amount){
for(var element in cart){
  if(cart[element].name === name){
      cart[element].amount ++;
      saveCart();
      return;
  }  
}
let product = new Product(name, price, amount);  
cart.push(product);
saveCart();

}

function getTotalAmountProducts(){
  var totalAmountProducts = 0;
  for(var element in cart){
    totalAmountProducts += cart[element].amount;
  }
  return totalAmountProducts;
}

function emptyCart(){
  cart= [];
  saveCart();
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart'));
}
if (localStorage.getItem("cart") != null) {
  loadCart();
}


listCart = function() {
  var cartCopy = [];
  for(i in cart) {
    item = cart[i];
    itemCopy = {};
    for(p in item) {
      itemCopy[p] = item[p];

    }
    itemCopy.total = Number(item.price * item.amount).toFixed(2);
    cartCopy.push(itemCopy)
  }
  return cartCopy;
}


$(document).ready(function(){
    let sourceApi = 'http://webacademy.se/fakestore/'
    localStorage.clear;
 fetch(sourceApi).then(function(response){
  return response.json();}).then(function(json){
       showProduct(json);
    }
  ).catch(error => console.error(error));
    
function showProduct(products){
  products.forEach((product) =>{

  let column = document.createElement('div')
  let holderCard = document.createElement('div');
  let img = document.createElement('img');
  let holderContent = document.createElement('div');
  let title = document.createElement('h4');
  let holderDetails = document.createElement('div');
  let desc = document.createElement('p');
  let price = document.createElement('p');
  let cat = document.createElement('p');
  let holderFooter = document.createElement('div');
  let addbtn = document.createElement('a');

  column.setAttribute('class', "col");
  column.id= product.id;
  holderCard.setAttribute('class', "card h-100");
  column.setAttribute('style', "margin-bottom:50px");
  img.setAttribute('src', product.image);
  img.setAttribute('alt', product.name);
  img.setAttribute('class', "card-img-top");
  holderContent.setAttribute('class', "card-body");
  title.id="name";
  title.setAttribute('class', "card-title");
  title.textContent = product.title;
  holderDetails.setAttribute('class', "card-text");
  desc.textContent = product.description;
  price.id="price";
  price.textContent = "Price: " + product.price;
  cat.textContent = "Category: " + product.category;
  holderFooter.setAttribute('class', "card-footer");
  addbtn.id ="addbtn";
  addbtn.setAttribute('href', "#");
  addbtn.setAttribute('data-name', product.title);
  addbtn.setAttribute('data-price', product.price)
  addbtn.setAttribute('class', "add-to-cart btn btn-primary")
  addbtn.setAttribute('style', "margin-left:150px")
  addbtn.textContent = "Add to cart";
  $("#cd").append(column);
  column.appendChild(holderCard);
  holderCard.appendChild(img);
  holderCard.appendChild(holderContent);
  holderContent.appendChild(title);
  holderContent.appendChild(holderDetails);
  holderDetails.appendChild(desc);
  holderDetails.appendChild(price);
  holderDetails.appendChild(cat);
  holderCard.appendChild(holderFooter);
  holderFooter.appendChild(addbtn);

})

$('.add-to-cart').click(function(event){
  event.preventDefault();
  var productName = $(this).data('name');
  var price = Number($(this).data('price'));
  addProduct(productName, price, 1);
  $('#counter').html(getTotalAmountProducts());

});

}

$('#showcartbtn').click(function(){
  $('#info').html(showCart());
})

function showCart(){
 let outCart = cart;
 console.log(outCart);
  let prodCart = "";
for(var i in outCart){
  let prName = outCart[i].name;
  let prPrice = outCart[i].price;
  let prAmount = outCart[i].amount;
  prodCart +=  "<tr><td>" + prName + "</td><td>"+ prPrice +  "</td><td>" + prAmount + "</td><td>"+ Number(prPrice * prAmount).toFixed(2) +"</td></tr>";  
}
return prodCart;
} 

  $('#clear').click(function(){
    emptyCart();
    $('#counter').html(getTotalAmountProducts());
    showCart();
  })

})



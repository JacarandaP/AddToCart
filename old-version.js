cart = [];
function Product(name, price, amount) {
  this.name = name;
  this.price = price;
  this.amount = amount;
}

function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addProduct(name, price, amount){
  var product = new Product(name, price, amount);
  console.log(product);
 // cart.push(product);
  //saveCart();
}




$(document).ready(function(){
    let sourceApi = 'http://webacademy.se/fakestore/'
    localStorage.clear;
    var test;
 fetch(sourceApi).then(function(response){
  return response.json();}).then(function(json){
    for(let i= 0; i<json.length; i++){
       showProduct(json[i]);
    }
  })
    
function showProduct(product){

   const column = document.createElement('div')
   const holderCard = document.createElement('div');
  const img = document.createElement('img');
  const holderContent = document.createElement('div');
  const title = document.createElement('h4');
  const holderDetails = document.createElement('div');
  const desc = document.createElement('p');
  const price = document.createElement('p');
  const cat = document.createElement('p');
  const holderFooter = document.createElement('div');
  const addbtn = document.createElement('a');

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
  addbtn.id ="btn";
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


  $('.add-to-cart').click(function(event){
  event.preventDefault();
  var productName = $(this).data('name');
  var price = Number($(this).data('price'));
  test = new Product(productName, price, 1);
  console.log(price);
 
})
}

})
/*
$('.add-to-cart').click(function(event){
  event.preventDefault();
  var productName = $(this).data('name');
  var price = Number($(this).data('price'));
  test = new Product(productName, price, 1);
  console.log(price);

})*/
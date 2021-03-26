$(document).ready(function(){
  cart = [];
  function Product(name, price, amount) {
    this.name = name;
    this.price = price;
    this.amount = amount;
  }
  
  function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart'));
    $('#counter').html(getTotalAmountProducts());
  }
  if (localStorage.getItem("cart") != null) {
    loadCart();
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
  

    let sourceApi = 'http://webacademy.se/fakestore/'
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

/**
 * Modal
 */

$('#showcartbtn').click(function(){
  $('#info').html(showCart());
})

function showCart(){
  let outCart = cart;
  let prodCart = "";
  let totalToPay = 0;
 
for(var i in outCart){
  let prName = outCart[i].name;
  let prPrice = outCart[i].price;
  let prAmount = outCart[i].amount;
  let totalPrice = Number(outCart[i].price * outCart[i].amount).toFixed(2);
  totalToPay += outCart[i].price * outCart[i].amount;
  prodCart += "<tr>"
  +"<td>" + prName + "</td>"
  +"<td>"+ "$" + prPrice + "</td>"
  + "<td><div class='input-group'><button class='minus-prd input-group-addon btn btn-primary' data-names='" + prName + "'>-</button>"
  + "<input type='number' class='item-count form-control' data-name='" + prName + "' value='" + prAmount + "'>"
  + "<button class='plus-prd btn btn-primary input-group-addon' data-names='" + prName+ "'>+</button></div></td>"
  + "<td>"+ "$" + totalPrice + "</td>" 
  + "<td><button class='delete-prd' data-names='" + prName + "'><img src='images/trash.svg' alt='remove' fill='red'></img></button></td>"
  +  "</tr>";
}
 
$('#totalPay').html(Number(totalToPay).toFixed(2));
  

  return prodCart;
}

function removeOne(prdName) {
  for(var product in cart){
    if(cart[product].name === prdName){
      cart[product].amount --;
      if(cart[product].amount === 0){
        cart.splice(product, 1);
       }
       break;
    }
  }
    saveCart();  
    $('#info').html(showCart());
    $('#counter').html(getTotalAmountProducts());

}

function addOne(prdName){
  for(var product in cart){
    if(cart[product].name === prdName){
      cart[product].amount ++;
    }
  }
    saveCart();
    $('#info').html(showCart());
    $('#counter').html(getTotalAmountProducts());
}

function discard(prdName){
  for(var product in cart){
    if(cart[product].name === prdName){
      cart.splice(product, 1);
      break;
    }
  }
  saveCart();
  $('#info').html(showCart());
  $('#counter').html(getTotalAmountProducts());
  }



$('#info').on("click", ".minus-prd",(function(event){
  let prdName = $(this).data('names');
  removeOne(prdName);

}));

$('#info').on("click", ".plus-prd",(function(event){
  let prdName = $(this).data('names');
 addOne(prdName);
}));

$('#info').on("click", ".delete-prd",(function(event){
  let prdName = $(this).data('names');
  discard(prdName);
}))

  $('#clear').click(function(){
    emptyCart();
    $('#counter').html(getTotalAmountProducts());
  })

/**
 * Checkoutsidan
 * @returns final cart som visas i checkout sidan
 */
  function showFinalCart(){
    let checkoutCart = cart;
    let finalProdCart = "";
    let finalTotalToPay = 0;
  for(var i in checkoutCart){
    let finalPrdName = checkoutCart[i].name;
    let finalPrdPrice = checkoutCart[i].price;
    let finalPrdAmount = checkoutCart[i].amount;
    let finalTotalPrice = Number(checkoutCart[i].price * checkoutCart[i].amount).toFixed(2);
    finalTotalToPay += checkoutCart[i].price * checkoutCart[i].amount;
    finalProdCart += "<tr>"
    +"<td>" + finalPrdName + "</td>"
    +"<td>"+ "$"+ finalPrdPrice + "</td>"
    + "<td>" + finalPrdAmount + "</td>"
    + "<td>"+ "$" + finalTotalPrice + "</td>" 
    +  "</tr>";
  }
  
  $('#FinalTotalPay').html(Number(finalTotalToPay).toFixed(2));
    
    return finalProdCart;
  }

  $('#finalInfo').html(showFinalCart())

  
/**
 * Validering av formulären
 */
 
function test(){
  validation = [];

     let inputName = document.getElementById("clientsName");
     if(isRequired(inputName.value) === false){
       $('#input1').html("This field cannot be empty");
     } else if (hasNumbers(inputName.value) === false){
      $('#input1').html("No numbers allowed");
      } else {
       $('#input1').html("");
     };
     
  let inputMail = document.getElementById("clientsMail");
  if(isRequired(inputMail.value) === false){
    $('#input3').html("This field cannot be empty")
  } else if(isEmailValid(inputMail.value)== false){
    $('#input3').html("Invalid email")
  } else {
    $('#input3').html("");
  };

  
  let inputPhone = document.getElementById("clientsPhone");
  if(isRequired(inputPhone.value) === false){
    $('#input4').html("This field cannot be empty")
  } else if (isPhoneValid(inputPhone.value) === false){
    $('#input4').html("Not a valid phone number")
  } else {
    $('#input4').html("");
  };
  

  let inputAddress = document.getElementById("clientsAddress");
  if(isRequired(inputAddress.value) === false){
    $('#input2').html("This field cannot be empty");
  } else if(isAddressValid(inputAddress.value)=== false){
    $('#input2').html("Just numbers and letters allowed")
  } else {
    $('#input2').html("");
  }

      function isRequired(input){
        if(input == ""){
          validation.push("false");
          return false;
        } else {
          validation.push("true");
          return true;
        }
      }
  
      function hasNumbers(input){
        let characters= /^[a-zA-Z]*$/;
        if(input.match(characters)){
          validation.push("true");
          return true
        } else {
          validation.push("false");
          return false;
        }
      }
  
     function isEmailValid(email) {
      let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email.match(mailformat)){
          validation.push("true");
          return true;
        } else {
          validation.push("false");
          return false;
        }
      }
  
      function isPhoneValid (phonenr) {
        let digits = /^\d{10}/;
        if(phonenr.match(digits)) {
          validation.push("true");
          return true
        } else {
          validation.push("false");
          return false;
        }
      }
  
  function isAddressValid(address){
    let digitsAndNumbers = /^[a-zA-Z0-9- X]*$/;
    if(address.match(digitsAndNumbers)){
      validation.push("true");
      return true
    } else {
      validation.push("false");
      return false;
    }
  }
  
  let validationTest = validation.includes("false");

      if(validationTest === false){
        alert("your order has successfully been processed");
        emptyCart()
        $('#counter').html(getTotalAmountProducts());
        
      } else {
       alert("Please fill in the form with correct values");
      }
  
    }

    let submitbtn = document.getElementById("confirmbtn")
    submitbtn.addEventListener("click", function(event){
       event.preventDefault()
       test();
    
})
   
});


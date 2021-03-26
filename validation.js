
cart = []
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart'));

  }
  if (localStorage.getItem("cart") != null) {
    loadCart();
  }

  function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function emptyCart(){
    cart= [];
    saveCart();
  }

function validateForm(){
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
         
          
        } else {
         alert("Please fill in the form with correct values");
        }
    
      }
  
      let submitbtn = document.getElementById("confirmbtn")
      submitbtn.addEventListener("click", function(event){
         event.preventDefault()
         validateForm();
      
  })
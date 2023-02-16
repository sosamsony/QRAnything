

/* Mobile navbar */ 

const menuBtn = document.querySelector('.navbar__btn');
const navList = document.querySelector('.navbar__list');
let IsMenuOpen = false;

menuBtn.addEventListener('click', () => {
  if(!IsMenuOpen) {
    menuBtn.setAttribute("aria-expanded", true)
    navList.classList.toggle("open");
    IsMenuOpen = true;
  } else {
    menuBtn.setAttribute("aria-expanded", false);
    navList.classList.toggle("open");
    IsMenuOpen = false;
  }
});



/* Customizing the generated code */ 

//The button that opens the customization window
const customizationBtn = document.getElementById("customization");
//The div wrapper around the customization window 
const customiztion = document.querySelector(".customization");
//The button that cloes the customization window
const closeCustomiztion = document.querySelector(".customization__close");
//The customization window state 
let isCustomiztionWindowOpen = false;


customizationBtn.addEventListener('click', showCustomizationWindow);


function showCustomizationWindow() {
  if(!isCustomiztionWindowOpen) {
    customiztion.classList.remove('close');
    customiztion.classList.add('open');
  } else {
    customiztion.classList.remove('open');
    customiztion.classList.add('close');
  }
}


closeCustomiztion.addEventListener('click', closeCustomizationWindow);

function closeCustomizationWindow() {
 customiztion.classList.toggle("close");
 customiztion.classList.toggle("open");
}



//URL regex that starts with HTTP or HTTPS
const regex1 = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
//URL regex that doesn’t start with HTTP or HTTPS 
const regex2 = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;


//The url input field 
const url = document.getElementById("url");
const urlSubmitBtn = document.querySelector("#urlSubmit");
const urlWrapper = document.querySelector(".hero__form__input");
const errorMessage = document.querySelector(".hero__form__input-error__message");


url.addEventListener('focus', removeErrorMessage);

function removeErrorMessage() {
  urlWrapper.classList.remove("error");
  errorMessage.classList.add("hide");
  errorMessage.classList.remove("show");
}


//The customization variants 
let size = document.getElementsByName('size');
let color = document.getElementsByName('color');
let format = document.getElementsByName('format');


//A function to get the checked/chosen value of each of the cumtomization variant 
function getCheckedValue(values) {
  let chosenValue;
  for(let i = 0; i < values.length; i++) {
    if(values[i].checked) chosenValue = values[i].value;
  }
  return chosenValue;
}


let saveChangesBtn = document.querySelector(".customization__save");

saveChangesBtn.addEventListener('click', saveChanges);

function saveChanges() {
  closeCustomizationWindow();
  return getCheckedValue(color), getCheckedValue(size), getCheckedValue(format);
}

//The div that shows the qr code
let qrcode = document.querySelector('.qrcode');
//Saves the URL entered by user if it's valid 
let validURL;
//The qr code/image 
let code = document.querySelector(".qrcode__img-src");
//The url to be fetched to obtain a qr code 
let fetchURL; 


urlSubmitBtn.addEventListener('click', getTheURL)

function getTheURL() {
  if(regex1.test(url.value) || regex2.test(url.value)) {
    validURL = url.value;
    fetchURL = `http://api.qrserver.com/v1/create-qr-code/?data=${validURL}&size=${getCheckedValue(size)}x${getCheckedValue(size)}&color=${getCheckedValue(color)}&format=${getCheckedValue(format)}`;
    code.src = fetchURL;
    showQrCode();
  } else {
    urlWrapper.classList.add("error");
    showErrorMessage();
  }
}

//The anchor tag to download the qr code
let download = document.getElementById("download");
//The anchor tag to view the qr code in full size (in different tab)
let viewFullSize = document.getElementById("view-full-size");

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)
  viewFullSize.href = imageURL;
  download.href = imageURL;
  download.download = 'qr-code';
}

document.addEventListener('click', () => fetchURL ? downloadImage(fetchURL) : null);


function showQrCode() {
  qrcode.classList.remove("hide");
  qrcode.classList.add("show");
}

function hideQrCode() {
  qrcode.classList.remove("show");
  qrcode.classList.add("hide");
}


let clearURL = document.querySelector("#clear__url");

clearURL.addEventListener('click', removeUrlAndImage);

function removeUrlAndImage() {
  url.value = "";
  hideQrCode();
  removeErrorMessage();
}

function showErrorMessage() {
  errorMessage.classList.add("show");
  errorMessage.classList.remove("hide");
}


//set current year in the copyright in the footer 

const setCurrentYear = document.querySelector(".year");
let today = new Date();
let currentYear = today.getFullYear();
setCurrentYear.innerHTML = currentYear;






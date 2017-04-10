const signin = document.getElementById('sign');
const but = document.getElementById('button');
const exit = document.getElementById('exit-button');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const go= document.getElementById('go-button');


but.addEventListener('click', (e) => {
  signin.classList.toggle('active');
});

exit.addEventListener('click', (e) => {
  signin.classList.toggle('active');
  ClearForm();
});

go.addEventListener('click', (e) => {
  if (validateName() && validateEmail() && validateMessage())
  {
    signin.classList.toggle('active');
    ClearForm();
  }
});

name.addEventListener('blur', (e) => {
  if (validateName()) {
    name.style.border = '2px solid green';
  }
  else{
    name.style.border = '2px solid red';
  }
});

email.addEventListener('blur', (e) => {
  if (validateEmail()) {
    email.style.border = '2px solid green';
  }
  else{
    email.style.border = '2px solid red';
  }
});

message.addEventListener('blur', (e) => {
  if (validateMessage()) {
    message.style.border = '2px solid green';
  }
  else{
    message.style.border = '2px solid red';
  }
});

function ClearForm() {
  message.value='';
  name.value='';
  email.value='';
  name.style.border = '2px solid transparent';
  email.style.border = '2px solid transparent';
  message.style.border = '2px solid transparent';
}

function validateName() {
  const f=name.value;
  const regExName = /^[a-zA-Zа-яА-Я'\s-]+$/;
  if(!regExName.test(f)) {
    return false;
  }
  else if(!f=='') {
    return true;
  }
}

function validateEmail() {
  const e=email.value;
  const emailTest = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!emailTest.test(e)) {
    return false;
  }
  else if(!e=='') {
    return true;
  }
}

function validateMessage() {
  const m = message.value;
  if(!m=='') {
    return true;
  }
  else {
    return false;
  }
}

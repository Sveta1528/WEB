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
    name.classList.remove('error');
    name.classList.add('correct');
  }
  else{
    name.classList.remove('correct');
    name.classList.add('error');
  }
});

email.addEventListener('blur', (e) => {
  if (validateEmail()) {
    email.classList.remove('error');
    email.classList.add('correct');
  }
  else{
    email.classList.remove('correct');
    email.classList.add('error');
  }
});

message.addEventListener('blur', (e) => {
  if (validateMessage()) {
    message.classList.remove('error');
    message.classList.add('correct');
  }
  else{
    message.classList.remove('correct');
    message.classList.add('error');
  }
});

function ClearForm() {
  message.value='';
  name.value='';
  email.value='';
  name.classList.remove('error');
  email.classList.remove('error');
  message.classList.remove('error');
  name.classList.remove('correct');
  email.classList.remove('correct');
  message.classList.remove('correct');
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

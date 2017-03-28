const burger = document.getElementById('burger-button');

burger.addEventListener('click', (e) => {
  e.preventDefault();
  document.body.classList.toggle('open');
  burger.classList.toggle('open');
});


const button = document.getElementsByClassName('burger__menu__item');
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener('click', (e) => {
    document.body.classList.toggle('open');
    burger.classList.toggle('open');
  });
}

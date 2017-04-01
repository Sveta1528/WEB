const signin = document.getElementById('sign');
const but = document.getElementById('button');
const exit = document.getElementById('exit-button')



but.addEventListener('click', (e) => {
  signin.classList.toggle('active');
});

exit.addEventListener('click', (e) => {
  signin.classList.toggle('active');
});e


/*
signin.addEventListener('click', (e) => {
  e.preventDefault();
  signin.classList.toggle('active');
  //document.classList.toggle('active');
});

*/

/*
close.addEventListener('click', (e) => {
  //button.body.classList.toggle('active');
  close.classList.toggle('');
});

var checkInput = function(input) {
	if (input.value.length > 0) {
		input.className = 'active';
	} else {
		input.className = '';
	}
};

signin.addEventListener('click', (e) => {
  button.body.classList.toggle('active');
  signin.classList.toggle('active');
});

var closeForm = function() {
	//button.className = '';
};

document.addEventListener("keyup", function(e) {
	if (e.keyCode == 27 || e.keyCode == 13) {
		closeForm();
	}
});
*/


'use strict'

// navigation
const nav = document.querySelector('nav');

nav.addEventListener('click', function(event){
    console.log(event.target);
})


const removeActive = function(arr){
    arr.forEach(element => {
        element.classList.remove('active');
    })
}


// footer date
const dateEl = document.querySelector('.date');
dateEl.textContent = new Date().getFullYear();

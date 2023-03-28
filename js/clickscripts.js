import {auth} from './index-scripts.js';

let divs = document.getElementsByClassName('filterDiv');

for (let i = 0; i < divs.length; i++){
    divs[i].addEventListener('click', openDetails());
}

function openDetails(){
    console.log(auth.currentUser);
}
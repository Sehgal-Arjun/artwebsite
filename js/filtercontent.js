filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'block';
  }
  for (i = 0; i < x.length; i++) {
    if (!(x[i].classList.contains(c))){
        console.log(x[i]);
        x[i].style.display = 'none';
    }
  }
}

function searching(){
    var userinput = document.getElementById('searchbar').value;
    const elements = document.getElementById('allart').querySelectorAll('section');
    [...elements].forEach((element) => {
        element.style.display = 'block';
    });

    const divs = document.getElementById('allart').querySelectorAll('div');
    for (let element of divs){
        if (element.classList.contains('classname')){
            element.style.display = 'block';
        }
    }
    console.log(userinput);

    if (userinput !== "" && userinput !== null && userinput.length !== 0){
        userinput = userinput.toLowerCase();
        userinput = userinput.replace(/ /g,"_");
        const elements = document.getElementById('allart').querySelectorAll('section');
        let list = [];
        let counter = 0;
        [...elements].forEach((element) => {
            if (element.getAttribute('artist').includes(userinput)){
                list.push(counter);
            }
            counter = counter + 1;   
        });
        let indexlist = [];
        for (let i = 0; i < elements.length; i++){
            if (!list.includes(i)){
                indexlist.push(i);
            }
        }
        //indexlist.reverse()
        for (const element of indexlist){
            elements[element].style.display = 'none';
            console.log('working');
        }
    }
}
function searching(){
    var userinput = document.getElementById('searchbar').value;
    const elements = document.getElementById('artcontent').querySelectorAll('section');
    [...elements].forEach((element) => {
        element.style.display = 'block';
    });

    if (userinput !== "" || userinput !== null){
        userinput = userinput.toLowerCase();
        userinput = userinput.replace(/ /g,"_");
        const elements = document.getElementById('artcontent').querySelectorAll('section');
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
        for (let i = 0; i < indexlist.length; i++){
            elements[indexlist[i]].style.display = 'none';
        }
    }
}
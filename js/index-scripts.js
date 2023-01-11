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
        console.log(elements);
        let list = [];
        let counter = 0;
        [...elements].forEach((element) => {
            console.log(userinput + "-> what user typed");
            console.log(element.getAttribute('artist') + "-> artist name per div");
            if (element.getAttribute('artist').includes(userinput)){
                console.log('true');
                list.push(counter);
            }     
            counter = counter + 1;   
        });
        console.log(list);
        let indexlist = [];
        for (let i = 0; i < elements.length; i++){
            if (!list.includes(i)){
                indexlist.push(i);
            }
        }
        //indexlist.reverse()
        console.log(indexlist);
        for (let i = 0; i < indexlist.length; i++){
            console.log(elements[indexlist[i]].getAttribute('artist'));
            elements[indexlist[i]].style.display = 'none';
        }
    }
}
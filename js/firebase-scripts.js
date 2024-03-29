// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes, listAll } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6yNBfcAXi5h1y1MHh-rq12QcSbiO9NMM",
  authDomain: "aslartwebsite.firebaseapp.com",
  projectId: "aslartwebsite",
  storageBucket: "aslartwebsite.appspot.com",
  messagingSenderId: "860028100046",
  appId: "1:860028100046:web:befa148802d0273d6f9f9f",
  measurementId: "G-KY0245B90W",
  databaseURL: "https://aslartwebsite-default-rtdb.europe-west1.firebasedatabase.app/"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getDatabase();

const artRef = ref(db, 'art/');
/*
// original getter
onValue(artRef, (snapshot) => {
  const data = snapshot.val();
  //console.log(data);
});

// REPLACE CURRENT DATABASE CONTENT / MAKE NEW DATABASE CONTENT (change 'art/perry1' to 'art/____')
set(ref(db, 'art/perry1'), {
    artist: 'ava_porter',
    location: 'blue staircase',
    url : 'test url'
});

// GET DATABASE CONTENTS (+ PRINT CONTENTS -> data)
onValue(artRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
          console.log(data[key]);
        }
      }
});

// GET IMAGE URL (+ PRINT IT)
const storageRef = getStorage(app);
const pathReference = sRef(storageRef, 'perry_chen0');
getDownloadURL(pathReference)
.then((url) => {
    console.log(url);
})
*/

function backfunction(){
    location.replace("./index.html");
}

let backbtn = document.getElementById('backbutton');
backbtn.addEventListener('click', backfunction)

setInterval(function(){ 
    if (document.querySelector('#artimage').files[0] != null) {
        document.getElementById('filebutton').innerHTML = 'File Uploaded';
    }
    else{
        document.getElementById('filebutton').innerHTML = 'Choose File';
    }
}, 100);


function newInput(){
    let artistname = document.getElementById('artistname').value;
    let artlocation = document.getElementById('artlocation').value;
    let artclass = document.getElementById('class').value;
    let year = document.getElementById('year').value;
    if (year == null) {year = "0000";}
    if (artistname == null || artistname == "" || artistname.length == 0 || artistname.length < 0){
        console.log('enter an artist\'s name!');
    }
    else{
        if (artlocation == null || artlocation == "" || artlocation.length == 0 || artlocation.length < 0){
            console.log('enter a location!');
        }
        else{
            let finalname = "";

            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomkey = '';
            const charactersLength = characters.length;
            for ( let i = 0; i < 15; i++ ) {
                randomkey += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            onValue(artRef, (snapshot) => {
                const data = snapshot.val();
                const storageReference = getStorage(app);
                let content = []; // content is from RT database
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                      content.push(data[key]);
                    }
                }
                let fixedartistname = artistname.toLowerCase().replace(/ /g,"_");
                let counter = 0;
                content.forEach((element) => {
                    //console.log(element);
                    //console.log(fixedartistname);
                    //console.log(element.artist);
                    if (fixedartistname == element.artist.toLowerCase().replace(/ /g,"_")){
                        counter++;
                    }
                })
                //console.log(counter);
                finalname = fixedartistname + counter + randomkey;
                //console.log(finalname);

                const storage = getStorage(app);
                const storageRef = sRef(storage, finalname);

                const listRef = sRef(storage, '/');

                listAll(listRef)
                .then((res) => {
                    console.log(res.items);
                    console.log("randomkey: " + randomkey);
                    let includesorno = false;

                    res.items.forEach((itemRef) => {
                        if (itemRef.name.includes(randomkey)){
                            includesorno = true;
                        }
                    })

                    if (!includesorno){
                        console.log("RUNNIGN THIS !!!!");
                        const file = document.querySelector('#artimage').files[0];
                        uploadBytes(storageRef, file).then((snapshot) => {
                            console.log('Uploaded file!');
                        });
                        
                        setTimeout( function() {

                            const pathRef = sRef(storageReference, finalname);
                            getDownloadURL(pathRef)
                            .then((arturl) => {
                                set(ref(db, 'art/' + finalname), {
                                    artist: artistname,
                                    location: artlocation,
                                    url : arturl,
                                    class: artclass,
                                    year: year,
                                    id: randomkey
                                    //available: availability
                                });
                            })
                            setTimeout(() => {
                                document.getElementById("inputform").reset();
                                alert("Uploaded! :)");
                            }, 500);
                        }, 4000)
                    }
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                    console.log(err.message);
                });
                /*
                const file = document.querySelector('#artimage').files[0];
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded file!');
                });
                
                setTimeout( function() {

                    const pathRef = sRef(storageReference, finalname);
                    getDownloadURL(pathRef)
                    .then((arturl) => {
                        set(ref(db, 'art/' + finalname), {
                            artist: artistname,
                            location: artlocation,
                            url : arturl,
                            class: artclass,
                            year: year,
                            id: randomkey
                            //available: availability
                        });
                    })
                    setTimeout(() => {
                        //location.reload();
                    }, 500);
                }, 4000)
*/
            });
            
        }
    }
}

const btn = document.getElementById('inputbutton');
btn.addEventListener('click', newInput);

function deleteData(){

}

function editData(){
    /* IF YOU ARE SIGNED IN */ 

}
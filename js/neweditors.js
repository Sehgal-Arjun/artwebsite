// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const authemailsref = ref(db, 'authenticatedusers/');

// back button
let backbtn = document.getElementById('backbutton');
backbtn.addEventListener('click', function(){
    location.replace("./index.html")
});

onValue(authemailsref, (snapshot) => {
    const data = snapshot.val();
    let emails = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            emails.push(data[key]);
        }
    }
    for (let i = 0; i < emails.length; i++){
        if (emails[i].email == "arjun_sehgal@asl.org"){
            emails.splice(i, 1);
        }
    }

    let currenteditorsdiv = document.getElementById('currenteditorscontainer');
    let htmltext = currenteditorsdiv.innerHTML;
    for (let i = 0; i < emails.length; i++){
        htmltext = htmltext + '<span class="spanitem">' + emails[i].email + "</span>" +"<br>";
    }
    currenteditorsdiv.innerHTML = htmltext;


    function addemail(){
        let newauthemail = document.getElementById('newemail').value;
        if (!emails.includes(newauthemail) && newauthemail.length != 0){
            let emailkey = "email" + emails.length;
            let key = 'authenticatedusers/' + emailkey;
            // REPLACE CURRENT DATABASE CONTENT / MAKE NEW DATABASE CONTENT (change 'art/perry1' to 'art/____')
            set(ref(db, key), {
                email: document.getElementById('newemail').value
            });
        }
        
    }

    let submitbutton = document.getElementById('inputbutton');
    submitbutton.addEventListener('click', addemail);

    setInterval(function(){ 
    
        let spans = document.getElementsByClassName("spanitem");
        for (const element of spans){
            element.onclick = function(){
                let reference = "";
                for (let i = 0; i < emails.length; i++){
                    if (emails[i].email == element.innerHTML){
                        reference = "email" + i;
                    }
                }

                if (reference != ""){
                    let key = "/authenticatedusers/" + reference + "/";
                    remove(ref(db, key)).then(() => {
                        console.log('removed!');
                    })
                    /*
                    console.log(key);
                    let deleteref = ref(db, key);
                    set(ref(db, deleteref), {email:null});*/
                }
    
                console.log(element.innerHTML);
            }
        }
    }, 100);
})





// test the bounds on the test -> not for geo series
// integral and taylor polynomial, find leGrange error bound
// number over geo series is just a/r (geo series)
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
    let content = [];
    let emails = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            content.push(data[key]);
        }
    }
    for (let i = 0; i < content.length; i++){
      if (typeof content[i] == "string"){
        emails.push(content[i]);
      }
      else{
        emails.push(content[i].email);
      }
    }

    console.log(emails);

    for (let i = 0; i < emails.length; i++){
        if (emails[i] == "arjun_sehgal@asl.org"){
            emails.splice(i, 1);
            content.splice(i, 1);
        }
    }
    //console.log(emails);

    let currenteditorsdiv = document.getElementById('currenteditorscontainer');
    let htmltext = '<h3><b>Current Editors:</b></h3><span>arjun_sehgal@asl.org</span><br style="line-height:5px;">';
    for (const element of emails){
        htmltext = htmltext + '<span class="spanitem">' + element + "</span>" +"<br>";
    }
    currenteditorsdiv.innerHTML = htmltext;


    function addemail(){ // issue is email1 stays even if removing email0!!!!
        let newauthemail = document.getElementById('newemail').value;
        if (!emails.includes(newauthemail) && newauthemail.length != 0){
            let emailkey = "email" + emails.length;
            let key = 'authenticatedusers/' + emailkey;
            if (!emails.includes(document.getElementById('newemail').value)){
                set(ref(db, key), {
                email: document.getElementById('newemail').value,
                index: emails.length
                }).then(() => {
                    emails.push(document.getElementById('newemail').value);
                    content.push(document.getElementById('newemail').value);
                    location.reload(); 
                });
            }
        }
        
    }

    let submitbutton = document.getElementById('inputbutton');
    submitbutton.addEventListener('click', addemail);

    setInterval(function(){ 
    
        let spans = document.getElementsByClassName("spanitem");
        for (const element of spans){
            element.onclick = function(){
                if (confirm("Are you sure you want to remove this editor?")){
                    let emailnum = 0;
                    let reference = "";
                    for (let i = 0; i < emails.length; i++){
                        if (emails[i] == element.innerHTML){
                            reference = "email" + i;
                            emails.splice(i, 1);
                            content.splice(i, 1);
                            emailnum = i;
                        }
                    }

                    if (reference != ""){
                        let key = "/authenticatedusers/" + reference + "/";
                        console.log('key: ' + key);
                        remove(ref(db, key)).then(() => { // eg, key could be "/authenticatedusers/email0/"
                            console.log('removed!');
                        });
                        /*
                        console.log(key);
                        let deleteref = ref(db, key);
                        set(ref(db, deleteref), {email:null});*/
                        console.log('emailnum: ' + emailnum);
                        console.log(content);
                        for (let i = emailnum; i < content.length; i++){
                            let newref = "email" + (content[i].index - 1);
                            let newkey = "/authenticatedusers/" + newref + "/";
                            let oldkey = "/authenticatedusers/email" + content[i].index + "/";
                            console.log(content[i]);
                            console.log('oldkey: ' + oldkey);
                            remove(ref(db, oldkey)).then(() => {
                                console.log('removed!');
                                set(ref(db, newkey), {
                                    email: emails[i],
                                    index: i
                                }).then(() => {
                                    //location.reload();
                                })
                            });
                        }

                    }
                    
                    console.log(element.innerHTML);
                    //location.reload();
                }
            }
        }
    }, 100);
})





// test the bounds on the test -> not for geo series
// integral and taylor polynomial, find leGrange error bound
// number over geo series is just a/r (geo series)

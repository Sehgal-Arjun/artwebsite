// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes, deleteObject, listAll } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
import { getFirestore, doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

var loggedin;
var authenticated;
var authemails = [];
var teacher = false; // NEED TO CHECK IMPLEMENT THIS

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


let div = document.getElementById('artcontainer');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const artRef = ref(db, 'art/');
const authenticatedusersRef = ref(db, 'authenticatedusers/');
const storage = getStorage();

let backbutton = document.getElementById("backbutton");
backbutton.addEventListener('click', function(){
    location.replace("./index.html");
})

onValue(artRef, (snapshot) => {
    const data = snapshot.val();
    let content = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
        content.push(data[key]);
        }
    }
    //console.log(content);

    let classlist = [];
    let classes = [];
    for (const element of content){
        if (!classlist.includes(element.class)){ classlist.push(element.class);}
    }

    for (const element of classlist){
        let currclasslist = [];
        for (let j = 0; j < content.length; j++){
            if (content[j].class == element){
                currclasslist.push(content[j]);
            }
        }
        classes.push(currclasslist);
    }

    classes.forEach((listofart) => {
        div.innerHTML = div.innerHTML + '<div id="' + listofart[0].class + '"><div class="centerthis"><h2><b>' + listofart[0].class + '</b></h2></div></div><br>';
        let currentdiv = document.getElementById(listofart[0].class);
        listofart.forEach((element) => {
            currentdiv.innerHTML = currentdiv.innerHTML + '<div class="row"><div class="imgcontainer"><img src="' + element.url + '"style="width:auto;height:250px;"></div><div class="takefullspace"><div class = "stuffcontainer"><h4 class="grid-item" style="height:60px;">' + element.artist + '</h4><p class="grid-item">' + element.location + '</p><p class="grid-item">' + element.year + '</div></div><div class="imgcontainer"><img id = "' + element.id + '" class = "grid-item redimagex" style="height:50px;" src="images/deletebutton.png"></div></div>'
        })
    })

    let xs = [...document.getElementsByClassName("redimagex")];
    xs.forEach((x) => {
        x.addEventListener('click', function(){
            console.log("HI!");
            if (confirm("Are you sure you want to delete this art piece?")){
                //const storageRef = ref(storage, "/");
                const listRef = sRef(storage, '/');
                listAll(listRef)
                .then((res) => {
                    console.log(res.items);
                    console.log("randomkey: " + x.id);
                    let includesorno = false;
                    let filename = "";

                    res.items.forEach((itemRef) => {
                        if (itemRef.name.includes(x.id)){
                            includesorno = true;
                            filename = itemRef.name;
                        }
                    })

                    if (!filename == ""){
                        console.log(filename);
                        remove(ref(db, 'art/' + filename));
                        let deleteref = sRef(storage, filename);
                        console.log("deleted from RT DB!");
                        deleteObject(deleteref).then(() => {
                            console.log("successfully deleted!");
                            location.reload();
                        }).catch((error) => {
                            console.log("Error! " + error.message);
                        })
                    }
                });
            }
            else{
                console.log("no worries");
            }
        })
    })
});
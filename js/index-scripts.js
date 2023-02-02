// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
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

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const artRef = ref(db, 'art/');

onValue(artRef, (snapshot) => {
    const data = snapshot.val();
    let content = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
          content.push(data[key]);
        }
    }
    console.log(content);

    const shuffledContent = content.sort((a, b) => 0.5 - Math.random());

    shuffledContent.forEach((element) => {
        let loc = element.location;
        let tags = [];
        if (loc.toLowerCase().includes('mellon library')){
            tags.push('mellonlibrary')
        }
        if (loc.toLowerCase().includes('learning commons')){
            tags.push('learningcommons')
        }
        if (loc.toLowerCase().includes('blue')){
            tags.push('blue');
        }
        if (loc.toLowerCase().includes('orange')){
            tags.push('orange');
        }
        if (loc.toLowerCase().includes('yellow')){
            tags.push('yellow');
        }
        if (loc.toLowerCase().includes('green')){
            tags.push('green');
        }
        if (loc.toLowerCase().includes('red')){
            tags.push('red');
        }
        if (loc.toLowerCase().includes('commons')){
            tags.push('commons');
        }
        if (loc.toLowerCase().includes('orange')){
            tags.push('orange');
        }
        if (loc.toLowerCase().includes('art building')){
            tags.push('artbuilding');
        }
        if (loc.toLowerCase().includes('lower school')){
            tags.push('lowerschool');
        }
        if (loc.toLowerCase().includes('middle school')){
            tags.push('middleschool');
        }
        if (loc.toLowerCase().includes('kindergarten')){
            tags.push('kindergarten');
        }
        if (loc.toLowerCase().includes('storage')){
            tags.push('storage');
        }
        let tagstring = tags.join(' '); 

        let artist = element.artist;
        let fixedartist = artist.toLowerCase().replace(/ /g,"_");

        let startsection = '<section artist = "' + fixedartist + '" class="filterDiv single-portfolio col-sm-4 all ' + tagstring + '">';
        let endsection = '</section>';
        let startimgdiv1 = '<div class="relative">';
        let endimgdiv1 = '</div>';
        let startimgdiv2 = '<div class="thumb">';
        let endimgdiv2 = '</div>';
        let middleimgdiv = '<div class="overlay overlay-bg"></div>';
        let img = '<img class="image img-fluid" src="' + element.url + '" alt="" onclick="openDetails()">';
        let startdiv3 = '<div class="p-inner">';
        let enddiv3 = '</div';
        let artistname = '<h4>' + artist + '</h4>';
        let locationtext = '<div class="cat">' + element.location + '</div>';

        document.getElementById('artcontent').innerHTML = document.getElementById('artcontent').innerHTML + startsection + startimgdiv1 + startimgdiv2 + middleimgdiv + img + endimgdiv2 + endimgdiv1 + startdiv3 + artistname + locationtext + enddiv3 + endsection;

        console.log(startsection);

        let currimages = 0;
        console.log(document.getElementsByTagName('img').length);

        if(document.getElementsByTagName('img').length == content.length){
            
            //footer creation here!
            let startfooter = '<footer class="site-footer" id = "footer">';
            let startfooterdiv1 = '<div class="container">';
            let startfooterdiv2 = '<div class="row mb-5">';
            let startfooterdiv3 = '<div class="col-md-12 text-center">';
            let startp = '<p>';
            let website = '<a href="https://www.facebook.com/americanschoolinlondon" class="social-item"><span class="icon-facebook2"></span></a>';
            let twitter = '<a href="https://twitter.com/aslnews" class="social-item"><span class="icon-twitter"></span></a>';
            let instagram = '<a href="https://www.instagram.com/asinlondon/" class="social-item"><span class="icon-instagram2"></span></a>';
            let endp = '</p>';
            let enddiv = '</div>';
            let endfooter = '</footer>';

            //document.getElementById('footersectionid').innerHTML = startfooter + startfooterdiv1 + startfooterdiv2 + startfooterdiv3 + startp + website + twitter + instagram + endp + enddiv + enddiv + enddiv + endfooter;

        }
    })
})

function openDetails(){
    let authorized = false;
    /* IF YOU ARE SIGNED IN */ 
    if (authorized){

    }
    else{
        window.open(this.src)
    }
}
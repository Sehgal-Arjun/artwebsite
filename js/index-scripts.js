// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const artRef = ref(db, 'art/');
const authenticatedusersRef = ref(db, 'authenticatedusers/');

const loginbutton = document.getElementById('loginbutton');
loginbutton.addEventListener('click', router);
let htmltext = document.getElementById("signintext");

let provider = new GoogleAuthProvider();

function router(){
    if (!loggedin){ // if the user is not signed in yet
        googlelogin();
    }
    else{ // if the user is already signed in, and wants to sign out
        googlelogout();
    }
}

function googlelogin(){
    console.log('log in button called!');

    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used
        const email = error.customData.email;
        // The AuthCredential type that was used
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}


function googlelogout(){
    console.log('log out button called!');

    signOut(auth).then(() => {
        //sign out successful
        console.log('logged out!');
    }).catch((error) => {
        //error in sign out
        console.log(error);
    });
}

onAuthStateChanged(auth, (user) => {
    if (user){ // user is signed in
        htmltext.innerHTML = "Sign out with Google";
        console.log('user is signed in!');
        loggedin = true;
        if(user.email.slice(-7) == "asl.org"){
            if (authenticated == false){
                authenticated = true;
                location.reload();
            }
            authenticated = true;
        }
        else{
            authenticated = false;
        }
    }
    else{ // user is signed out
        htmltext.innerHTML = "Sign in with Google";
        loggedin = false;
        if (authenticated == true){
            console.log('hi guys');
            authenticated == false;
            location.reload();
        }
        console.log('user is not signed in!');
        authenticated = false;
    }

    onValue(authenticatedusersRef, (snapshot) => {
        const data = snapshot.val();
        let content = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
              content.push(data[key]);
            }
        }
        authemails = content;
        console.log(authemails);
        for (const element of authemails){
            if (user){ // user is signed in
                console.log(user.email);
                if (element.email == user.email){
                    teacher = true;
                }
                if (authemails.includes(user.email)) { teacher = true; }
            }
            
        }
        console.log('teacher: ' + teacher);
        //console.log(authemails);
    

        onValue(artRef, (snapshot) => {
            const data = snapshot.val();
            let content = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                content.push(data[key]);
                }
            }
            //console.log(content);
        
            const shuffledContent = content.sort((a, b) => 0.5 - Math.random());

            if (shuffledContent[0].class != 'Permanent Collection'){
                let index = 0;
                for (let i = 0; i < shuffledContent.length; i++){
                    if (shuffledContent[i].class == 'Permanent Collection'){
                        index = i;
                        return;
                    }
                }
                let temp = shuffledContent[0];
                shuffledContent[0] = shuffledContent[index];
                shuffledContent[index] = temp;
            }

            let classlist = [];
            let classes = [];
            for (const element of shuffledContent){
                if (!classlist.includes(element.class)){ classlist.push(element.class);}
            }

            for (const element of classlist){
                let currclasslist = [];
                for (let j = 0; j < shuffledContent.length; j++){
                    if (shuffledContent[j].class == element){
                        currclasslist.push(shuffledContent[j]);
                    }
                }
                classes.push(currclasslist);
            }

            console.log(classes);
            
            document.getElementById('allart').innerHTML = "";

            classes.forEach((listofart) => {
                console.log(listofart);

                let maindiv = document.getElementById('allart');
                document.getElementById("allart").innerHTML = document.getElementById("allart").innerHTML + '<h2 class="section-heading text-center col-md-12 classname">' + listofart[0].class + "</h2>";

                let newartdiv = document.createElement('div');
                newartdiv.className = 'filters-content';
                let newartcontentdiv = document.createElement('div');
                newartcontentdiv.className = 'row grid';
                newartcontentdiv.id = 'artcontent';
                newartdiv.appendChild(newartcontentdiv);
                maindiv.appendChild(newartdiv);

                listofart.forEach((element) => {
            
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
    
                    if (!authenticated){
                        let namearr = element.artist.split('');
                        var tempname = [];
                        for (const element of namearr){
                            if (element == " ") { tempname.push("."); }
                            if (element == "-") { tempname.push("-"); }
                            if (element == "_") { tempname.push("_"); }
                            if (element != element.toLowerCase()) { tempname.push(element); }
                        }
    
                        artist = tempname.join('');
                    }
                    
                    let year = element.year;
                    if (year == null || year == undefined || year == "0000"){
                        year = "year?";
                    }

                    document.getElementById('artcontent').display = "none";
                    
                    let startsection = '<section artist = "' + fixedartist + '" class="filterDiv single-portfolio col-sm-4 all ' + tagstring + '">';
                    let endsection = '</section>';
                    let startimgdiv1 = '<div class="relative">';
                    let endimgdiv1 = '</div>';
                    let startimgdiv2 = '<div class="thumb">';
                    let endimgdiv2 = '</div>';
                    let middleimgdiv = '<div class="overlay overlay-bg"></div>';
                    let img = '<img class="image img-fluid" src="' + element.url + '" alt="" >'; // onclick="openDetails()" goes before the >
                    let startdiv3 = '<div class="p-inner">';
                    let enddiv3 = '</div';
                    let artistname = '<h4>' + artist + '</h4>';
                    let locationtext = '<div class="cat">' + element.location +" "+ "‧" + " " + year + '</div>';
            
                    document.getElementById('artcontent').innerHTML = document.getElementById('artcontent').innerHTML + startsection + startimgdiv1 + startimgdiv2 + middleimgdiv + img + endimgdiv2 + endimgdiv1 + startdiv3 + artistname + locationtext + enddiv3 + endsection;

                    //console.log(startsection);
            
                    let currimages = 0;
                    //console.log(document.getElementsByTagName('img').length);
            
                    if(document.getElementsByTagName('img').length == content.length){
                        
                        //footer creation here!
                        let startfooter = '<footer class="site-footer" id = "footer">';
                        let startfooterdiv1 = '<div class="container">';
                        let startfooterdiv2 = '<div class=" mb-5">';
                        let startfooterdiv3 = '<div class="col-md-12 text-center">';
                        let startp = '<p>';
                        let website = '<a href="https://www.facebook.com/americanschoolinlondon" class="social-item"><span class="icon-facebook2"></span></a>';
                        let twitter = '<a href="https://twitter.com/aslnews" class="social-item"><span class="icon-twitter"></span></a>';
                        let instagram = '<a href="https://www.instagram.com/asinlondon/" class="social-item"><span class="icon-instagram2"></span></a>';
                        let endp = '</p>';
                        let enddiv = '</div>';
                        let endfooter = '</footer>';
            
                        document.getElementById('footersectionid').innerHTML = startfooter + startfooterdiv1 + startfooterdiv2 + startfooterdiv3 + startp + website + twitter + instagram + endp + enddiv + enddiv + enddiv + endfooter + "<br>" + "<br>" + "<br>";
            
                    }
                })
                document.getElementById('artcontent').innerHTML = document.getElementById('artcontent').innerHTML + "<br><br>";
                document.getElementById('artcontent').id = 'oldartcontent';
            })
        });

    console.log('authenitcated: ' + authenticated);

    let authorizeddiv = document.getElementById('forauthorized');
    if (authenticated && teacher){
       authorizeddiv.style.display = "block";
    }
    else {
        authorizeddiv.style.display = "none";
    }

    function uploadfunction(){
        location.replace("./inputpage.html");
    }

    function neweittorfunction(){
        console.log("auofh");
        location.replace("./addeditors.html");
    }

    function deleteartfunction(){
        location.replace("./deleteart.html");
    }
    
    let uploadbutton = document.getElementById("uploadnewworkbutton");
    uploadbutton.addEventListener('click', uploadfunction);

    let neweditorbutton = document.getElementById("addneweditorsbutton");
    neweditorbutton.addEventListener('click', neweittorfunction);

    let deleteartbutton = document.getElementById("deleteartbutton");
    deleteartbutton.addEventListener('click', deleteartfunction);
    });

});

setInterval(function(){ 

    let images = document.getElementsByClassName("image")
    for (const element of images){
        element.addEventListener('click', function(){
            console.log(element.currentSrc);
            window.open(element.currentSrc);
        });
    }
}, 3000);

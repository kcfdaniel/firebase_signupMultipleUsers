var firebase = require("firebase");
var readline = require('readline');
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXQOZzDj0f0aKEfsJttURjfYivkEs9OBo",
  authDomain: "nutrition-99253.firebaseapp.com",
  databaseURL: "https://nutrition-99253.firebaseio.com",
  projectId: "nutrition-99253",
  storageBucket: "nutrition-99253.appspot.com",
  messagingSenderId: "384430181305"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true})

const data = require("./families_data.json");

async function signUpMultipleUsers(){
  var email = ""
  var password = ""
  var progress = 0
  var numberOfAccounts = Object.keys(data["families"]).length

  var count = 0
  for ( id in data["families"]){
    email = data["families"][id]["email"]
    password = data["families"][id]["password"]

    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    })

    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);
    count = count + 1
    progress = count/numberOfAccounts * 100
    process.stdout.write(Math.round(progress) + "%");
  }
  return
}

signUpMultipleUsers().then(() => {
  console.log("")
  console.log("done")
})
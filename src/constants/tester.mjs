//import {doSignInWithEmailAndPassword} from "./auth";
//import {tryMe, signUp, addPerson, signIn, addFather, addMother,displayFam,editMe} from "./functions";
//import * as oof from "./functions";
import {auth, db, firebase, store} from "./firebase";
import {read, write,logIn, signUp,whoAmI} from "./people";
import Person from "./people";
//signUp("Stephanie","haineko2@gmail.com","fml1234!");
//signUp("Jonathan","blah@gmail.com","oof12345");
//doSignInWithEmailAndPassword("whoopee@gmail.com","oof12345") .then(function(user) {
  //  console.log(user);
   // addPerson(user,"Ngoc","Dang","female");
//});

//signIn('myvu@gmail.com',"oof12345");

//
// var userId = "K469jg05DnZHqn8yzp1Ucghc12n2";
// editMe(userId,0,'Firstname','Joanne');
// var blah  = signIn("whoopee@gmail.com","oof12345");
// var oldLog = console.log;
// console.log(blah);
// console.log("hellO"  + blah);
// addPerson(userId,"Ngoc","Dang","female");
// addFather(userId,"Pat","Van",0);
// addMother(userId,"Ngoc","Dang",0);
// addMother(userId,"Ama","Van",1);
// displayFam(userId,0);
logIn("haineko2@gmail.com","fml1234!");
var holder = {};

auth.onAuthStateChanged(function(user) {
    if (user) {
        // console.log(firebase.auth().currentUser);
        console.log("Logged");
        // console.log(user);
        // console.log("Before" + Object.keys(holder).length)
        holder = read();
        console.log(holder);
        console.log("Oof");
        var results1 = holder.then(function(results){
         //   console.log("HELLO" + results[0].email);
            //const mother = new Person(1,results,"Lindsey");
            //results[0].setAsMother(mother);
        //    console.log(results[0].mother.name);
        //     console.log(Object.keys(results).length);
        //     for(var eh = 0; eh<Object.keys(results).length; eh++){
        //         console.log(results[eh].name);
        //     }
        //     return results;
            console.log("meanwhile inside");
            console.log(results);

        });
         // results1.then(function(eh){
         //     //console.log("eh length " + Object.keys(eh).length +  " " + eh[0].mother.name);
         //     //write(eh);
         //     eh[1].remove(eh);
         // });
       // console.log("This is the holder is " + holder.toString());
        // console.log("After: " + Object.keys(holder).length)


    } else {
        // console.log("Nothing");
    }
});

// var ref = store.collection('users').doc('myvu@gmail.com');
// var getDoc = ref.get()
//     .then(doc => {
//         if (!doc.exists) {
//             console.log('No such document!');
//         } else {
//             console.log('Document data:', doc.data()['people']);
//             return doc.data()['people'];
//         }
//     })
//     .catch(err => {
//         console.log('Error getting document', err);
//     });
//
// getDoc.then(function(result){
//     console.log("Oof " + result[0].name);
// });
//
// //holder[0].setAsMother(mother);
// console.log("This is the length of the returned " + holder.length);
//console.log(auth);
//write(holder);




//console.log(tryMe());
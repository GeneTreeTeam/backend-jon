import {auth, db, firebase} from './firebase';
import {doSignInWithEmailAndPassword} from "./auth";

export const tryMe = () => {
    const aTuringRef = db.ref();

    const setAlan = aTuringRef.child('user').set({
        'first': 'Alan',
        'middle': 'Mathison',
        'last': 'Turing',
        'born': 1912
    });
}
function delay() {
    // `delay` returns a promise
    return new Promise(function(resolve, reject) {
        // Only `delay` is able to resolve or reject the promise
        setTimeout(function() {
            resolve(42); // After 3 seconds, resolve the promise with value 42
        }, 3000);
    });
}
export const signUp = (email, password, first, last, gender) => {
    auth.createUserWithEmailAndPassword(email, password) .then(function(user){
        var root = db.ref();
        var uid = user.user.uid;
        console.log(uid);
        console.log("FML" + user.user.uid);
        var postData = {
            Firstname: first,
            Lastname: last,
            email: email,
            gender: gender
        };
    const aTuringRef = db.ref();
    console.log("Hello" + user.userId);
    //aTuringRef.child('user').child(first+ " "+ last).set(postData);
    console.log("It made me. WHATS GOING ON");
    root.child("Users").child(uid).child(0).set(postData);
});
}
export const signIn = (email,pass) =>{
    var itsMe;
    doSignInWithEmailAndPassword(email,pass).then(function(user) {
        console.log(user.user.uid);
        itsMe = user.user.uid;
        return itsMe;
    });
}
export const addPerson = (user,first,last,gender) => {
    var postData = {
        Firstname: first,
        Lastname: last,
        gender: gender
    };
    let num;

    db.ref().child("Users").child(user).child(0).once("value", function(snapshot) {
        console.log("Oof" + snapshot.numChildren());
        num = snapshot.numChildren();

        db.ref().child("Users").child(user).once("value",function(snapchat){
            db.ref().child("Users").child(user).child(snapchat.numChildren()).set(postData);
            console.log(snapchat.numChildren());
            return snapchat.numChildren();
        });

    });

    //db.ref(db.ref().child("Users").child(user).child()
   // console.log("We're going to add a user to this guy: " + theName);
}
export function addMother(user, first, last,position) {
    delay();
    var postData = {
        Firstname: first,
        Lastname: last,
        gender: 'female'
    };

    var relate = db.ref().child("Users").child(user).child(0).once("value", function(snapshot) {
        console.log("Oof" + snapshot.numChildren());

        var num = db.ref().child("Users").child(user).once("value",function(snapchat){
            db.ref().child("Users").child(user).child(snapchat.numChildren()).set(postData);
            console.log(snapchat.numChildren());

            db.ref().child("Users").child(user).child(position).child('mother').set(snapchat.numChildren());
        });
    });


}
export const removeFather = (user,position) =>{

}
export function addFather(user, first, last,position)  {
    delay();
    var postData = {
        Firstname: first,
        Lastname: last,
        gender: 'male'
    };

   var relate = db.ref().child("Users").child(user).child(0).once("value", function(snapshot) {
        console.log("Oof" + snapshot.numChildren());

        var num = db.ref().child("Users").child(user).once("value",function(snapchat){
            db.ref().child("Users").child(user).child(snapchat.numChildren()).set(postData);
            console.log(snapchat.numChildren());

            db.ref().child("Users").child(user).child(position).child('father').set(snapchat.numChildren());
        });
    });

}
export const getFamilyMembers = (user) => {

}
export const displayFam = (user,position) => {
    var relate = db.ref().child("Users").child(user).once("value", function(snapshot) {
        snapshot.forEach(function(item){
            var itemVal = item.val();
            getFamilyMembers(snapshot.forEach(),position);
            if (itemVal.mother != null) {
                displayFam(user, itemVal.mother);
                console.log(itemVal.Firstname + "'s mother is " + itemVal.mother);
            }
            else {
                console.log(itemVal.Firstname + " has no mother.");
            }
            if(itemVal.father != null){
                displayFam(user,itemVal.father);
                console.log(itemVal.Firstname + "'s father is " + itemVal.father);
            }
            else{
                console.log(itemVal.Firstname + " has no father.");
            }

        });
        console.log(snapshot.numChildren());
    });
}
export const editMe = (user, position, variable, newInfo) =>{
    db.ref().child("Users").child(user).child(position).child(variable).set(newInfo);
}
function userNameGet(user) {
    var theName;
    var data = [];
    var retri = function()
    {
        db.ref().child("Users").child(user).child(0).on("value", function(snapshot) {
        console.log(snapshot.val().Firstname);
        snapshot.val().forEach((u, key) => {
                // u contains your user data object which is like u.uid and u.email or whatever keys you got.
                console.log(key, 'key here contains the strange "firebase array index key"');
                console.log(u);
            });
        Object.keys(snapshot.val()).forEach(function(key, index){
                // Create object at data[index].
            console.log(key);
            data[index].id = key;
            });
        });
        throw new Error('Failed');
    }

    Promise.resolve(retri).then(function() {
        console.log(theName);
        return theName;
    })
}

import {auth,firebase} from "./firebase2";
import Person from "./people";

function user() {
    return auth.currentUser;
}
function db() {
    return firebase.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}
export const read = () => {   //assuming already logged in
    return entry().get().then(function(doc) {
        var people = {};
        var id = 0;
        for (var pinfo in doc.data().people) {
            people[id] = Person(people, pinfo.name, pinfo.email, id);
            id++;
        }
        var relationships = []
        for (var rinfo in doc.data().relationships) {
            switch(rinfo.type) {
                case 'mother':
                    people[rinfo.child].setMother(people[rinfo.parent]);
                    break;
                case 'father':
                    people[rinfo.child].setFather(people[rinfo.parent]);
                    break;
                default:
                    console.warn('Unrecognized relationship: '+rinfo.type);
            }
        }
        return people;
    })
}


//Function to create new user who is member (non memebers created using addChild)
export const signUp = (username, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password);
    // console.log("It made me.")
    var ppl = {};
    ppl[0] = {name: username, email: email};
    db().doc(email).set({
        people: ppl,
        relationships: {}
    });
}

export const logIn = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);


export const logOut = () =>
    firebase.auth().signOut();

// Function to reset password if forgotten
export const pwdReset = (email) =>
    firebase.auth().sendPasswordResetEmail(email);

// Function to change password assuming logged in
export const pwdChange = (password) =>
    user().updatePassword(password);

//Write member info to database
export const write = (people) => {
    var rels = {};
    var ppl = {};
    for (var person in people) {
        var mother = person.getMother();
        if (mother) { //if has mother
            relate(i, 'mother', person.getID(), mother.getID(), rels);
        }
        var father = person.getFather();
        if (father) { //if has a father
            relate(i, 'father', person.getID(), father.getID(), rels);
        }
        for (var child in person.getChildren()) {
            if (child.getMother() === person) { // if is mother
                relate('mother', child.getID(), person.getID(), rels);
            } else if (child.getFather() === person) { // if is father
                relate('father', child.getID(), person.getID(), rels);
            }
        }
        ppl[person.id] = {name: person.name, email: person.email};
    }
    entry().set({people: ppl, relationships: rels});
};

//stores type of relationship
const relate = (type, childID, parentID, rels) => {
    var key = relationKeyGen(type, childID, parentID);
    if (!(key in rels)) {
        rels[key] = {type: type, child: childID, parent: parentID};
    }
};

//determines relationship
const relationKeyGen = (type, childID, parentID) => {
    return `{type}:{childID}:{parentID}`;
};
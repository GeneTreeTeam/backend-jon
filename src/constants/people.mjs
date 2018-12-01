import {auth, firebase} from './firebase'
import {doSignInWithEmailAndPassword} from "./auth";
// Frontend uses JS instead of JSON now
// id:user_email
// |-people
// | |-id:0
// | | |name:user_name
// | | |email:user_email
// | |-id:mother_id
// | | |-name:mother_name
// | |-id:father_id
// | | |-name:father_name
// | |-id:sibling_id
// |   |-sibling_name
// |-relationships
//   |-id:r1_id
//   | |-type:'mother'
//   | |-child:0
//   | |-parent:mother_id
//   |-id:r2_id
//   | |-type:'father'
//   | |-child:0
//   | |-parent:father_id
//   |-id:r1_id
//   | |-type:'mother'
//   | |-child:sibling_id
//   | |-parent:mother_id
//   |-id:r1_id
//     |-type:'father'
//     |-child:sibling_id
//     |-parent:father_id


function user() {
    console.log("What:" + auth.currentUser.email);
    return auth.currentUser;
}
function db() {
    return firebase.firestore().collection('users');
}
function entry() {
    return db().doc(user().email);
}


export default class Person {
    constructor(id, people, name,email="" ) { //id supplied must be unique
        this.mother = null;
        this.father = null;
        this.children = [];
        this.name = name;
        this.email = email;
        this.id = id;
        this.self = this;
        people[this.id] = this;
    }
    static class(theList, obj) {
        var holder = new Person(theList,obj.name,obj.email,obj.id);
        if (obj.mother != null){
            holder.setAsMother(obj.mother);
        }
        if (obj.father != null){
            holder.setAsFather(obj.mother);
        }
        for (var child in obj.children){
            holder.addChild(child)
        }
        return holder;
    }
    getMother() {
        return this.mother;
    }
    getFather() {
        return this.father;
    }
    getChildren() {
        return this.children;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getID() {
        return this.id;
    }

    //set relationships

    setMother(mother) {
        if (this.mother !== mother) {
            if (this.mother) {
                this.mother.removeChild(this);
            }
            if (mother) {
                mother.addChild(this);
            }
            this.mother = mother;
        }
    }
    setFather(father) {
        if (this.father !== father) {
            if (this.father) {
                this.father.removeChild(this);
            }
            if (father) {
                father.addChild(this);
            }
            this.father = father;
        }
    }
    setAsMother(child) {
      //  console.log("eek");
        this.setMother(child);
    }
    setAsFather(child) {
        this.setFather(child);
    }
    toString()
    {
        return this.getName() + " " + this.getEmail() + " " + this.getID();
    }
    //Remove this Person from all relationships(via children) AND database.
    remove(people) {    //delete person
        console.log(this.name);
        //console.log(this.children.length);
        console.log(this.children[0]);
        for (var child in this.children) {
            console.log("Hello" + child);
            if (child.getMother() === this) {
                child.setMother(null);
            } else if (child.getFather() === this) {
                child.setFather(null);
            }
        }

        this.mother.removeChild(this);
        this.father.removeChild(this);

        if (people) {
            people.remove(this.id);
        }
    }

    //Only creates child does not set relationship (external use complex so avoid)
    addChild(child) {
        for (var c in this.children) {
            if (c === child) {  //checks existing children for duplicacy
                return false;
            }
        }
        this.children.push(child);
        return true;
    }
    removeChild(child) {
        for (var i = 0; i < this.children.length; i ++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return true;
            }
        }
        return false; //child not found
    }
};

export const read = () => {   //assuming already logged in
    var people = {};
    var state = {};
    var returns = entry().get().then(function(doc) {
        //console.log(doc.data().length);
        people = doc.data().model;
        return people;
   //     var people = {};
   //      var id = 0;
   //      for (var pinfo in doc.data().people) {
   //          console.log(pinfo);
   //          people[id] = new Person(id, people, doc.data().people[pinfo].name, doc.data().people[pinfo].email);
   //          id++;
   //      }
   //      var relationships = []
   //      for (var rinfo in doc.data().relationships) {
   //          console.log("rinfo " + rinfo);
   //          var bond = doc.data().relationships[rinfo];
   //          switch(bond.type) {
   //              case 'mother':
   //                  people[bond.child].setMother(people[bond.parent]);
   //                  break;
   //              case 'father':
   //                  people[bond.child].setFather(people[bond.parent]);
   //                  break;
   //              default:
   //                  console.warn('Unrecognized relationship: '+bond.type);
   //          }
   //      }
   //      console.log("heheheheh" + Object.keys(people).length);
   //      // console.log("ID Out: " + id);
   //      // console.log(people);
   //      // console.log("ID: " + id);
   //      // console.log("Inside person" + Object.keys(people).length);
   //      return people;

    });
    //console.log("its me" + returns);
    return returns;
};


//Function to create new user who is member (non memebers created using addChild)
export const signUp = (username, email, password) => {
    auth.createUserWithEmailAndPassword(email, password);
    console.log("It made me. WHATS GOING ON")
    var ppl = {};
    ppl[0] = {name: username, email: email};
    console.log(username);
    console.log(email);
    var state = {
        model: {
            nodeDataArray: [
                {
                    key:"node0",label:username,color:"red"
                }
            ],
            linkDataArray: []
        }
    };
    console.log("Hi" + Object.keys(state).length);
    db().doc(email).set({
        state,
    });
    console.log("Did I do it");
}

export const logIn = (email, password) => {
    //console.log(firebase.auth());
    doSignInWithEmailAndPassword(email,password);
   // console.log(firebase.auth());
};
export const whoAmI = () =>
    console.log(firebase.auth().currentUser);

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
    entry().set(people);
    // var rels = {};
    // var ppl = {};
    // console.log(Object.keys(rels).length);
    // console.log(Object.keys(people).length);
    // var i = 0;
    // for (var person in people) {
    //     var persons = people[person];
    //     console.log(persons.name);
    //   //  var persons  = Person.class(people,person);
    //     var mother = persons.getMother();
    //     if (mother) { //if has mother
    //         console.log("Imma do it " + typeof(rels));
    //         var key = relationKeyGen( 'mother', persons.getID(), mother.getID(), rels);
    //         if (!(key in rels)) {
    //             rels[key] = {type: 'mother', child: persons.getID(), parent: mother.getID()};
    //         }
    //         i = i+1;
    //     }
    //     var father = persons.getFather();
    //     if (father) { //if has a father
    //         relate(i, 'father', persons.getID(), father.getID(), rels);
    //         i = i +1;
    //     }
    //     console.log("oof" + persons.getChildren().length);
    //     if(persons.getChildren().length > 0) {
    //         console.log(persons.name + 'has this many children' + persons.getChildren().length);
    //         for (var o = 0; o < persons.getChildren().length; o++) {
    //             var child = persons.getChildren()[o];
    //             if (child.getMother() === persons) { // if is mother
    //                 relate('mother', child.getID(), persons.getID(), rels);
    //             } else if (child.getFather() === person) { // if is father
    //                 relate('father', child.getID(), persons.getID(), rels);
    //             }
    //         }
    //     }
    //     ppl[persons.id] = {name: persons.name, email: persons.email};
    // }
    // entry().set({people: ppl, relationships: rels});
};

//stores type of relationship
const relate = (type, childID, parentID, rels) => {
    console.log("The log" + rels + " " + typeof(rels));
    var key = relationKeyGen(type, childID, parentID);
    console.log(key + " KEY");
    if (!(key in rels)) {
        rels[key] = {type: type, child: childID, parent: parentID};
    }
};

//determines relationship
const relationKeyGen = (type, childID, parentID) => {
    return '{'+ type +'}:{'+childID+'}:{'+parentID+'}';
};
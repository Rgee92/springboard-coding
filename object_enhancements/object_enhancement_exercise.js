// Object Enhancement Exercise

//Same keys and values
function createInstructor(firstName, lastName){
  return {
    firstName: firstName,
    lastName: lastName
  }
}

// Same keys and values ES2015
/* Write an ES2015 Version */
function createInstructor(firstName, lastName) {
    return {
        firstName,
        lastName
    };
}

// Computed Property Names
var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!";

/* Write an ES2015 Version */
let favoriteNumber = 42;

const instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite!"
};

// Object Methods
var instructor = {
    firstName: "Colt",
    sayHi: function(){
      return "Hi!";
    },
    sayBye: function(){
      return this.firstName " + "says bye!";
    }
};

/* Write an ES2015 Version */
const instructor = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return this.firstName + " says bye!;
    }
};

//createAnimal function
// Write a function which generates an animal object. The function should accept 3 arguments:
// Species, verb, noise

/* Write an ES2015 Version */
function createAnimal(species, verb, noise) {
    return {
        species,
        [verb]() {
            return noise;
        }
    }
}

const c = createAnimal("cat", "purr", "meow");
const d = createAnimal("dog", "bark", "woof");
const f = createAnimal("frog", "jump", "ribbet");
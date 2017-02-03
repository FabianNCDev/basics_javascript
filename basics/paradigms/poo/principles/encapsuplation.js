// object represent the typical expression of 'encapsulation'
// that is the ability to concentrate both data(properties) and
//and functions (methods), hidden internal details
// this feature, is called 'information hidding principle'.

// If we need to get a sorted list of employees
// We do not need to know how this method works

var company = {
  name: 'ACME INC.',
  employees: [],
  sortEmployeesByName: function () {}
};


// two reason to hidding internal details
// 1.simplify an understandable way to use an object with out need it complexity
// 2.to simplify change management

// however when internal details implmentation depends on publicly accesible properties
// we risk to to frustate the effort of hidden internal behaviour
company.employees = 'this is a joke!';
company.sortEmployeesByName();

// a general approach to prevent relevant properties direct access is to replace with methods
function Company(name) {
  this.name = name;
  var employees = [];

  this.getEmployees = function () {
    return employees;
  }

  this.addEmployee = function (employee) {
    employees.push(employee);
  }

  this.sortEmployeesByName = function () {
    // algorithm to sort
  };
}

var company = new Company('ACME INC.');

/*Convention-based approach*/

// information hidding principle enforces the design objecto to have at leats to parts:
// public part and private one
// other Object Oriented programming provides specif keywords such as
// public and private(access modifiers) to allow the hidden principle
// JS objects do not care about privacy. All the properties and methods are public

function TheatreSeats() {
  this._seats = [];
}

TheatreSeats.prototype.placePerson = function (person) {
  this._seats.push(person);
};

TheatreSeats.prototype.showPersons = function () {
  return this._seats;
};

var theatreSeats = new TheatreSeats();
theatreSeats.placePerson({name:'Fabian',surname:'Jesus'});
theatreSeats.placePerson({name:'Isaac',surname:'Delahaye'});
console.log(theatreSeats.showPersons());

// The internal details are not really hidden and privacy is based on the developer's willingness

/*Privacy levels using closure*/
// A simple way to fix the inconsistencies of the convention-based approach is not using
// properties for internal members but declaring variables inside the constructor

function theatreSeats() {
  var seats = [];

  this.placePerson = function (person) {
    seats.push(person);
  };

}

/* Scope and closure*/
// a variable or argument has a visibility scope that is a context inside which it is accessible.
// Each function creates its own scope,
// variables, parameters, or functions defined inside the body of a function
// are not accessible by code outside its body

/*scope chain*/
// scopes are like nested containers where the inner container can access the
// outer container, but not vice versa

var greeting = 'Good Morning';

function greets(person) {
  var fullname = person.name + ' ' + person.surname;

  function displayGreeting() {
    console.log(greeting + ' ' + fullname);
  }

  displayGreeting();
}

greets({name: 'Fabian', surname: 'Jesus'});

// when a statement refers to a variable, it is searched in the current scope, if
// it is not found, it is searched in the outer scope and so on until it is
// found or the global scope is reached.

// it is possible to access the outer scope even when the function that created it has terminated

var greeting = 'Good morning';
var displayGreeting;

function greets(person) {
  var fullname = person.name + ' ' + person.surname;

  return function () {
    console.log(greeting + fullname);
  }
}

displayGreeting = greets({name: 'Fabian', surname: 'Jesus'});
displayGreeting();

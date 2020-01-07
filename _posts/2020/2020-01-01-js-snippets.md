---
layout: post
title:	"js snippets!"
date:	2020-01-01 12:00:00
categories:
    - blog
tags:
    - javascript
    - tips
---

### null

### undefined
A variable is undefined, means, it's not yet declared or assigned any value.
```js
typeof somethingUndefined; // is 'undefined'
```

#### Object
~~~js
var obj_1 = new Object();
// another way.
var obj_2 = {}; // an empty object.
var obj_3 = {
    firstName: "Java",
    secondName: "Script"
};

// Accessing the object.
obj_3.firstName;
obj_3["firstName"];

var key = "firstName";
obj_3[key]; // obj_3.key -> Undefined.

// Keys array
Object.keys(obj_3);

// Values array
Object.values(obj_3);

// Date
var today = new Date(); // Today's date.

// window 
console.log(window);
window.myName = "This is not a good procedure!";
~~~

#### Array
~~~js
var arr = [];

// array of strings
var list = ["one", "two", "three"];

list.length; // 3

list[0]; // "one"
list[4]; // undefined

list.indexOf('one'); // 0

list[0] = "Updated"; // list -> ["Updated", "two", "three"]

list.push("end_of_array");

list.unshift("add_first_item_in_array");

// remove the last item from array
list.pop();

// remove the first item
list.shift();

// remove item in between.
list.splice(1, 1); // (start, delete_count).
~~~

#### Data type conversion
~~~js
var val = '123';
parseInt(val); // string to int

val = '3.14';
parseFloat(val); // string to float

val = 'string to be converted';
parseInt(val); // NaN - Not a number.
~~~

#### String
~~~js
var strng = 'This is a string to find index of a';
strng.indexOf('a');

var strng = 'This is a string to find index of a';
strng.indexOf('zam'); // -1

strng.toUpperCase();
strng.toLowerCase();

strng.replace('a', '999'); // replace 'a' with '999'
~~~

#### Comparison
~~~js
console.log(0 != '0'); // false. Doesn't check data type.
console.log(0 !== '0'); // true. Check the data type.
~~~

#### Functions
> * arrow functions
> * `'use strict'`

#### Function binding
~~~js
var person = {
    firstName: "Hello",
    lastName: "World"
};

// Bind function to 'person' object
var func_1 = function(){
    'use strict';
    return this.firstName;
}.bind(person);

func_1(); // "Hello"
~~~
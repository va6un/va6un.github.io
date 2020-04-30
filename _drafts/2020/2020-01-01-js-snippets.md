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
    firstName: "Tom",
    lastName: "Jerry"
};

// Bind the 'person' object to this function.
// we can use the 'person' object inside this function.
var func_1 = function(){
    'use strict';
    return this.firstName;
}.bind(person);

func_1(); // "Tom"
~~~

#### Arrow Function
~~~js
var func_2 = () => {
    console.log("This is an Arrow function!");
}
~~~

#### Condition
~~~js
var a = 10;
var b = 9;
a > b ? console.log("a is greater") : console.log("a is less!");
~~~

#### Loop
~~~js
var list = ["apple", "banana", "carrot"];
var list = ["apple", "banana", "carrot"];

// foreach()
list.forEach(function(item, index){
    console.log(index, " : ", item);
});

// arrow function
list.forEach((item, index) => {
    console.log(index, " : ", item);
});

// for()
for(var index = 0; index < list.length; index++){
    console.log(index, " :", list[index]);
}
~~~

#### Delay
~~~js
var printFile = function(){
    setTimeout(function(){
        console.log("File is printed!");
    }, 3000);
}
printFile();
~~~

#### Sync
~~~js
var printFile = function(){
    setTimeout(function(){
        return("File is printed!");
    }, 3000);
}
var job = printFile();
console.log(job);
/*
what we desired is that, console.log(job) should print 'File is printed!' after 
3 sec. But the js code is syn:, so it will immediately return 'undefined', as there is no return value.
But actually the printFile() returns value only after 3 sec.
*/
~~~

#### Promise
~~~js
new Promise(function(resolve, reject){
    resolve(value); // success
    reject(error_message); // failure
});
~~~

~~~js
var printFile = function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("File is printed!"); // success
            // reject("Fail"); // Failure
        }, 3000);
    });
};

printFile().then(function(result){
    console.log(result);
}).catch(function(error){
    console.log(error);
});

// chain
printFile().then(function(result){
    console.log(result);
    printFile().then(function(result){
        console.log(result);
    }).catch();
}).catch();
~~~

#### async
~~~js
var printFile = function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("File is printed!"); // success
            // reject("Fail"); // Failure
        }, 3000);
    });
};

var asyncAwai = async function(){
    var job_1 = await printFile();
    console.log(job_1);

    var job_2 = await printFile();
    console.log(job_2);
};

asyncAwai(); // prints out 2 messages after 3 sec interval.
~~~

~~~js
// Fail
var printFile = function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            //resolve("File is printed!"); // success
            reject("Fail"); // Failure
        }, 3000);
    });
};

var asyncAwai = async function(){
    try{
        var job_1 = await printFile();
        console.log(job_1);

        var job_2 = await printFile();
        console.log(job_2);
    }catch(err){
        console.log(err);
    }
};

asyncAwai(); // prints out 'Fail' after 3 sec.
~~~

#### Events
~~~html
<div onMouseOver="ev_on_mouse_over()">This is a div!</div>
<button onClick="ev_on_button_click()">Submit</button>

<script>
ev_on_mouse_over = function(event){
    console.log("Mouse OVer!");
}
</script>
~~~

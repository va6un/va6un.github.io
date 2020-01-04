---
layout: post
title:	"smart-forms"
date:	2020-01-03 12:00:00
categories:
    - blog
tags:
    - sap
    - smart-forms
---

Transaction code for smart-forms is `smartforms`. 

Form Interface: In Form-Interface -> `Tables`, we declare the internal tables 
that we need to import.

~~~abap
IT_TAB - LIKE - Associated_Type
~~~

Global Definitions: In Global-Definitions -> `Global Data`, we declare the variables 
we need inside the smart form.

~~~
WA_WORKAREA - LIKE - Associated_Type
~~~

* To create a `Table`, right click MAIN Window and create. In the `Data` tab set the corresponding 
internal table and workarea associated with the table.
* Create `Table Line` for Header and Main Area as needed. Also select the `line type`.
* Turn on `Field List` by clicking on the icon.
* In General Attributes, set the variable name as `&WA_WORKAREA-FIELD_NAME`.


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

* Logo - `SE78` -> Import BMP.
* To find the fun: module name: Environment -> Function Module Name.

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

##### Driver program
Function module `SSF_FUNCTION_MODULE_NAME`. A sample driver program

~~~abap
"Smart form driver - local variable
DATA: lv_fm_name TYPE rs38l_fnam.

"2. Driver program to print!.
    CALL FUNCTION 'SSF_FUNCTION_MODULE_NAME'
      EXPORTING
        formname           = 'Z2020_PO' "Smart form name.
*       VARIANT            = ' '
*       DIRECT_CALL        = ' '
      IMPORTING
        fm_name            = lv_fm_name
      EXCEPTIONS
        no_form            = 1
        no_function_module = 2
        OTHERS             = 3.
    IF sy-subrc <> 0.
* Implement suitable error handling here
      MESSAGE 'Error in calling ssf_function_module_name fun: module' TYPE 'E'.
    ELSE.
      "Calling the smart-form function module.

      "CALL FUNCTION '/1BCDWB/SF00000644'
      CALL FUNCTION lv_fm_name
*       EXPORTING
*         ARCHIVE_INDEX              =
*         ARCHIVE_INDEX_TAB          =
*         ARCHIVE_PARAMETERS         =
*         CONTROL_PARAMETERS         =
*         MAIL_APPL_OBJ              =
*         MAIL_RECIPIENT             =
*         MAIL_SENDER                =
*         OUTPUT_OPTIONS             =
*         USER_SETTINGS              = 'X'
*       IMPORTING
*         DOCUMENT_OUTPUT_INFO       =
*         JOB_OUTPUT_INFO            =
*         JOB_OUTPUT_OPTIONS         =
        TABLES
          it_po                      = it_po
       EXCEPTIONS
         formatting_error           = 1
         internal_error             = 2
         send_error                 = 3
         user_canceled              = 4
         OTHERS                     = 5
                .
      IF sy-subrc <> 0.
* Implement suitable error handling here
        MESSAGE 'Success in calling function module!!!' TYPE 'S'.
      ENDIF.
    ENDIF.
~~~
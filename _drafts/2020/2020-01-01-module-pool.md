---
layout: post
title:	"pool of modules!"
date:	2020-01-01 12:00:00
categories:
    - blog
tags:
    - sap
    - module pool
    - dialog box
---

> Transaction code for module pool program creation is `SE80`. Select `Program` from the drop down 
and enter the name starting with `SAPMZ`. Check the `TOP Include`.

> Right click the project name to create screen. Set the initial screen number to `9000` and screen type `Normal`. 

> Uncomment and create the `PAI`, `PBO` and `Form` includes.

> Create Transaction code -> Right click the program name, create `Transactions`. Check `Program and screen(Dialog transaction)`. Provide the program name and the initial screen number.

> Demo program `DEMO_DYNPRO_TABCONT_LOOP_AT` - Table control with loop at ITAB.

A sample module pool ...

#### Top
~~~abap
*&---------------------------------------------------------------------*
*& Module Pool       SAPMZ_2020_PO
*&
*&---------------------------------------------------------------------*
*&
*&
*&---------------------------------------------------------------------*


INCLUDE mz_2020_potop                           .  " global Data
INCLUDE mz_2020_poo01                           .  " PBO-Modules
INCLUDE mz_2020_poi01                           .  " PAI-Modules
INCLUDE mz_2020_pof01                           .  " FORM-Routines
~~~

##### Global Data
~~~abap
*&---------------------------------------------------------------------*
*& Include MZ_2020_POTOP                                     Module Pool      SAPMZ_2020_PO
*&
*&---------------------------------------------------------------------*

PROGRAM  sapmz_2020_po.

CONTROLS pi_tab_ctrl TYPE TABLEVIEW USING SCREEN 9001.

DATA: ok_code TYPE sy-ucomm,
      save_ok TYPE sy-ucomm.

" 'lv_sub_*' variable for screen number with type 'SY-DYNNR'
DATA: lv_sub_screen_purchase_item TYPE sy-dynnr VALUE '9002'.
DATA: lv_sub_screen_print         TYPE sy-dynnr VALUE '9002'.

" internal table and workarea for table control - 'pi_tab_ctrl'
DATA: it_p_items TYPE TABLE OF z2020_p_items,
      wa_p_items LIKE LINE OF it_p_items.

" internal table and workarea for Purchase Order fields
DATA: it_po TYPE TABLE OF z2020_po,
      wa_po LIKE LINE OF it_po.

" generated serial number for purchase order number and items.
DATA: gen_po_number TYPE z2020_po-po_no,
      gen_p_items_number TYPE z2020_p_items-po_no.

" Structure based on material table.
TYPES: BEGIN OF struct_material,
    id       TYPE z2020_material-id,
    unit     TYPE z2020_material-unit,
    plant    TYPE z2020_material-plant,
    location TYPE z2020_material-location,
    price    TYPE z2020_material-price,
    currency TYPE z2020_material-currency,
  END OF struct_material.
" workarea wa_material based on above structure
DATA: wa_material TYPE struct_material.

" Print subscreen PO_NO variable.
DATA: po_no_print TYPE z2020_po-po_no.

"Smart form driver - local variable
DATA: lv_fm_name TYPE rs38l_fnam.
~~~

##### PBO Modules
~~~~abap
*&---------------------------------------------------------------------*
*&  Include           MZ_2020_POO01
*&---------------------------------------------------------------------*
*&---------------------------------------------------------------------*
*&      Module  STATUS_9000  OUTPUT
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
MODULE status_9000 OUTPUT.
  SET PF-STATUS 'STATUS_9000'.
  SET TITLEBAR  'TITLE_9000'.

  " Task - 1, 2
  " 1. Generate number and set it as purchase order number.
  CALL FUNCTION 'NUMBER_GET_NEXT'
    EXPORTING
      nr_range_nr             = '1' " Eg: 1, 2, ...
      object                  = 'Z20_PUR' " Object name
*     QUANTITY                = '1'
*     SUBOBJECT               = ' '
*     TOYEAR                  = '0000'
*     IGNORE_BUFFER           = ' '
    IMPORTING
      number                  = gen_po_number
*     QUANTITY                =
*     RETURNCODE              =
    EXCEPTIONS
      interval_not_found      = 1
      number_range_not_intern = 2
      object_not_found        = 3
      quantity_is_0           = 4
      quantity_is_not_1       = 5
      interval_overflow       = 6
      buffer_overflow         = 7
      OTHERS                  = 8.
  IF sy-subrc <> 0.
    MESSAGE 'Error in generating number - purchase order number!' TYPE 'E'.
  ELSE.
    wa_po-po_no = gen_po_number. " assigning it to the workarea field.
  ENDIF.

  " 2. Set the create name and create date for purchase order.
  wa_po-creat_date = sy-datum.
  wa_po-creat_by   = sy-uname.

ENDMODULE.                 " STATUS_9000  OUTPUT
*&---------------------------------------------------------------------*
*&      Module  STATUS_9003  OUTPUT
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
module STATUS_9003 output.
*  SET PF-STATUS 'STATUS_9003'.
*  SET TITLEBAR 'TITLE_9003'.

endmodule.                 " STATUS_9003  OUTPUT
~~~

#### PAI Modules
~~~~abap
*&---------------------------------------------------------------------*
*&  Include           MZ_2020_POI01
*&---------------------------------------------------------------------*
*&---------------------------------------------------------------------*
*&      Module  USER_COMMAND_9000  INPUT
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
MODULE user_command_9000 INPUT.
  save_ok = ok_code.
  CLEAR ok_code.
  CASE sy-ucomm.
      "CASE save_ok.
    WHEN 'FCODE_PB_DIS_PI_TAB'.
      lv_sub_screen_purchase_item = '9001'.
    WHEN 'PRINT'.
      PERFORM display_print_subscreen.
  ENDCASE.
ENDMODULE.                 " USER_COMMAND_9000  INPUT
*&---------------------------------------------------------------------*
*&      Module  READ_PURCHASE_ITEMS_TAB_CTRL  INPUT
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
MODULE read_purchase_items_tab_ctrl INPUT.
  " Tasks 1, 2, 3
  " 1. set the purchase order number, which is already generated.
  wa_p_items-po_no = gen_po_number.

  " 2. Generate serial number for 'items number'
  CALL FUNCTION 'NUMBER_GET_NEXT'
    EXPORTING
      nr_range_nr             = '2'
      object                  = 'Z20_PUR'
*     QUANTITY                = '1'
*     SUBOBJECT               = ' '
*     TOYEAR                  = '0000'
*     IGNORE_BUFFER           = ' '
    IMPORTING
      number                  = gen_p_items_number
*     QUANTITY                =
*     RETURNCODE              =
    EXCEPTIONS
      interval_not_found      = 1
      number_range_not_intern = 2
      object_not_found        = 3
      quantity_is_0           = 4
      quantity_is_not_1       = 5
      interval_overflow       = 6
      buffer_overflow         = 7
      OTHERS                  = 8.
  IF sy-subrc <> 0.
    MESSAGE 'Error while generating purchase items number!' TYPE 'E'.
  ELSE.
    wa_p_items-item_no = gen_p_items_number.
  ENDIF.

  " 3. Append the workarea 'wa_po_items' to internal table 'it_po_items'
  APPEND wa_p_items TO it_p_items.
ENDMODULE.                 " READ_PURCHASE_ITEMS_TAB_CTRL  INPUT
*&---------------------------------------------------------------------*
*&      Module  USER_COMMAND_9001  INPUT
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
MODULE user_command_9001 INPUT.
  CASE sy-ucomm.
    WHEN 'FCODE_PB_PO_CREATE'.
      PERFORM save_to_db_table.
  ENDCASE.
ENDMODULE.                 " USER_COMMAND_9001  INPUT
*&---------------------------------------------------------------------*
*&      Module  USER_COMMAND_9003  INPUT
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
MODULE user_command_9003 INPUT.
  CASE sy-ucomm.
    WHEN 'FCODE_PB_PRINT'.
      PERFORM driver_for_print.
  ENDCASE.
ENDMODULE.                 " USER_COMMAND_9003  INPUT
~~~


##### Form-Routines
~~~abap
*&---------------------------------------------------------------------*
*&  Include           MZ_2020_POF01
*&---------------------------------------------------------------------*
*&---------------------------------------------------------------------*
*&      Form  SAVE_TO_DB_TABLE
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
*  -->  p1        text
*  <--  p2        text
*----------------------------------------------------------------------*
FORM save_to_db_table .
  "Tasks 1, 2, 3, 4, 5
  "1. Read the fields of purchase order.
  "2. Save it to purchase order table.
  MODIFY z2020_po FROM  wa_po.
  IF sy-subrc NE 0.
    MESSAGE 'Error in modifying z2020_po table' TYPE 'E'.
  ELSE.
    MESSAGE i001(z20_msg_pur) WITH gen_po_number.
    "3. Read the internal table for purchase items and get the material id.
    LOOP AT it_p_items INTO wa_p_items.
      "4. Based on material id, fetch data from material table.
      IF wa_p_items-id IS NOT INITIAL. "Expects a value for wa_p_items-id!
        SELECT SINGLE id unit plant location price currency
          FROM z2020_material
          INTO CORRESPONDING FIELDS OF wa_material
          WHERE id = wa_p_items-id.
        IF sy-subrc EQ 0."DB fetch is success.
          "5. Save everything into purchase items table, with material details and status.
          wa_p_items-unit     = wa_material-unit.
          wa_p_items-price    = wa_material-price.
          wa_p_items-currency  = wa_material-currency.
          wa_p_items-plant    = wa_material-plant.
          wa_p_items-location = wa_material-location.
          MODIFY it_p_items FROM wa_p_items."Modify internal table.
        ELSE. "DB fetch is failure!
          MESSAGE 'Error in database table fetch!' TYPE 'E'.
        ENDIF."DB fetch is success.
      ENDIF."Expects a value for wa_p_items-id!
    ENDLOOP.
    "6. save the items internal table to db table.
    MODIFY z2020_p_items FROM TABLE it_p_items.
    IF sy-subrc NE 0.
      MESSAGE 'Error in modifying z2020_p_items table' TYPE 'E'.
    ELSE.
      MESSAGE s000(z20_msg_pur) WITH wa_p_items-po_no.
    ENDIF.
  ENDIF.

ENDFORM.                    " SAVE_TO_DB_TABLE
*&---------------------------------------------------------------------*
*&      Form  DISPLAY_PRINT_SUBSCREEN
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
*  -->  p1        text
*  <--  p2        text
*----------------------------------------------------------------------*
FORM display_print_subscreen .
  lv_sub_screen_print = '9003'.
ENDFORM.                    " DISPLAY_PRINT_SUBSCREEN
*&---------------------------------------------------------------------*
*&      Form  DRIVER_FOR_PRINT
*&---------------------------------------------------------------------*
*       text
*----------------------------------------------------------------------*
*  -->  p1        text
*  <--  p2        text
*----------------------------------------------------------------------*
FORM driver_for_print.
  "Tasks
  "1. Fetch data from purchase records and save it to workarea.
  SELECT po_no description
    FROM z2020_po
    INTO CORRESPONDING FIELDS OF TABLE it_po
    WHERE po_no = po_no_print.
  IF sy-subrc NE 0.
    MESSAGE 'Error, Fetch failed for table Z2020_PO' TYPE 'E'.
  ELSE.
    MESSAGE 'Success, Fetch success for table Z2020_PO' TYPE 'S'.
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

  ENDIF.
ENDFORM.                    " DRIVER_FOR_PRINT
~~~

##### Screen - 9000
~~~abap

PROCESS BEFORE OUTPUT.
  MODULE status_9000.

  " Calling subscreen 9001 - Purchase Items
  CALL SUBSCREEN sub_pi INCLUDING sy-repid lv_sub_screen_purchase_item.
  " Calling subscreen 9003 - Print
  CALL SUBSCREEN sub_print INCLUDING sy-repid lv_sub_screen_print.

PROCESS AFTER INPUT.

  " Calling subscreen 9001 - Purchase Items
  CALL SUBSCREEN sub_pi.
  " Calling subscreen 9003 - Print
  CALL SUBSCREEN sub_print.

  MODULE user_command_9000.
~~~

##### Screen - 9001
~~~abap
PROCESS BEFORE OUTPUT.
  MODULE status_9001.
  LOOP AT it_p_items INTO wa_p_items WITH CONTROL pi_tab_ctrl.

  ENDLOOP.
*
PROCESS AFTER INPUT.
  LOOP AT it_p_items.
    MODULE read_purchase_items_tab_ctrl.
  ENDLOOP.

  MODULE user_command_9001.
~~~

##### Screen - 9003
~~~abap
PROCESS BEFORE OUTPUT.
* MODULE STATUS_9003.
*
PROCESS AFTER INPUT.
 MODULE USER_COMMAND_9003.
~~~

#### TODO
* Tab!!!
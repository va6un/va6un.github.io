---
layout: post
title:	"Data Migration Techniques"
date:	2020-01-06 12:00:00
categories:
    - blog
tags:
    - sap
    - BAPI
    - Function Modules
    - BDC
    - LSMW
    - Call transaction
    - session
    - SHDB
    - Recordings
---

> 1. BAPI
> 2. LSMW
> 3. BDC 

> * Conversions - Conversion programs are used to transverse the data from file to SAP system.
Conversion programs are BDC,LSMW

#### Function Modules
>  RFC - Remote Function Call
> Tcode `SE37`
> 3 types
>> * Normal Function Modules.
>> * Remote Enabled Function Modules - B/W 2 SAP s/ms FM can be accessed. 
>> * Update Modules - V1 and V2

#### 1. BAPI - Business Application Program Interface

> 3rd party s/m's can access the function module.

> All BAPI's are RFC's and not all RFC's are BAPI's.

> Tcode for BAPI is `BAPI`.

> How to find a BAPI?
>> * Tcode is `BAPI`
>> * Eg: To create bank's, In BAPI -> Alphabetical -> Bank -> `Create`. 

> How to call a BAPI?
>> * Find the function module for the corresponding BAPI.
>> * In SE37, check the function module is working.
>> * Create report program in `SE38` and call the function module.

A sample program to 'create' and 'display' bank!

~~~abap
*&---------------------------------------------------------------------*
*& Report  Z15081947_BAPI_BANK_DETAILS
*&
*&---------------------------------------------------------------------*
*& Create and display bank details.
*&
*&---------------------------------------------------------------------*

REPORT  z15081947_bapi_bank_details.

" BAPI_BANK_CREATE
*"----------------------------------------------------------------------
*"*"Lokale Schnittstelle:
*"  IMPORTING
*"     VALUE(BANK_CTRY) LIKE  BAPI1011_KEY-BANK_CTRY
*"     VALUE(BANK_KEY) LIKE  BAPI1011_KEY-BANK_KEY OPTIONAL
*"     VALUE(BANK_ADDRESS) LIKE  BAPI1011_ADDRESS STRUCTURE
*"        BAPI1011_ADDRESS
*"     VALUE(BANK_METHOD) LIKE  BAPI1011_DETAIL-METHOD OPTIONAL
*"     VALUE(BANK_FORMATTING) LIKE  BAPI1011_DETAIL-FORMATTING OPTIONAL
*"     VALUE(BANK_ADDRESS1) LIKE  BAPIADDR1 STRUCTURE  BAPIADDR1
*"       OPTIONAL
*"     VALUE(I_XUPDATE) TYPE  XFELD DEFAULT 'X'
*"  EXPORTING
*"     VALUE(RETURN) LIKE  BAPIRET2 STRUCTURE  BAPIRET2
*"     VALUE(BANKCOUNTRY) LIKE  BAPI1011_KEY-BANK_CTRY
*"     VALUE(BANKKEY) LIKE  BAPI1011_KEY-BANK_KEY
*"----------------------------------------------------------------------


" Exporting variable declaration " ex_* - exporting!
DATA: ex_bank_key        TYPE bapi1011_key.     " BAPI1011_KEY     - Structure.
DATA: ex_bank_address    TYPE bapi1011_address. " BAPI1011_ADDRESS - Structure.

" Imported variable declaration " im_* - importing!
DATA: im_bank_key TYPE bapi1011_key. " BAPI1011_KEY - Structure.
DATA: im_return   TYPE bapiret2.     " BAPIRET2     - Structure


" Entering new values - ie, creating bank!
ex_bank_address-bank_name = 'Federal Bank'.
ex_bank_address-city      = 'City_Name'.

CALL FUNCTION 'BAPI_BANK_CREATE'
  EXPORTING
    bank_ctry       = 'AD'
    bank_key        = '00700'
    bank_address    = ex_bank_address
*   BANK_METHOD     =
*   BANK_FORMATTING =
*   BANK_ADDRESS1   =
*   I_XUPDATE       = 'X'
  IMPORTING
    return          = im_return
    bankcountry     = im_bank_key-bank_ctry
    bankkey         = im_bank_key-bank_key.


" Need this FM for modifing db table!
CALL FUNCTION 'BAPI_TRANSACTION_COMMIT'.
IF im_return IS INITIAL.
  WRITE 'BANK CREATED'.
ELSE.
  WRITE im_return-message.
ENDIF.

WRITE: /  im_bank_key-bank_ctry,  im_bank_key-bank_key.
ULINE.

* ------------------ Get Bank Details -------------------------------- *

" BAPI_BANK_GETDETAIL
*"----------------------------------------------------------------------
*"*"Lokale Schnittstelle:
*"  IMPORTING
*"     VALUE(BANKCOUNTRY) LIKE  BAPI1011_KEY-BANK_CTRY
*"     VALUE(BANKKEY) LIKE  BAPI1011_KEY-BANK_KEY
*"  EXPORTING
*"     VALUE(BANK_ADDRESS) LIKE  BAPI1011_ADDRESS STRUCTURE
*"        BAPI1011_ADDRESS
*"     VALUE(BANK_DETAIL) LIKE  BAPI1011_DETAIL STRUCTURE
*"        BAPI1011_DETAIL
*"     VALUE(RETURN) LIKE  BAPIRET2 STRUCTURE  BAPIRET2
*"----------------------------------------------------------------------

DATA: wa_1 TYPE bapi1011_address.
DATA: wa_2 TYPE bapi1011_detail.

CALL FUNCTION 'BAPI_BANK_GETDETAIL'
  EXPORTING
    bankcountry  = 'AD'
    bankkey      = '999999'
  IMPORTING
    bank_address = wa_1
    bank_detail  = wa_2
*   RETURN       =
  .

WRITE: / 'Get details from bank' COLOR 5.
WRITE: / 'Bank Name: ', wa_1-bank_name COLOR 4.
WRITE: / 'Date: ', wa_2-creat_date COLOR 4.
~~~

#### 2. LSMW - Legacy System Migration Workbench
> Is a data migration tool.
> Used to upload master data.
> Tcode is `LSMW`

> Create 'Project', 'Subproject' and 'Object'. (Same for all, say Z2020_LSMW).

> Let's upload data for table `BNKA` using TCODE `FI01`.

> * Double click each fields starting with `Maintain Object Attributes`. In the `Object Type and Import Method`, select `Batch Input Recording`. Create recording and enter transaction code `FI01`. 
`Default All`.

> * `Maintain Source Structure` - Create source structure. Save and back.

> * `Maintain Source Field`. `Copy fields` -> `Copy from Data Repository`. Delete un-necessary fields and save.

> * `Maintain Structure Relations`. Save and exit.

> * `Maintain Field Mapping and Conversion Rules`. `Extras -> Auto Field Mapping`. Save and exit.

> * `Maintain Fixed Values, Translations, User-Defined Routines`

> * `Specify files` -> On the PC (frontend) -> Set delimiter. This file is also called `flag file`.

~~~abap
File Name 'Converted Data': Max. 45 Characters. Remaining data saved.

Message no. /SAPDMC/LSMW_OBJ_060028

Diagnosis

Some import interfaces only accept file names (including path) that have a maximum of 45 characters.

System Response

All data except the file name of the converted data is saved.

Procedure

Adjust the file name for the converted data.
~~~


> * `Assign files` -> Execute

> * `Read Data` -> Execute

> * `Display Read Data` -> Execute

> * `Convert Data` -> Execute

> * `Display Converted Data` -> Execute

> * `Create batch Input Session` -> Execute

> * `Generate batch Input folder` -> Check `Keep batch input folder(s)`.

> * `Run batch Input session` -> Select a session -> Process.

#### Recordings


#### 3. BDC - 
> * Used for master data upload.
> * Can write custom programs.

> * `SHDB` - Tcode for creating recordings.
>> * New Recording
>> * Enter the TCODE and start recording.
>> * Save the recording and select the recording,  then click `Program` - which create a report program.
>> * Enter the program name and select `Transfer from Recording` and click `Source code`. This will generate code, which serves as a good starting point.
>> * BDC - 2 methods 
>>> 1. Call transaction
>>>> * Typically for smaller session.
>>>> * Error log is created by user. 
>>>> * Before executing the program as `call transaction`, check `Keep session`.   
>>> 2. Session Methods
>>>> * Can process large volume of data.
>>>> * Auto error log.
>>>> * `PERFORM open_group.` `PERFORM close_group.`
>>>> * Give a session name.
>>>> * To view session enter the transaction code `SM35`, as the session method didn't save data to database table.

#### BDC - program with hardcoded data file path!
~~~abap
REPORT z2020_bdc
       NO STANDARD PAGE HEADING LINE-SIZE 255.

INCLUDE bdcrecx1.

" Structure for 'bank' creation
TYPES: BEGIN OF struct_data,
  banks TYPE bnka-banks,
  bankl TYPE bnka-bankl,
  banka TYPE bnka-banka,
  stras TYPE bnka-stras,
  ort01 TYPE bnka-ort01,
  brnch TYPE bnka-brnch,
  END OF struct_data.

" Creating internal table and workarea with structure 'struct_data'
DATA: it_data TYPE TABLE OF struct_data,
      wa_data LIKE LINE OF it_data.

START-OF-SELECTION.

  "Function Module to upload file.
  CALL FUNCTION 'GUI_UPLOAD'
    EXPORTING
      filename                      = 'C:\USERS\DESKTOP\BANK.TXT'
*     FILETYPE                      = 'ASC'
*     HAS_FIELD_SEPARATOR           = ' ' 'X - means the file has field seperator.
*     HEADER_LENGTH                 = 0
*     READ_BY_LINE                  = 'X'
*     DAT_MODE                      = ' '
*     CODEPAGE                      = ' '
*     IGNORE_CERR                   = ABAP_TRUE
*     REPLACEMENT                   = '#'
*     CHECK_BOM                     = ' '
*     VIRUS_SCAN_PROFILE            =
*     NO_AUTH_CHECK                 = ' '
*   IMPORTING
*     FILELENGTH                    =
*     HEADER                        =
    TABLES
      data_tab                      = it_data
   EXCEPTIONS
     file_open_error               = 1
     file_read_error               = 2
     no_batch                      = 3
     gui_refuse_filetransfer       = 4
     invalid_type                  = 5
     no_authority                  = 6
     unknown_error                 = 7
     bad_data_format               = 8
     header_not_allowed            = 9
     separator_not_allowed         = 10
     header_too_long               = 11
     unknown_dp_error              = 12
     access_denied                 = 13
     dp_out_of_memory              = 14
     disk_full                     = 15
     dp_timeout                    = 16
     OTHERS                        = 17
            .
  IF sy-subrc <> 0.
* Implement suitable error handling here
    MESSAGE 'Error in GUI upload' TYPE 'E'.
  ENDIF.

  LOOP AT it_data INTO wa_data.
    PERFORM open_group.

    PERFORM bdc_dynpro      USING 'SAPMF02B' '0100'.
    PERFORM bdc_field       USING 'BDC_CURSOR'
                                  'BNKA-BANKL'.
    PERFORM bdc_field       USING 'BDC_OKCODE'
                                  '/00'.
    PERFORM bdc_field       USING 'BNKA-BANKS'
                                  wa_data-banks.
    PERFORM bdc_field       USING 'BNKA-BANKL'
                                  wa_data-bankl.
    PERFORM bdc_dynpro      USING 'SAPMF02B' '0110'.
    PERFORM bdc_field       USING 'BDC_CURSOR'
                                  'BNKA-BRNCH'.
    PERFORM bdc_field       USING 'BDC_OKCODE'
                                  '/00'.
    PERFORM bdc_field       USING 'BNKA-BANKA'
                                  wa_data-banka.
    PERFORM bdc_field       USING 'BNKA-STRAS'
                                  'Conout Place'.
    PERFORM bdc_field       USING 'BNKA-ORT01'
                                  wa_data-ort01.
    PERFORM bdc_field       USING 'BNKA-BRNCH'
                                  wa_data-brnch.
    PERFORM bdc_dynpro      USING 'SAPMF02B' '0110'.
    PERFORM bdc_field       USING 'BDC_CURSOR'
                                  'BNKA-BANKA'.
    PERFORM bdc_field       USING 'BDC_OKCODE'
                                  '=UPDA'.
    PERFORM bdc_field       USING 'BNKA-BANKA'
                                  wa_data-banka.
    PERFORM bdc_field       USING 'BNKA-STRAS'
                                  wa_data-stras.
    PERFORM bdc_field       USING 'BNKA-ORT01'
                                  wa_data-ort01.
    PERFORM bdc_field       USING 'BNKA-BRNCH'
                                  wa_data-brnch.
    PERFORM bdc_transaction USING 'FI01'.

    PERFORM close_group.
  ENDLOOP.
~~~

#### BDC - program which dynamically uploads file.

~~~abap
REPORT z15081947_bdc_session
       NO STANDARD PAGE HEADING LINE-SIZE 255.

INCLUDE bdcrecx1.

* File Upload parameter
PARAMETERS: p_fl TYPE string.

* Structure of table
TYPES:BEGIN OF struct_bnka,
    banks TYPE bnka-banks,
    bankl TYPE bnka-bankl,
    banka TYPE bnka-banka,
    stras TYPE bnka-stras,
    ort01 TYPE bnka-ort01,
    brnch TYPE bnka-brnch,
  END OF struct_bnka.

* Internal table and workarea
DATA: it_bnka TYPE TABLE OF struct_bnka,
      wa_bnka LIKE LINE OF  it_bnka.

DATA: FLAG TYPE c  LENGTH 1 VALUE 'R'.
*FLAG = 'R'.

AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_fl.
  CALL FUNCTION '/SAPDMC/LSM_F4_FRONTEND_FILE'
*   EXPORTING
*     PATHNAME               =
    CHANGING
      pathfile               = p_fl
   EXCEPTIONS
     canceled_by_user       = 1
     system_error           = 2
     OTHERS                 = 3
            .
  IF sy-subrc <> 0.
* Implement suitable error handling here
  ELSEIF sy-subrc EQ 0.
    FLAG = 'G'.
  ENDIF.

  IF FLAG EQ 'G'.
    CALL FUNCTION 'GUI_UPLOAD'
     EXPORTING
       filename                      = p_fl
    filetype                         = 'ASC'
      has_field_separator            = 'X' " X = Tab Seperator. Space = Fields are not separated by tabs.
*   HEADER_LENGTH                 = 0
*   READ_BY_LINE                  = 'X'
*   DAT_MODE                      = ' '
*   CODEPAGE                      = ' '
*   IGNORE_CERR                   = ABAP_TRUE
*   REPLACEMENT                   = '#'
*   CHECK_BOM                     = ' '
*   VIRUS_SCAN_PROFILE            =
*   NO_AUTH_CHECK                 = ' '
* IMPORTING
*   FILELENGTH                    =
*   HEADER                        =
     TABLES
       data_tab                      = it_bnka
    EXCEPTIONS
      file_open_error               = 1
      file_read_error               = 2
      no_batch                      = 3
      gui_refuse_filetransfer       = 4
      invalid_type                  = 5
      no_authority                  = 6
      unknown_error                 = 7
      bad_data_format               = 8
      header_not_allowed            = 9
      separator_not_allowed         = 10
      header_too_long               = 11
      unknown_dp_error              = 12
      access_denied                 = 13
      dp_out_of_memory              = 14
      disk_full                     = 15
      dp_timeout                    = 16
      OTHERS                        = 17
             .
    IF sy-subrc <> 0.
* Implement suitable error handling here
    ENDIF.
  ENDIF.



START-OF-SELECTION.
  LOOP AT it_bnka INTO wa_bnka.
  PERFORM open_group.

  PERFORM bdc_dynpro      USING 'SAPMF02B' '0100'.
  PERFORM bdc_field       USING 'BDC_CURSOR'
                                'BNKA-BANKL'.
  PERFORM bdc_field       USING 'BDC_OKCODE'
                                '/00'.
  PERFORM bdc_field       USING 'BNKA-BANKS'
                                wa_bnka-banks.
  PERFORM bdc_field       USING 'BNKA-BANKL'
                                wa_bnka-bankl.
  PERFORM bdc_dynpro      USING 'SAPMF02B' '0110'.
  PERFORM bdc_field       USING 'BDC_CURSOR'
                                'BNKA-BRNCH'.
  PERFORM bdc_field       USING 'BDC_OKCODE'
                                '/00'.
  PERFORM bdc_field       USING 'BNKA-BANKA'
                                wa_bnka-banka.
  PERFORM bdc_field       USING 'BNKA-STRAS'
                                wa_bnka-stras.
  PERFORM bdc_field       USING 'BNKA-ORT01'
                                wa_bnka-ort01.
  PERFORM bdc_field       USING 'BNKA-BRNCH'
                                wa_bnka-brnch.
  PERFORM bdc_dynpro      USING 'SAPMF02B' '0110'.
  PERFORM bdc_field       USING 'BDC_CURSOR'
                                'BNKA-BANKA'.
  PERFORM bdc_field       USING 'BDC_OKCODE'
                                '=UPDA'.
  PERFORM bdc_field       USING 'BNKA-BANKA'
                                wa_bnka-banka.
  PERFORM bdc_field       USING 'BNKA-STRAS'
                                wa_bnka-stras.
  PERFORM bdc_field       USING 'BNKA-ORT01'
                                 wa_bnka-ort01.
  PERFORM bdc_field       USING 'BNKA-BRNCH'
                                wa_bnka-brnch.
  PERFORM bdc_transaction USING 'FI01'.

  PERFORM close_group.

  ENDLOOP.
~~~

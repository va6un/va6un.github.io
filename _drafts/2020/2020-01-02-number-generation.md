---
layout: post
title:	"serial number gen:"
date:	2020-01-02 12:00:00
categories:
    - blog
tags:
    - sap
    - number generation
---

Transaction code for serial number generation is `SNRO`. 
* Number length domain - `NUMC8`
* Warning % - `10%`
* No of numbers in buffer - `0`
Set these values and hit 'save'.

Call the function module `number_get_next`.

~~~abap
CALL FUNCTION 'NUMBER_GET_NEXT'
    EXPORTING
      nr_range_nr             = '1' " Eg: 1, 2, ...
      object                  = 'Z20_PUR' " Object name
*     QUANTITY                = '1'
*     SUBOBJECT               = ' '
*     TOYEAR                  = '0000'
*     IGNORE_BUFFER           = ' '
    IMPORTING
      number                  = gen_po_number " 'gen_po_number' type same as 'Number length domain - `NUMC8`'
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
    MESSAGE 'Error in generating number!' TYPE 'E'.
  ENDIF.
~~~
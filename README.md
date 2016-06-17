# QvCalendar flex-Selections 
-----------------------------------------------
Qliview 11 Extension Object 

## Description
This project of extension was intented to make easier calendar selections in Qliview more particularly for multi-range selections. 

## Object Properties

### The Field
To be able to pass the selections you made on object on to qlikview data model you need to assign a field that holding date data 
of the data model.
The field must be containing number of dates, for instance if your date field is "myDate" then the field you attached to the object
should be num(myDate).

### Buttons
#### Navigation buttons to naviagtes through the years and creates calendar of the year
#### When click on months or weeks or days the related cells highlights.
#### Check button (OK) verifies the highlighted cells as to be selected
#### Clear button release the checked cells
#### Filter button pass selections on to Qlikview
#### Undo button clear selections on Qlikview

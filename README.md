# QvCalendar flex-Selections 
-----------------------------------------------
Qlikview 11 Extension Object 
-----------------------------------------------
V1.1 release: WeekStart option has been added.

Fixed Error : Calendar disappearing after switching between tabs. (01.03.2017)

## Description
This object extension makes it easy to make calendar selections in qlikview more particularly when multi-range selections is needed. 

## Object Properties

### The Field
The field must contain number of dates, for instance if your date field is "myDate" then the field 
should be num(myDate).

### Buttons
#### WeekStart option enables choosing the starting day of weeks. 
#### Navigation buttons navigates through the years and creates calendar of the year
#### When click on months or weeks or days the related cells highlights.
#### Check button (OK) verifies the highlighted cells as to be selected
#### Clear button release the checked cells
#### Filter button pass selections on to Qlikview
#### Undo button clear selections on Qlikview

---
url: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/
title:  Date Picker Dialog Example | APG | WAI | W3C
scraped_at: 2025-07-20T13:35:47.076Z
description: Accessibility resources free online from the international standards organization: W3C Web Accessibility Initiative (WAI).
---[Skip to content](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#main)

Date Picker Dialog Example

## Read This First

The code in this example is not intended for production environments.
Before using it for any purpose, read this to understand why.


This is an illustrative example of one way of using ARIA that conforms with the ARIA specification.

- There may be support gaps in some
[browser and assistive technology combinations](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/#browser_and_AT_support),
especially for
[mobile/touch devices](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/#mobile_and_touch_support).
Testing code based on this example with assistive technologies is essential before considering use in production systems.

- The [ARIA and Assistive Technologies Project](https://aria-at.w3.org/) is developing measurements of assistive technology support for APG examples.
- Robust accessibility can be further optimized by choosing implementation patterns that [maximize use of semantic HTML](https://www.w3.org/TR/using-aria/#rule1) and heeding the warning that
[No ARIA is better than Bad ARIA](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/#no_aria_better_bad_aria).


## About This Example

![](https://www.w3.org/WAI/content-images/wai-aria-practices/images/pattern-dialog-modal.svg)

The example below includes a date input field and a button that opens a date picker that implements the [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
The dialog contains a calendar that uses the [grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) to present buttons that enable the user to choose a day from the calendar.
Choosing a date from the calendar closes the dialog and populates the date input field.
When the dialog is opened, if the input field is empty, or does not contain a valid date, then the current date is focused in the calendar.
Otherwise, the focus is placed on the day in the calendar that matches the value of the date input field.


Similar examples include:

- [Alert Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/examples/alertdialog/): A confirmation prompt that demonstrates an alert dialog.
- [Modal Dialog Example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/): An example demonstrating multiple layers of modal dialogs with both small and large amounts of content.
- [Date Picker Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/): An editable date input combobox that opens a dialog containing a calendar grid and buttons for navigating by month and year.

## Example

Open In CodePen

Date

(date format: mm/dd/yyyy)

| Su | Mo | Tu | We | Th | Fr | Sa |
| --- | --- | --- | --- | --- | --- | --- |
|  |  | 1 | 2 | 3 | 4 | 5 |
| 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| 13 | 14 | 15 | 16 | 17 | 18 | 19 |
| 20 | 21 | 22 | 23 | 24 | 25 | 26 |
| 27 | 28 | 29 | 30 | 31 |  |  |
|  |  |  |  |  |  |  |

CancelOK

## Accessibility Features

- The description of the date format is associated with the text input via `aria-describedby`, making it available to assistive technologies as an accessible description.
- After a date is chosen, the accessible name of the "Choose Date" button is changed to "Change Date, DATE\_STRING" where DATE\_STRING is the selected date.
So, when the dialog closes and focus returns to the button, screen reader users hear confirmation of the selected date.

- In the dialog, shortcut keys are assigned to the additional buttons for changing the month and year displayed in the calendar.
- The calendar heading displaying the month and year is marked up as a live region so screen reader users get feedback from the buttons and keyboard commands that change the month and year.
- Keyboard help is displayed at the bottom of the dialog.
A live region is used to announce it to screen reader users when focus moves into the calendar grid.

- To facilitate compact visual design in the calendar, the day names in the column headers are abbreviated to two characters.
However, this makes it more difficult for screen reader users to understand the day names.
So, full day names are provided to assistive technologies in the HTML `abbr` attribute on the column headers, enabling screen readers to announce the full names when users navigate the grid.

- High contrast support for focus and hover styling of the controls in the dialog box use the CSS border property:
  - When a button or date cell receives focus a border is added.
  - When hovering over a button or date cell with a pointing device a border is added.
  - By default buttons and date cells do not have a border, padding is used as a placeholder for the added border for focus and hover styling.

## Keyboard Support

### Choose Date Button

| Key | Function |
| --- | --- |
| `Space`,<br>`Enter` | - Open the date picker dialog.<br>- Move focus to selected date, i.e., the date displayed in the date input text field.<br>   If no date has been selected, places focus on the current date. |

### Date Picker Dialog

| Key | Function |
| --- | --- |
| `ESC` | Closes the dialog and returns focus to the "Choose Date" button. |
| `Tab` | - Moves focus to next element in the dialog `Tab` sequence.<br>- Note that, as specified in the [Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/), only one button in the calendar grid is in the `Tab` sequence.<br>- If focus is on the last button (i.e., "OK"), moves focus to the first button (i.e. "Previous Year"). |
| `Shift` \+ `Tab` | - Moves focus to previous element in the dialog `Tab` sequence.<br>- Note that, as specified in the [Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/), only one button in the calendar grid is in the `Tab` sequence.<br>- If focus is on the first button (i.e., "Previous Year"), moves focus to the last button (i.e. "OK"). |

### Date Picker Dialog: Month/Year Buttons

| Key | Function |
| --- | --- |
| `Space`,<br>`Enter` | Change the month and/or year displayed in the calendar grid. |

### Date Picker Dialog: Date Grid

| Key | Function |
| --- | --- |
| `Space`,<br>`Enter` | - Select the date, close the dialog, and move focus to the "Choose Date" button.<br>- Update the value of the "Date" input with the selected date.<br>- Update the accessible name of the "Choose Date" button to include the selected date. |
| `Up Arrow` | Moves focus to the same day of the previous week. |
| `Down Arrow` | Moves focus to the same day of the next week. |
| `Right Arrow` | Moves focus to the next day. |
| `Left Arrow` | Moves focus to the previous day. |
| `Home` | Moves focus to the first day (e.g Sunday) of the current week. |
| `End` | Moves focus to the last day (e.g. Saturday) of the current week. |
| `Page Up` | - Changes the grid of dates to the previous month.<br>- Moves focus to the day of the month that has the same number.<br>   If that day does not exist, moves focus to the last day of the month. |
| `Shift` \+ `Page Up` | - Changes the grid of dates to the same month in the previous year.<br>- Moves focus to the day of the month that has the same number.<br>   If that day does not exist, moves focus to the last day of the month. |
| `Page Down` | - Changes the grid of dates to the next month.<br>- Moves focus to the day of the month that has the same number.<br>   If that day does not exist, moves focus to the last day of the month. |
| `Shift` \+ `Page Down` | - Changes the grid of dates to the same month in the next year.<br>- Moves focus to the day of the month that has the same number.<br>   If that day does not exist, moves focus to the last day of the month. |

### Date Picker Dialog: OK and Cancel Buttons

| Key | Function |
| --- | --- |
| `Space`,<br>`Enter` | Activates the button:<br> <br>- "Cancel": Closes the dialog, moves focus to "Choose Date" button, does not update date in date input.<br>- "OK": Closes the dialog, moves focus to "Choose Date" button, updates date in date input, updates accessible name of the "Choose Date" button to include the selected date. |

## Role, Property, State, and Tabindex Attributes

### Textbox

| Role | Attribute | Element | Usage |
| --- | --- | --- | --- |
|  | `aria-describedby="ID_REFERENCE"` | `input` | Identifies the element that provides an accessible description for the textbox, enabling assistive technologies to associate the date format description with the input. |

### Choose Date Button

| Role | Attribute | Element | Usage |
| --- | --- | --- | --- |
|  | `aria-label="String"` | `button` | - The initial value of accessible name is "Choose Date".<br>- When users select a date, the accessible name is changed to "Change Date, DATE\_STRING" where DATE\_STRING is the selected date. |

### Date Picker Dialog

| Role | Attribute | Element | Usage |
| --- | --- | --- | --- |
| `dialog` |  | `div` | Identifies the element as a dialog . |
|  | `aria-modal="true"` | `div` | Indicates the dialog is modal. |
|  | `aria-label="string"` | `div` | Defines the accessible name for the dialog. |
|  | `aria-live="polite"` | `h2` | - When the month and/or year changes the content of the `h2` element is updated.<br>- Indicates the `h2` should be automatically announced by screen readers. |
|  | `aria-live="polite"` | `div` | - Indicates the element that displays information about keyboard commands for navigating the grid should be automatically announced by screen readers.<br>- The script slightly delays display of the information, so screen readers are more likely to read it after information related to change of focus. |

### Date Picker Dialog: Calendar Navigation Buttons

| Role | Attribute | Element | Usage |
| --- | --- | --- | --- |
|  | `aria-label="String"` | `button` | Defines the accessible name of the button (e.g. "Next Year"). |

### Date Picker Dialog: Date Grid

| Role | Attribute | Element | Usage |
| --- | --- | --- | --- |
| `grid` |  | `table` | - Identifies the `table` element as a `grid` widget.<br>- Since the `grid` role is applied to a `table` element, the `row`, `columnheader`, and `gridcell` roles do not need to be specified because they are implied by `tr`, `th`, and `td` tags. |
|  | `aria-labelledby="ID_REFERENCE"` | `table` | Identifies the element that provides the accessible name for the `grid`. |
|  | `tabindex="0"` | `td` | - Makes the cell focusable and includes it in the dialog `Tab` sequence.<br>- Set dynamically by the JavaScript when the element is to be included in the dialog `Tab` sequence.<br>- At any given time, only one `gridcell` within the grid is in the dialog `Tab` sequence.<br>- This approach to managing focus is described in the section on<br>   [Managing Focus Within Components Using a Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex). |
|  | `tabindex="-1"` | `td` | - Makes the cell focusable and excludes it from the dialog `Tab` sequence.<br>- Changed dynamically to `0` by the JavaScript when the cell is to be included in the dialog `Tab` sequence.<br>- At any given time, only one `gridcell` within the grid is in the dialog `Tab` sequence.<br>- This approach to managing focus is described in the section on<br>   [Managing Focus Within Components Using a Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex). |
|  | `aria-selected="true"` | `td` | - Identifies the cell containing the currently selected date, i.e., the date value present in the date input.<br>- Only set on the cell containing the currently selected date; no other cells have `aria-selected` specified. |

**Note:** Since the names of the days of the week in the column headers are abbreviated to two characters, they may be difficult to understand when announced by a screen reader.
An alternative column header name can be provided to screen readers by applying the `abbr` attribute to the `th` elements.
So, each `th` element includes a `abbr` attribute containing the full spelling of the name of the day for that column.


## JavaScript and CSS Source Code

- CSS:
[datepicker-dialog.css](https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/dialog-modal/examples/css/datepicker-dialog.css)
- Javascript:
[datepicker-dialog.js](https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/dialog-modal/examples/js/datepicker-dialog.js)

## HTML Source Code

To copy the following HTML code, please open it in CodePen.

Open In CodePen

```sourcecode hljs xml

<div id="myDatepicker" class="datepicker">
  <div class="date">
    <label for="id-textbox-1">
      Date
    </label>
    <div class="group">
      <input type="text"
             placeholder="mm/dd/yyyy"
             id="id-textbox-1"
             aria-describedby="id-description-1">
      <span class="desc" id="id-description-1">
        (
        <span class="sr-only">
          date format:
        </span>
        mm/dd/yyyy)
      </span>
      <button type="button"
              class="icon"
              aria-label="Choose Date">
        <span class="fa fa-calendar-alt fa-2x"></span>
      </button>
    </div>
  </div>
  <div id="id-datepicker-1"
       class="datepicker-dialog"
       role="dialog"
       aria-modal="true"
       aria-label="Choose Date">
    <div class="header">
      <button type="button"
              class="prev-year"
              aria-label="previous year">
        <span class="fas fa-angle-double-left fa-lg"></span>
      </button>
      <button type="button"
              class="prev-month"
              aria-label="previous month">
        <span class="fas fa-angle-left fa-lg"></span>
      </button>
      <h2 id="id-grid-label"
          class="month-year"
          aria-live="polite">
        February 2020
      </h2>
      <button type="button"
              class="next-month"
              aria-label="next month">
        <span class="fas fa-angle-right fa-lg"></span>
      </button>
      <button type="button"
              class="next-year"
              aria-label="next year">
        <span class="fas fa-angle-double-right fa-lg"></span>
      </button>
    </div>
    <div class="table-wrap">
      <table class="dates"
             role="grid"
             aria-labelledby="id-grid-label">
        <thead>
          <tr>
            <th scope="col" abbr="Sunday">
              Su
            </th>
            <th scope="col" abbr="Monday">
              Mo
            </th>
            <th scope="col" abbr="Tuesday">
              Tu
            </th>
            <th scope="col" abbr="Wednesday">
              We
            </th>
            <th scope="col" abbr="Thursday">
              Th
            </th>
            <th scope="col" abbr="Friday">
              Fr
            </th>
            <th scope="col" abbr="Saturday">
              Sa
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td tabindex="-1" data-date="2020-02-01">
              1
            </td>
          </tr>
          <tr>
            <td tabindex="-1" data-date="2020-02-02">
              2
            </td>
            <td tabindex="-1" data-date="2020-02-03">
              3
            </td>
            <td tabindex="-1" data-date="2020-02-04">
              4
            </td>
            <td tabindex="-1" data-date="2020-02-05">
              5
            </td>
            <td tabindex="-1" data-date="2020-02-06">
              6
            </td>
            <td tabindex="-1" data-date="2020-02-07">
              7
            </td>
            <td tabindex="-1" data-date="2020-02-08">
              8
            </td>
          </tr>
          <tr>
            <td tabindex="-1" data-date="2020-02-09">
              9
            </td>
            <td tabindex="-1" data-date="2020-02-10">
              10
            </td>
            <td tabindex="-1" data-date="2020-02-11">
              11
            </td>
            <td tabindex="-1" data-date="2020-02-12">
              12
            </td>
            <td tabindex="-1" data-date="2020-02-13">
              13
            </td>
            <td tabindex="0"
                data-date="2020-02-14"
                role="gridcell"
                aria-selected="true">
              14
            </td>
            <td tabindex="-1" data-date="2020-02-15">
              15
            </td>
          </tr>
          <tr>
            <td tabindex="-1" data-date="2020-02-16">
              16
            </td>
            <td tabindex="-1" data-date="2020-02-17">
              17
            </td>
            <td tabindex="-1" data-date="2020-02-18">
              18
            </td>
            <td tabindex="-1" data-date="2020-02-19">
              19
            </td>
            <td tabindex="-1" data-date="2020-02-20">
              20
            </td>
            <td tabindex="-1" data-date="2020-02-21">
              21
            </td>
            <td tabindex="-1" data-date="2020-02-22">
              22
            </td>
          </tr>
          <tr>
            <td tabindex="-1" data-date="2020-02-23">
              23
            </td>
            <td tabindex="-1" data-date="2020-02-24">
              24
            </td>
            <td tabindex="-1" data-date="2020-02-25">
              25
            </td>
            <td tabindex="-1" data-date="2020-02-26">
              26
            </td>
            <td tabindex="-1" data-date="2020-02-27">
              27
            </td>
            <td tabindex="-1" data-date="2020-02-28">
              28
            </td>
            <td tabindex="-1" data-date="2020-02-29">
              29
            </td>
          </tr>
          <tr>
            <td tabindex="-1" data-date="2020-02-30">
              30
            </td>
            <td tabindex="-1" data-date="2020-02-31">
              31
            </td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
            <td class="disabled" tabindex="-1"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="dialog-ok-cancel-group">
      <button class="dialog-button" value="cancel">
        Cancel
      </button>
      <button class="dialog-button" value="ok">
        OK
      </button>
    </div>
    <div class="dialog-message" aria-live="polite"></div>
  </div>
</div>
```

[Back to Top](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#top)
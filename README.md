# Practical recruitment task

## Task details:

Implement a web application which displays a table of people containing the following information:

- First Name,
- Last Name
- Street Name
- House Number
- Apartment Number(optional)
- PostalCode
- Town
- Phone Number
- Date ofBirth
- Age (read-only)

The application should allow a user to edit the data inline, add new users and delete existing ones.
Belowthe table there should be two buttons: "Save" and "Cancel". When the Save button is pressed,
changes made by the user should be sent to the server. Pressing the "Cancel" button discards user
changes and causes the table to be refreshed based on the data fetched from the server. The
buttons should be active only if the table contains unsaved data.

The server can use memory as storage (afterrestaring server, data can disappear).

When you don't have experiencewith implementation of server, you can mock it on frontend side.

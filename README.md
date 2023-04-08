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
- Date of Birth
- Age (read-only)

The application should allow a user to edit the data inline, add new users and delete existing ones.
Below the table there should be two buttons: "Save" and "Cancel". When the Save button is pressed,
changes made by the user should be sent to the server. Pressing the "Cancel" button discards user
changes and causes the table to be refreshed based on the data fetched from the server. The
buttons should be active only if the table contains unsaved data.

The server can use memory as storage (afterrestaring server, data can disappear).

When you don't have experiencewith implementation of server, you can mock it on frontend side.

# Personal notes

I realized only at the end of time that [Testing Library for Angular](https://testing-library.com/docs/angular-testing-library/intro/) is a thing, if i discovered it faster i would certainly use it.

Material Design don't have principles about using inputs inside of tables, so i allowed myself to alter some css code directly.
To be honest selecting that library because was because of me remembering to be use it 3-4 years ago, and my own UI design is for now stll bad.

While writing code I recalled how though to work it was, and whenever I will have to write something simmilar again I would preferably choose something else eg. Bootstrap.
For this one I stayed with it to show that I can stick to it even if I don't like it.

Learning Angular from scratch after all that time and looking at what has changed was quite entertaining.

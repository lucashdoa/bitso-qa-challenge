# bitso-qa-challenge

💰 Take home test for a QA position at Bitso.

## How to use this automation

1️⃣ Install dependencies

I've use npm as the package manager. After cloning the project, open your terminal emulator and run the command:

```
npm i
```

2️⃣ Inform your Username and Password

Open the file "cypress.env.json" at the root folder, and enter your username and password.
Remeber: Sensitive data shouldn't be versioned, so be sure not to commit your changes.

```
// Example

{
  "username": "your@email.com",
  "password": "p4$$w0rd"
}
```

3️⃣ Open Cypress Test Runner

Since there are some security checks at the staging environment like authorizing a new browser, it's not possible to run this automation in headless mode. To open the test runner run the following command:

```
npm test
```

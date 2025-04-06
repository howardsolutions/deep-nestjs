# Used Car Pricing API

- Users sign up with email / password
- Users get an ESTIMATE for how much their car is worth based on the make / model / year / mileage
- Users can report what they sold their vehicles for
- Admins have to approve reported sales

## API DESIGN

```js
    DESCRIPTION                           METHOD AND ROUTE                     BODY AND QUERY STRING
  1. CREATE A new user and sign up          POST /auth/signup                  body {email, password}
  
  2. Sign in as an existing user            POST /auth/signin                  body {email, password}                  
  
  3. get an estimate for the car value      GET /reports                       query string - make, model, year, mileage, longitude, latitude...
  
  4. report how much a car sold for?        POST /reports                       body - {make, model,......}

  5. Approve or reject a report submitted   PATCH /reports                      BODY - {approved: boolean} 
  by user (for admin)
```

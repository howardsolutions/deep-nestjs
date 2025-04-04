# DEEP NESTJS NOTES

## DTO

- The goal of Data Transfer Object is to Carries data between 2 places frequently in form of NETWORK REQUEST.
- DTO usually doesn't have any functionalities attached to them.
- Simple classes that list out couple properties.
- Think of DTO as what some form of data look like as it being sent along inside of our request.

## Behind the Scenes of Validation

```js
 REQUEST => HIT THE SERVER
         => validation pipe
            1) use `class-transformer` to turn the body into an instance of the DTO classes.
            2) use `class-validator` to validate the instance
            3) If there are validation errors, respond immediately, otherwise provide body to request handler.
```

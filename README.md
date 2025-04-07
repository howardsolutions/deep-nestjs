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

## Inversion of Control

- Classes should NOT create instances of ITS dependencies on its own.

## Dependency Injection Flow

Dependency Injection is all about making use of `inversion of control` BUT not having to create a ton of different classes or a ton of different instances EVERY SINGLE TIME you want a controller.

1. At startup, register all classes with the container.
2. Container will figure out what each dependency each class has.
3. We then ask the container to create an Instance of class for us.
4. Container creates all required dependencies and give us the instance.
5. Container will hold onto the created dependency instances and reuse them if needed.

## Used Car Pricing API

- Users sign up with email / password
- Users get an ESTIMATE for how much their car is worth based on the make / model / year / mileage
- Users can report what they sold their vehicles for
- Admins have to approve reported sales

## Creating an Entity

- Create an entity file, and create a class in it that lists all the properties that your entity will have.
- Connect the entity to its parent module. => This creates a repository.
- Connect the entity to the root connection (in app module)

### Setting up body validation

```js
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  })
);
```

- `whiteList: true` - to make sure any additional properties (not defined in the DTO) that we send along with the request will be stripped out for us automatically'

### TypeORM Gotchas

- If we SAVE an entity instances all HOOKS tided to that entity instance will be executed. => Get data validation.

- If we passed in plain object => NO hooks will be executed whatsoever -> skip data validation => bugs!!!
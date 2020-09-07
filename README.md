An example of authentication API built using JWT
Passwords are hashed and then stored.


API endpoints are /, /register, /login, /admin

Admin route is protected. To view admin, first send a POST to /register as below

{
    "username": "example_user",
    "email": "example@mail.com",
    "password": "riskit4abiskit"
}

then send a POST to /login as below 

{
    "email": "example@mail.com",
    "password": "riskit4abiskit"
}

Now send a GET to /admin using the JWT token retrieved from the previous step.
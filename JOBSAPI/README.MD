#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

# 7:05

# password hashing

Generating random bytes and combining them with the password.
before piping to the hash function,the mathematical algorithm that maps data of any size to a bit siting of fixed size.
Hashing is a one way street, it cannot be reversed, also even a input changes a little bit the resulting hash will be completly diffrent.

$npm install bcryptjs

=>salt generate random bytes bycrypt.genSalt(number of rounds).
10 is default one and more the number it takes more processing power.

=>we take the random bytes(salt) and pass into bycrypt.hash(user password,salt) method.=>as a result we get hashed password back.
so then we can safely store in our DB.

# 7 20

# Schema instance methods

every document we create we can have functions on them.

#allkeysgenerator.com
Encryption key 216-bit

# 7:35

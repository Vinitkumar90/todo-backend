# token verify 
```
const token = req.header('Authorization')?.replace('Bearer ', '');
```
1)  req.header('Authorization')
- In Express, req.header(name) gets the value of a specific request header.

- Here, we’re looking for the Authorization header.

- Example of a request header sent by the client:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```
So req.header('Authorization') will give you:

```
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6..."
```
3)  ?.replace('Bearer ', '')
- The ?. is optional chaining — it makes sure that if the header is missing (undefined), your code won’t throw an error.

- .replace('Bearer ', '') removes the string "Bearer " from the beginning, leaving only the raw token:

```
"eyJhbGciOiJIUzI1NiIsInR5cCI6..."
```
So now, token contains just the JWT token string.


# Static vs Instance methods in Mongoose

- Static methods → operate on the whole collection.
```
const allUsers = await User.find();   // no object needed
const oneUser = await User.findById("123");
```

- Instance methods → operate on a single document (object).
```
const user = new User({ name: "Vinit" });
await user.save();   // instance method
```
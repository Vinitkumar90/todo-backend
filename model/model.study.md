# Schema (technical definition)

In Mongoose, Schema is a class provided by the Mongoose library.

When you write:
```
const userSchema = new mongoose.Schema({...});
```


you are creating an instance (object) of the Schema class.

So:

- mongoose.Schema = class (constructor).

- userSchema = object (instance of that class).

This object holds:

- The field definitions (name, email, password).

- Validation rules.

- Indexes, timestamps, hooks, virtuals, etc.

# Model (technical definition)

A Model in Mongoose is a class that is compiled from a Schema.

You create it like this:
```
const User = mongoose.model("User", userSchema);
```


Internally, Mongoose takes the userSchema object and generates a Model class (User) that:

- Wraps MongoDB collection operations (find, create, update, etc.).

- Serves as a constructor for creating new documents.

So:

- User = class.

- new User({...}) = instance (document).

# Document (technical definition)

A Document is an instance of a Model class.

Example:
```
const user = new User({ name: "Vinit" });
```


Here:

- user is an object (instance of User model).

- It has schema-defined fields (name, email, password) and Mongoose document methods (.save(), .validate(), etc.).

## ⚡ Putting it together

Schema → An object (instance of Schema class) that defines structure & rules.

Model → A class, compiled from a Schema, that represents a MongoDB collection.

Document → An object (instance of a Model class) that represents one record in the collection.

## 👉 In short:

Schema = object (instance of Mongoose’s Schema class).

Model = class (compiled from a Schema).

Document = object (instance of a Model).

 🌹
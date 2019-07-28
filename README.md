# Jammer - Jam with musicians near you

This was created during my time as a student at Code Chrysalis.

## Table of Contents

1.  [Introduction](#introduction)
1.  [Installation](#installation)
1.  [Queries & mutations](#queries-&-mutations)
1.  [Resources](#resources)

## Introduction

Jammer is a Graphql API that connects musicians who seeks other musicians to jam with. A user can create a "jam" and descripe the following details:

- The genre the musician is interested in playing
- Where the jam will take place
- When the jam will take place

Other users will then have to opportunity to comment on the jam and let the creator know that they will be attending the jam.

Note that it is required to have Postgres installed to run this project.

## Installation

Run `yarn` to install all dependencies.

Create a file named `.env`, where you will put all the database credentials. Copy and paste the following contents into the `.env` file and fill out the `YOURVALUE` with your own credentials:

```
HOST=localhost
PORT=3000
PGDATABASE="jammer"
PGHOST=localhost
PGPORT=5432
DBUSER=YOURVALUE
PGPASSWORD=YOURVALUE 
```
Run `yarn createDatabase` to create the Jammer database.

Run `yarn migrate` to migrate the jams, users and comments tables to your newly created database.

Run `yarn seed` to seed the database with test jams, users and tables.

Run `yarn dev` to get det server running.

If necessary run `yarn rollback` to drop the tables.

Run `yarn test` to run tests.


## Queries & mutations

The Jammer API uses Graphql to make CRUD operations on the database. The tables contains following fields:

- jams table:
  - id
  - creator_id (foreign key points to user id)
  - genre
  - when
  - where
  - created_at
- users table
  - id
  - username
  - password
  - created_at




The API exposes the following operations:

### Queries

`getUser`: Returns a specific user from the database based on the users id.

``` 
{
  getUser(id: 1) {
    id
    username
    password
    created_at
  }
}
```

`getAllUsers`: Returns all users from the database.

```
{
  getAllUsers {
    id
    username
    password
    created_at
  }
}
```

`getUserJams`: Returns a list of all jams a specific user has created based on user id.

```
{
  getUserJams(id: 1){
    id
    creator_id
    genre
    when
    where
    created_at
  }
}
```

`getJam`: Returns details about a jam based on jam id.

```
{
  getJam(id: 1){
    id
    creator_id
    genre
    when
    where
    created_at
  }
}
```

`getAllJams`: Returns a list of all jams.

```
{
  getAllJams{
    id
    creator_id
    genre
    when
    where
    created_at
  }
}
```

### Mutations

`createUser`: Creates a new user and returns the newly created user.

```
mutation{
  createUser(username: "James", password:"hetfield") {
    id
    username
    password
    created_at
  }
}
```

`updateUser`: Updates a user's username and/or password and returns the updated user. The mutations takes two arguments: 

- id: The user's id
- newData: An object that contains the keys and values of the fields that should be updated.

```
mutation{
  updateUser(id: 2, newData: {username: "James H", password: "yeah"}) {
    id
    username
    password
    created_at
  }
}
```

`deleteUser`: Deletes a user based on the user's id and returns the deleted user object.

```
mutation{
  deleteUser(id: 2){
    id
    username
    password
    created_at
  }
}
```

`createJam`: Creates a new jam and returns the newly created jam. Note that creator_id is a foreign key, that points to the id of the user who creates the jam

```
mutation{
  createJam(creator_id: 3, genre: "Jazz", when: "2019-07-30", where: "Shibuya Jazz Club"){
    creator_id
    genre
    when
    where
    created_at
  }
}
```

`updateJam`: Updates a jam's information such as `genre`, `when` and `where` and returns the updated jam. The mutations takes two arguments:

- id: The jams's id
- newData: An object that contains the keys and values of the fields that should be updated.

``` 
mutation{
  updateJam(id: 1, newData: {where: "Rock House"}){
    id
    creator_id
    genre
    when
    where
    created_at
  }
```

`deleteJam`: Deletes a jam based on the jam's id and returns the deleted jam object.

``` 
mutation{
  deleteJam(id: 1){
    id
    creator_id
    genre
    when
    where
    created_at
  }
}
```

## Resources

- [Postgres Documentation](https://www.postgresql.org/docs/)
- [Knex Documentation](http://knexjs.org/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Express v4.x Documentation](https://expressjs.com/en/api.html)
- [Express-GraphQL Documentation](https://github.com/graphql/express-graphql)
- [Chai Assertion Library](http://chaijs.com/api/)

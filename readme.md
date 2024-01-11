# Graphql CRUD with Nodejs

## Overview

This project is a GraphQL server built with Apollo Server. It provides a set of queries to interact with a local database of games, reviews, and authors.

## Dependencies

- `@apollo/server`: This is the core library for Apollo Server, a community-driven, open-source GraphQL server that works with any GraphQL schema.

## File Structure

- `index.js`: This is the main entry point of the application. It contains the server setup and the resolvers for the GraphQL queries.
- `_db.js`: This file represents a mock database. It exports an object with arrays of games, reviews, and authors.
- `schema.js`: This file contains the GraphQL schema, which defines the types and the queries available.

## File: \_db.js

This file represents a mock database and exports three arrays: `games`, `authors`, and `reviews`.

- `games`: An array of game objects. Each game has an `id`, `title`, and `platform` (an array of platforms the game is available on).
- `authors`: An array of author objects. Each author has an `id`, `name`, and `verified` status.
- `reviews`: An array of review objects. Each review has an `id`, `rating`, `content`, `author_id` (referring to an author), and `game_id` (referring to a game).

```
let  games  =  [

{ id:  '6', title:  'Cyber Nexus', platform:  ['PS5',  'Xbox',  'PC']  },
{ id:  '7', title:  'Galactic Adventure', platform:  ['Switch']  },
{ id:  '8', title:  'Mystic Chronicles', platform:  ['PS5',  'Xbox']  },
{ id:  '9', title:  'Space Odyssey', platform:  ['PC']  },
{ id:  '10', title:  'Dragon Quest IX', platform:  ['Switch',  'PS5']  },
]

let  authors  =  [
{ id:  '4', name:  'luigi', verified:  true  },
{ id:  '5', name:  'toad', verified:  false  },
{ id:  '6', name:  'bowser', verified:  true  },
]

let  reviews  =  [
{
id:  '8',
rating:  8,
content:  'Lorem ipsum dolor sit amet.',
author_id:  '4',
game_id:  '6',
},
{
id:  '9',
rating:  9,
content:  'Consectetur adipiscing elit.',
author_id:  '5',
game_id:  '7',
},
{
id:  '10',
rating:  6,
content:
'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
author_id:  '6',
game_id:  '8',
},
{
id:  '11',
rating:  7,
content:  'Ut enim ad minim veniam.',
author_id:  '4',
game_id:  '9',
},
{
id:  '12',
rating:  9,
content:
'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
author_id:  '5',
game_id:  '10',
},
]
export  default { games, authors, reviews }
```

# File : schema.js

The `schema.js` file defines the GraphQL schema for the application. It includes the types `Game`, `Review`, `Author`, and `Query`, and `Mutation`.

```
export const  typeDefs  =  `#graphql
type  Game  {
id:ID!
title:String!
platform:[String!]!
reviews:[Review!]
}

type  Review{
id:ID!
rating:Int!
content:String!
game:Game!
author:Author!
}

type  Author{
id:ID!
name:String!
verified:Boolean!
reviews:[Review!]
}

type  Query{
reviews:[Review]
review(id:ID!):Review
games:[Game]
game(id:ID!):Game
authors:[Author]
author:Author
}

type  Mutation{
addGame(game:AddGameInput!):Game
deleteGame(id:ID!):[Game]
updateGame(id:ID!,edits:EditGameInput):Game
}

input  AddGameInput{
title:String!,
platform:[String!]!
}

input  EditGameInput{
title:String,
platform:[String!]
}
```

## Types

- `Game`: Represents a game with fields `id`, `title`, `platform` (an array of platforms), and `reviews` (an array of associated reviews).
- `Review`: Represents a review with fields `id`, `rating`, `content`, `game` (the associated game), and `author` (the author of the review).
- `Author`: Represents an author with fields `id`, `name`, `verified` (a boolean indicating if the author is verified), and `reviews` (an array of associated reviews).

## Queries

- `reviews`: Returns an array of all reviews.
- `review(id: ID!)`: Returns a specific review by its ID.
- `games`: Returns an array of all games.
- `game(id: ID!)`: Returns a specific game by its ID.
- `authors`: Returns an array of all authors.
- `author`: Returns a specific author.

## Mutations

- `addGame(game: AddGameInput!)`: Adds a new game and returns it.
- `deleteGame(id: ID!)`: Deletes a game by its ID and returns the remaining games.
- `updateGame(id: ID!, edits: EditGameInput)`: Updates a game by its ID and returns the updated game.

## Inputs

- `AddGameInput`: Input for the `addGame` mutation. Requires `title` and `platform`.
- `EditGameInput`: Input for the `updateGame` mutation. Allows optional `title` and `platform`.

## GraphQL Resolvers

In `index.js`, we define the resolvers for our GraphQL server. Resolvers provide the instructions for turning a GraphQL operation into data. They resolve the query to data by defining how to fetch and return the data for each field in the schema.

- `games()`: Returns all games from the database.
- `reviews()`: Returns all reviews from the database.
- `authors()`: Returns all authors from the database.
- `review(_, args, context)`: Returns a specific review by its ID.
- `game(_, args, context)`: Returns a specific game by its ID.
- `author(_, args, context)`: Returns a specific author by its ID.
- `Game.reviews(parent)`: Returns all reviews for a specific game.

# File: index.js

This file is the main entry point of the application. It sets up the Apollo Server and defines the resolvers for the GraphQL schema.

```
import { ApolloServer } from  '@apollo/server'
import { startStandaloneServer } from  '@apollo/server/standalone'
import db from  './_db.js'
import {typeDefs} from  './schema.js

const  resolvers  =  {
Query:  {
games()  {
return db.games
},
reviews()  {
return db.reviews
},
authors()  {
return db.authors
},

review(_,  args,  context)  {
return db.reviews.find((review)  =>  review.id  ===  args.id)
},

game(_,  args,  context)  {
return db.games.find((game)  =>  game.id  ===  args.id)
},
author(_,  args,  context)  {
return db.authors.find((author)  =>  author.id  ===  args.id)
},
},
Game:  {
reviews(parent)  {
return db.reviews.filter((r)  =>  r.game_id  ===  parent.id)
},
},

Author:  {
reviews(parent)  {
return db.reviews.filter((r)  =>  r.author_id  ===  parent.id)
},
},

Review:  {
game(parent)  {
return db.games.find((g)  =>  g.id  ===  parent.game_id)
},
author(parent)  {
return db.authors.find((a)  =>  a.id  ===  parent.author_id)
},
},

Mutation:  {
deleteGame(_,  args,  context)  {
return db.games.filter((game)  =>  game.id  !==  args.id)
},
addGame(_,  args,  context)  {
let  game  =  {
...args.game,
id:  Math.floor(Math.random()  *  1000).toString(),
}
db.games.push(game)
return game
},

updateGame(_,  args,  context)  {
db.games  =  db.games.map((g)  =>  {
if  (g.id  ===  args.id)  {
return {  ...g,  ...args.edits  }
}
return g
})
return db.games.find((g)  =>  g.id  ===  args.id)
}
},
}
const  server  =  new  ApolloServer({
typeDefs,
resolvers,
})
const  {  url  }  = await startStandaloneServer(server,  {
listen:{port:4000}
})
console.log("server ready at :", 4000);
```

## Dependencies

- `@apollo/server`: The core library for Apollo Server.
- `@apollo/server/standalone`: A package for starting a standalone Apollo Server.
- `_db.js`: The mock database.
- `schema.js`: The GraphQL schema.

## Server Setup

The Apollo Server is set up with the imported `typeDefs` and `resolvers`. It is then started on port 4000 using `startStandaloneServer`.

## Running the Server

To run the server, use the command `node index.js` in the terminal. The server will start and log the message "server ready at : 4000". You can interact with it using a GraphQL client or Apollo's built-in GraphQL playground.

## FULL SOURCE CODE :

###

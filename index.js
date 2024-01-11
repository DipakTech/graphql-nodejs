import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import db from './_db.js'
import {typeDefs} from './schema.js'

const resolvers = {
  Query: {
    games() {
      return db.games
    },
    reviews() {
      return db.reviews
    },
    authors() {
      return db.authors
    },

    review(_, args, context) {
      return db.reviews.find((review) => review.id === args.id)
    },
    game(_, args, context) {
      return db.games.find((game) => game.id === args.id)
    },
    author(_, args, context) {
      return db.authors.find((author) => author.id === args.id)
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id)
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id)
    },
  },
  Review: {
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id)
    },
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id)
    },
  },
  Mutation: {
    deleteGame(_, args, context) {
      return db.games.filter((game) => game.id !== args.id)
    },
    addGame(_, args, context) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      }
      db.games.push(game)

      return game
    },
    updateGame(_, args, context) {
     db.games = db.games.map((g) => {
       if (g.id === args.id) {
         return { ...g, ...args.edits }
       }

       return g
     })

     return db.games.find((g) => g.id === args.id)
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen:{port:4000}
})

console.log("server ready at :", 4000);
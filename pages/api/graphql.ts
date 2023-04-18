import { createServer } from '@graphql-yoga/node'

const typeDefs = /* GraphQL */ `
  type Query {
    search: Word!
  }
  type Sprites {
      front_default: String
    }
  type Word {
    id: String
    name: String
    sprites: Sprites
  }
`

const resolvers = {
    Query: {
        async search(args, context, info) {
            try {
                let myHeaders = new Headers();

                let requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+info.variables.text, requestOptions)
                    .then(response => response.text())
                    .then(result =>  {
                        return JSON.parse(result)
                    })
                    .catch(error => console.log('error', error));
                return response
            }catch (e) {
                return []
            }

        },
    },
}

const server = createServer({
    schema: {
        typeDefs,
        resolvers,
    },
    endpoint: '/api/graphql',
     graphiql: false // uncomment to disable GraphiQL
})

export default server
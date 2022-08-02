import { createServer } from '@graphql-yoga/node'

const typeDefs = /* GraphQL */ `
  type Query {
    search: [Word!]!
  }
  type Word {
    id: String
    description: String
    name: String
    price: Float
    canAddToCart: Boolean
    image: String
    availabilityStatusDisplayValue: String
  }
`

const resolvers = {
    Query: {
        async search(args, context, info) {
            try {
                let myHeaders = new Headers();
                myHeaders.append("X-IBM-Client-Id", "adb8204d-d574-4394-8c1a-53226a40876e");

                let requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                let response = await fetch("https://00672285.us-south.apigw.appdomain.cloud/demo-gapsi/search?&query="+info.variables.text+"&page="+info.variables.page, requestOptions)
                    .then(response => response.text())
                    .then(result =>  {
                        return JSON.parse(result)?.item?.props?.pageProps?.initialData?.searchResult?.itemStacks[0]?.items
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
import {ApolloServer} from "apollo-server";
import {loadSchemaSync} from "@graphql-tools/load";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {addResolversToSchema} from "@graphql-tools/schema";
import jsonData from "./data.json";

const schema = addResolversToSchema({
    schema: loadSchemaSync('./schema.graphql', {
        loaders: [new GraphQLFileLoader()],
    }),
    resolvers: {
        Query: {
            dataTables: () => jsonData.dataTables,
            dataTable: (parent, args) => jsonData.dataTables.find(table => {
                console.log(table.id, args.id);
                return table.id === args.id;
            })
        },
    },
});

const server = new ApolloServer({schema});

server.listen().then(({url}) => {
    console.log(`GraphQL Server listening at ${url}`);
});

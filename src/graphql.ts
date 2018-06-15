import 'reflect-metadata';
import {
    APIGatewayProxyEvent,
    Context,
    APIGatewayProxyCallback,
} from 'aws-lambda';
import { graphqlLambda } from 'apollo-server-lambda';
import { buildSchemaSync } from 'type-graphql';
import { RecipeResolver } from './schema/recipe.resolver';

export const graphqlHandler = (event: APIGatewayProxyEvent, context: Context, callback: APIGatewayProxyCallback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    (<any>global).graphQLSchema =
        (<any>global).graphQLSchema ||
        buildSchemaSync({
            resolvers: ['schema/**/*.resolver.ts'],
            // resolvers: [RecipeResolver], // Uncomment this line and comment out the line above and it will work again :/
        });

    const graphQLSchema = (<any>global).graphQLSchema;

    const handler = graphqlLambda({
        schema: graphQLSchema,
        tracing: true,
        cacheControl: true,
    });

    return handler(event, context, callback);
};
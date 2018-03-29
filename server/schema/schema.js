const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

let books = [
	{ name: 'harry potter', genre: 'magic', id: '1' },
	{ name: 'name of the wind', genre: 'fantasy', id: '2' },
	{ name: 'percy jackson', genre: 'greek', id: '3' }
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return _.find(books, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

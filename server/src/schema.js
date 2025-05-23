import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    "Query to get tracks array for the homepage grid"
    tracksForHome: [Track!]!
    "Fetch a specific track, provided a track's ID"
    track(id: ID!): Track!
    "Fetch a specific module, provided a module's ID"
    module(id: ID!): Module!
    "Fetch all pets"
    pets : [Pet!]!
    "Fetch all books"
    books: [Book!]!
    "Fetch a book from its ID"
    book(index: Int) : Book
  }

  type Book{
    id : ID!
    name: String!
    authors : [Author!]!
  }
  
  type Author{
    id: ID!
    name: String!
  }
  
  type Pet {
    id: ID!
    weightInKilograms: Float!
  }

  type Mutation {
    "Increment the track's number of views by one."
    incrementTrackViews(id: ID!) : IncrementTrackViewsResponse
  }

  type IncrementTrackViewsResponse {
    code: Int!
    success: Boolean!
    message : String!
    "Newly upated track after a successful mutation. Note it has been kept nullable as the operation might fail, for example the track with the given ID doesn't exist"
    track: Track 
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main Author"
    author: Author!
    "The track's illustration to display in track card or track page detail"
    thumbnail: String
    "The track's approximate length to complete, in minutes"
    length: Int
    "The number of modules this track contains"
    modulesCount: Int
    "The track's complete description, can be in markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    "The track's complete array of Modules"
    modules: [Module!]!
  }

  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture"
    photo: String
  }

  "A Module is a single unit of teaching. Multiple Modules compose a Track"
  type Module {
    id: ID!
    "The module's title"
    title: String!
    "The module's length in minutes"
    length: Int
    "The module's text-based description, can be in markdown format. In case of a video, it will be the enriched transcript"
    content: String
    "The module's video url, for video-based modules"
    videoUrl: String
  }
`;

export { typeDefs};

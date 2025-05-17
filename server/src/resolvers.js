const pets = [
  { "id": "pet1",
    "weightInKilograms" : "7.0"
  }, 
  {
    "id": "pet2",
    "weightInKilograms" :  null 
  }
]


const books = [
  {id : "book1",
    name : "book1", 
    authorId : [ "author1", "author2"]
  },
  {
    id : "book2", 
    name : "book2",
    authorId: ["author2"]
  }
]

const authorsMap = new Map();
authorsMap.set("author1", {
  id: "author1",
  "name" : "author1"
});

authorsMap.set("author2", {
  id: "author2",
  name: "author2"
});


const resolvers = {
  Query: {
    book : (_, args) => {
      console.log("printing args from the book resolver function");
      console.log(args);
      try{
        return books[args.index];
      }catch(err){
        console.log(err);
        return null;
      }
    }, 
    // fetch all books
    books : () => {
      return books;
    },
    // returns an array of all pets
    pets : () => {
      return pets;
    },
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },

    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },
  Book: {
    authors: ( parent, args) => {
      console.log("Printing args from the Book.authors resolver function");
      console.log(args);
      const authors = [];
      parent.authorId.forEach(element => {
        authors.push(authorsMap.get(element));
      });
      return authors;
    }
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },

  Mutation : {
    incrementTrackViews : async (_, {id}, {dataSources}) => {
      try{
        const track =await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: "The track's views has been increased by 1",
          track
        };
      }catch( err){
        console.log(err);
        return {
          code: err.extensions.response.status, 
          success: false, 
          message: err.extensions.response.body,
          track: null 
        };
      }
    }
  }
};

export  {resolvers};

const Express = require("express");
const expressGraphQL = require('express-graphql').graphqlHTTP
const Mongoose = require("mongoose");
const {
   GraphQLID,
   GraphQLString,
   GraphQLList,
   GraphQLObjectType,
   GraphQLSchema,
   GraphQLNonNull,
} = require("graphql");



var app = Express();

// Mongoose.connect("mongodb://localhost:27017");

Mongoose.connect('mongodb://localhost:27017/testdb');

// MODELE CLIENTS 
const Clients = Mongoose.model("client",{
    nom: String, 
    email:String
})

// MODELE Produit
const Produit = Mongoose.model("produit",{
    titre:String,
    description:String,
    prix:String
})

// MODELE Achat
const Achat = Mongoose.model("achat",{
    nom_acheteur:String,
    email:String,
    titre:String,
    description:String,
    prix:String
})

// TYPE CLIENTS 
const ClientsType = new GraphQLObjectType({
    name:"Client",
    fields:{
        id: { type: GraphQLID },
        nom: {type : GraphQLString},
        email: {type : GraphQLString}
    }
});

// TYPE Produit
const ProduitType = new GraphQLObjectType({
    name:"Produit",
    fields:{
        id: { type: GraphQLID },
        titre: {type : GraphQLString},
        description: {type : GraphQLString},
        prix: {type : GraphQLString}
    }
});

// TYPE Achat
const AchatType = new GraphQLObjectType({
    name:"Produit",
    fields:{
        id: { type: GraphQLID },
        nom_acheteur: {type : GraphQLString},
        email: {type : GraphQLString},
        titre: {type : GraphQLString},
        description: {type : GraphQLString},
        prix: {type : GraphQLString}
    }
});

const schema = new GraphQLSchema({
     query: new GraphQLObjectType({
         name: "Query",
         fields:{
             allclient:{
                 type: GraphQLList(ClientsType),
                 resolve:(root, args, context, info) => {
                     return Clients.find().exec();
                 } 
             },
             oneclient :{
                 type: ClientsType,
                 args:{
                     id: { type: GraphQLNonNull(GraphQLID)}
                 },
                 resolve: (root, args, context, info) => {
                     return Clients.findById(args.id).exec();
                 }
             },

             oneproduit :{
                type: ClientsType,
                args:{
                    id: { type: GraphQLNonNull(GraphQLID)}
                },
                resolve: (root, args, context, info) => {
                    return Produit.findById(args.id).exec();
                }
            },

            clientAnd_Produit : {
                type: GraphQLList(ClientsType),
                resolve:(root, args, context, info) => {
                    return Achat.find().exec();
                } 
            }
         }
     })
});



app.use("/graphql", expressGraphQL({
    schema: schema,
    graphiql:true
}))

app.listen(3000,()=>{
    console.log('Votre serveur run --');
})


// src/index.ts or src/server.ts
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

import authRoutes from './routes/auth.routes';
import { ApolloServer } from '@apollo/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@as-integrations/express5';



const startServer = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI not defined in .env');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');

    const app = express();
    app.use(express.json());

    // REST routes
    app.use('/api/auth', authRoutes);

    // Apollo GraphQL setup
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await apolloServer.start();
    app.use(
      '/graphql',
      cors(),
      bodyParser.json(),
      expressMiddleware(apolloServer, {
        context: async ({ req }) => ({ token: req.headers.authorization }),
      })
    );

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 REST:     http://localhost:${PORT}/api`);
      console.log(`🚀 GraphQL: http://localhost:${PORT}/graphql`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

import express from 'express';
import cors from 'cors';
import { initializeFirebase } from './src/constants/firebase.mjs';
import notificationRoutes from './src/routes/notificationRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["https://push-notification-murex-three.vercel.app", "https://my-app-l6fq.vercel.app"]
app.use(cors({ 
  origin: allowedOrigins, 
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type'] 
}));

app.use(express.json());

initializeFirebase();

app.use('/api', notificationRoutes);

app.listen(PORT, (err) => 
  err ? console.log(`An error occurred: ${err}`) : console.log(`Server is running on PORT: ${PORT}`)
);

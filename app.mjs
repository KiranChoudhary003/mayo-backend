import express from 'express';
import cors from 'cors';
import { initializeFirebase } from './src/constants/firebase.mjs';
import notificationRoutes from './src/routes/notificationRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 5000;

// Define allowed origins (multiple URLs)
const allowedOrigins = [
  "https://my-app-two-dun-41.vercel.app",  // First frontend URL
  "https://push-notification-murex-three.vercel.app/"   // Second frontend URL
];

// Use CORS with dynamic origin checking
app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.includes(origin)) {
      // If the origin is in the allowed list, allow the request
      callback(null, true);
    } else {
      // Reject the request if the origin is not in the allowed list
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST",
  allowedHeaders: "Content-Type, Authorization"
}));


app.use(express.json());

initializeFirebase();

app.use('/api', notificationRoutes);

app.listen(PORT, (err) =>  err ? console.log(`An error occurred: ${err}`) : console.log(`Server is running on PORT: ${PORT}`))

import admin from '../constants/firebase.mjs';

let tokensArray = [];

export const saveToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  if (!tokensArray.includes(token)) {
    tokensArray.push(token);
    console.log('Stored tokens:', tokensArray);
  }

  res.json({ message: 'Token saved successfully' });
};

export const sendNotification = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    console.error("Missing title or body in request:", req.body);
    return res.status(400).json({ message: 'Title and body are required' });
  }

  if (tokensArray.length === 0) {
    console.error("No users to notify. Tokens list is empty.");
    return res.status(400).json({ message: 'No users to notify' });
  }

  console.log("Sending notifications to tokens:", tokensArray);

  const message = {
    notification: { title, body },
    tokens: tokensArray,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log("Firebase responses:", response);

    response.responses.forEach((resp, index) => {
      if (!resp.success && resp.error.code === "messaging/registration-token-not-registered") {
        console.log(`Removing invalid token: ${tokensArray[index]}`);
        tokensArray.splice(index, 1); 
      }
    });

    res.json({
      message: "Notification sent successfully!",
      tokensSent: tokensArray,
      response,
    });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ message: "Failed to send notification", error: error.message });
  }
};

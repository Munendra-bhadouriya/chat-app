import auth from "../config/firebase-config.js";

// HTTP middleware for Express
export const VerifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Safely check if Authorization header is present
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
  } catch (e) {
    console.error("Token verification failed:", e);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// Socket.io middleware
export const VerifySocketToken = async (socket, next) => {
  const token = socket.handshake.auth?.token;

  // Safely check if token is present
  if (!token) {
    return next(new Error("Unauthorized: No token provided"));
  }

  try {
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      socket.user = decodeValue;
      return next();
    }
  } catch (e) {
    console.error("Socket token verification failed:", e);
    return next(new Error("Forbidden: Invalid token"));
  }
};

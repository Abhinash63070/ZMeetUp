let IS_PROD = true;
const server = IS_PROD
    ? "https://zmeetup-backend.onrender.com" // or your actual backend URL
    : "http://localhost:8000";

export default server;

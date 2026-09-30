import {config} from './src/config/config.js'
import {createServer} from 'http'
import app from './src/app.js'
import connectDB from './src/config/db.js'
import {Server} from 'socket.io'
import { setupAuctionHandlers } from './src/socket/socketHandler.js'
// app.get('/', (req, res) => {
//     res.json({
//         message: "Hello World"
//     })
// })
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: config.clientUrls,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

setupAuctionHandlers(io)

const startServer = async () => {
    await connectDB();
  
    const PORT = config.port || 5000;
  
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  };
  
  startServer();
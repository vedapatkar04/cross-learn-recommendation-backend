"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
// import { rootSocket } from "../rootSocket";
const initSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: { origin: "*" },
    });
    io.use((socket, next) => {
        const { userId, authToken } = socket.handshake.query;
        if (!userId) {
            return next(new Error("Unauthorized"));
        }
        socket.data.userId = userId;
        socket.data.authToken = authToken;
        next();
    });
    //   io.on("connection", (socket: Socket) => new rootSocket(socket));
};
exports.initSocket = initSocket;

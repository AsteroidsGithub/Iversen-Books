import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import next from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'url';
import prisma from '../prisma/database';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextHandler = nextApp.getRequestHandler();

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) next(new Error('No token provided'));

    jwt.verify(token, 'secret', async (err: any, decoded: any) => {
        if (err) next(new Error('Invalid token'));

        const user = (socket.data.user = await prisma.user.findFirst({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        }));

        socket.emit('authenticated', user);
        next();
    });
});

io.on('connection', (socket) => {
    socket.on('input-change', (msg, documentId) =>
        socket.to(documentId).emit('update-input', msg)
    );

    socket.on('join-document', (documentId) => {
        console.log('Joining document', documentId);
        socket.join(documentId);
    });

    socket.on('disconnect', () => {
        console.log('bye');
    });
});

nextApp.prepare().then(() => {
    app.get('*', (req, res) => nextHandler(req, res, parse(req.url, true)));
    app.post('*', (req, res) => nextHandler(req, res, parse(req.url, true)));
    server.listen(3000, () => console.log(`Server listening on port ${3000}`));
});

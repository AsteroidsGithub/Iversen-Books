import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import axios from 'axios';

const Document: NextPage = ({}) => {
    const router = useRouter();
    const { id: documentId } = router.query;
    console.log(router.query);

    const socket = io({
        auth: {
            token: jwt.sign({ id: 1 }, 'secret', { expiresIn: '1w' }),
        },
    });

    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to socket.io server');
        });

        socket.on('authenticated', (user) => {
            console.log('authenticated', user);
            socket.emit('join-document', `${documentId}`);
        });

        socket.on('connect_error', (error) =>
            console.log('connect_error', error)
        );

        socket.on('update-input', (msg) => setInput(msg));
    }, []);

    return (
        <div>
            <h1 className="">Document {documentId}</h1>
            <input
                placeholder="Type Here"
                value={input}
                onChange={(event) => {
                    setInput(event.target.value);
                    socket.emit(
                        'input-change',
                        event.target.value,
                        `${documentId}`
                    );
                }}
            ></input>

            
        </div>
    );
};

export default Document;

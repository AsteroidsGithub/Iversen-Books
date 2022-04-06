import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body); // request body

    console.log(req.query); // url queries

    console.log(req.cookies); // passed cookies

    res.end('It works!');
}

import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import osc from '../../../osc/osc';

interface IoscCommand {
    address: string;
    args: {
        type: 'i' | 'f' | 's' | 'b';
        value: string | number | boolean;
    }[];
}

const validateOsc = (oscCommand: IoscCommand) =>
    Joi.object({
        address: Joi.string().required(),
        args: Joi.array().items(
            Joi.object({
                type: Joi.string().required(),
                value: Joi.required(),
            })
        ),
    }).validate(oscCommand);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { value, error: validateError } = validateOsc(req.body);

    if (validateError)
        return res
            .status(400)
            .json({ status: 400, message: 'Bad osc Command' });

    try {
        osc.open();

        osc.send(
            req.body as IoscCommand,
            req.query.param[0],
            req.query.param[1]
        );

        osc.close();

        return res.status(200).json({
            command: req.body,
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

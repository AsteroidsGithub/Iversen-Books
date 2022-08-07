import PrismaClient from '@Services/database';

import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

const validateReportData = (report: {
  studentId: number;
  bookId: number;
  struggledWords: string[];
  time: number;
}) =>
  Joi.object({
    studentId: Joi.number().required(),
    bookId: Joi.number().required(),
    struggledWords: Joi.array()
      .items(
        Joi.object({
          count: Joi.number().required(),
          words: Joi.array().items(Joi.string()),
          value: Joi.string()
            .allow(
              'New Skill',
              'Previous Skill',
              'New High-Frequency',
              'Previous High-Frequency',
              'Photo / Context Aware',
            )
            .required(),
        }),
      )
      .required(),
    time: Joi.number().required(),
  }).validate(report);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // This will prevent clients from accessing the API through the browser
  if (req.method != 'POST')
    return res.status(403).json({ statusCode: 403, message: 'Bad Request Please Use POST' });
  console.log(req.body);

  try {
    const { value, error } = await validateReportData(req.body);
    console.log(value, error);
    if (error)
      return res
        .status(500)
        .json({ statusCode: 500, message: 'Data Validation Error', error: error.message });

    const studentProgress = await PrismaClient.studentProgress.create({
      data: {
        time: value.time,
        student: {
          connect: {
            id: value.studentId,
          },
        },
        book: {
          connect: {
            id: value.bookId,
          },
        },
        struggledWords: {
          create: value.struggledWords.map(
            (struggledWord: { count: number; words: string[]; value: string }) => ({
              count: struggledWord.count,
              words: struggledWord.words,
              value: struggledWord.value,
            }),
          ),
        },
      },
    });

    console.log({ message: 'Success', studentProgress });
    return res.status(200).json({ message: 'Success', studentProgress });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
};

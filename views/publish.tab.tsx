import BookCover from '@Components/BookCover';

import { Book, Class } from '@Services/database';

import { NextPage } from 'next';

const PublishTab: NextPage<{ tabName: string; books: Book[]; classes: Class[] }> = ({
  books,
  classes,
}) => <h1>Kia Ora</h1>;

export default PublishTab;

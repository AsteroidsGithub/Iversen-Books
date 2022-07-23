import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import checkAuth from './checkAuth';

export default async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const user = await checkAuth(context.req.cookies.auth);
  if (!user) return { redirect: { destination: '/' }, props: {} };

  return {
    props: {
      user,
    },
  };
};

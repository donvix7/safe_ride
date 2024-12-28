
import nextAuth from 'next-auth';
import { NextAuthOptions } from './options';

const handler = nextAuth(NextAuthOptions);

export {handler as GET, handler as POST};
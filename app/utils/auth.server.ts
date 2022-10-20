import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { supabase } from 'src/utils/supabase';
import { db } from './db.server';

const REDIRECT_UNAUTHORIZED = '/auth/login';
const REDIRECT_AUTHORIZED = '/dashboard';

type LoginForm = {
  email: string;
};

async function login({ email }: LoginForm) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  // Working Supabase links for Email Templates:
  // href="{{ .SiteURL }}/auth/verify?email={{ .Email }}&token={{ .Token }}&type=[signup|magiclink]"

  if (error) {
    console.error('~auth.server > login error', error);
    return null;
  }

  return true;
}

type VerifyForm = {
  email: string;
  token: string;
  type: 'magiclink' | 'signup';
};

async function verify({ email, token, type }: VerifyForm) {
  const { data, error } = await supabase.auth.verifyOtp({
    type,
    email,
    token,
  });
  // see https://github.com/supabase/gotrue#get-verify
  console.log('~DEBUG supabase.auth.verifyOtp', { data, error });

  const userId = data.user?.id;
  if (!userId || typeof userId !== 'string') {
    console.error('verify failed; no user.id in data', { data, error });
    throw redirect(REDIRECT_UNAUTHORIZED);
  }

  return userId;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'cloudtracks_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return userId;
}

async function createUserSession(userId: string, redirectTo: string = REDIRECT_AUTHORIZED) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

/**
 * Redirect if valid user session is present
 * @returns User ID
 */
async function maybeSession(request: Request) {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect(REDIRECT_AUTHORIZED);
  }
  return userId;
}

/**
 * Redirect if missing a valid user session
 * @returns User ID
 */
async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const userId = await getUserId(request);
  if (!userId || typeof userId !== 'string') {
    console.log('requireUserId redirecting from', { userId });
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`${REDIRECT_UNAUTHORIZED}?${searchParams}`);
  }
  return userId;
}

/**
 * Redirect if missing a valid session & user entry
 * @returns User
 */
async function requireUser(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const userId = await requireUserId(request, redirectTo);
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    console.log('requireUser redirecting from', { userId, user });
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`${REDIRECT_UNAUTHORIZED}?${searchParams}`);
  }
  return user;
}

/**
 * Clear the active session and redirect
 * @returns Redirect
 */
async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect(REDIRECT_UNAUTHORIZED, {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export { login, verify, createUserSession, maybeSession, requireUserId, requireUser, logout };

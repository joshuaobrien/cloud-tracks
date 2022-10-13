import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { supabase } from 'src/utils/supabase';

type LoginForm = {
  email: string;
};

export async function login({ email }: LoginForm) {
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

export async function verify({ email, token, type }: VerifyForm) {
  const { data, error } = await supabase.auth.verifyOtp({
    type,
    email,
    token,
  });
  // see https://github.com/supabase/gotrue#get-verify

  console.log('~supabase.auth.verifyOtp', { data, error });

  return {
    id: data.user?.id,
  };
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

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return null;
  return userId;
}

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/auth/login?${searchParams}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== 'string') {
    throw redirect(`/auth/login`);
  }

  try {
    const user = {
      userId,
    };
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect('/auth/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

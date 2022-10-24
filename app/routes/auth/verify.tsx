import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { createUserSession, verify } from '~/utils/auth.server';
import { db } from '~/utils/db.server';

const badRequest = (data: any) => json(data, { status: 400 });

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');
  const type = url.searchParams.get('type') ?? 'magiclink';

  if (typeof token !== 'string' || typeof email !== 'string' || (type !== 'signup' && type !== 'magiclink')) {
    return badRequest({
      formError: 'Invalid form data',
    });
  }

  const userId = await verify({ email, token, type });

  if (type === 'signup') {
    await db.user.create({ data: { id: userId, email } });
  }

  return createUserSession(userId, '/dashboard');
};

export default function Verify() {
  const [searchParams] = useSearchParams();
  useLoaderData();

  console.log({ searchParams: searchParams.get('data') });

  return (
    <div>
      <p>Verifying login...</p>
    </div>
  );
}

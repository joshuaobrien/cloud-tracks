import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { createUserSession, verify } from '~/auth.server';

const badRequest = (data: any) => json(data, { status: 400 });

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');
  const type = url.searchParams.get('type') ?? 'magiclink';

  if (
    typeof token !== 'string' ||
    typeof email !== 'string' ||
    typeof type !== 'string' ||
    (type !== 'signup' && type !== 'magiclink')
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const user = await verify({
    email,
    token,
    type,
  });

  if (!user.id) {
    return badRequest({
      formError: 'Not implemented',
    });
  }

  return createUserSession(user.id, '/dashboard');
};

export default function Verify() {
  const [searchParams] = useSearchParams();
  useLoaderData();

  console.log({ searchParams: searchParams.get('data') });

  return (
    <div>
      <div>
        <h1>Cloudtracks</h1>
        <p>Verifying login...</p>
      </div>
    </div>
  );
}

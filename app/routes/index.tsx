import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getUserId } from '~/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (userId) {
    return redirect('/dashboard');
  }

  return null;
};

export default function Index() {
  useLoaderData();

  return (
    <div>
      <h1>Welcome to Cloudtracks</h1>
      <nav>
        <ul>
          <li>
            <Link to="auth/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

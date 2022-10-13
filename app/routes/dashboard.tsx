import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  return getUser(request);
};

export default function Dashboard() {
  const user = useLoaderData();

  return (
    <div>
      <h1>Cloudtracks</h1>

      <p>{JSON.stringify(user, null, 2)}</p>

      <form action="/auth/logout" method="post">
        <button type="submit" className="button">
          Logout
        </button>
      </form>
    </div>
  );
}

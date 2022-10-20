import type { LoaderFunction } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { requireUserId } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  return requireUserId(request);
};

export default function Dashboard() {
  const user = useLoaderData();

  return (
    <div className="flex flex-col justify-between w-screen min-h-screen overflow-hidden">
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between border-b-2 border-b-black">
          <div className="flex items-center ml-1">
            <Link to="/" className="text-lg font-bold leading-none text-black ">
              Cloudtracks
            </Link>
          </div>

          <form action="/auth/logout" method="post">
            <button type="submit" className="p-4 text-gray-100 bg-black">
              Logout
            </button>
          </form>
        </div>

        <main className="flex flex-col flex-1">
          <Outlet />
        </main>
      </div>

      <footer>
        <p className="p-4 font-mono text-xs text-black bg-gray-100">{JSON.stringify(user, null, 2)}</p>
      </footer>
    </div>
  );
}

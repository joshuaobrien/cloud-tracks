import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { getUserId } from '~/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  return userId ? redirect('/dashboard') : null;
};
export default function AuthLayout() {
  useLoaderData();

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="grid w-full place-items-center h-3/4">
        <div className="flex flex-col">
          <nav className="z-50 px-16">
            <ul>
              <li>
                <Link to="/" className="p-8 tracking-widest text-gray-800 hover:underline underline-offset-8">
                  🪴 HOME
                </Link>
              </li>
            </ul>
          </nav>

          <h1 className="font-bold text-black text-9xl text-opacity-5">Cloudtracks</h1>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

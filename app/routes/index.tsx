import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { maybeSession } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  return maybeSession(request);
};

export default function Index() {
  useLoaderData();

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="grid w-full place-items-center h-3/4">
        <div className="flex flex-col">
          <h1 className="font-bold text-black text-9xl text-opacity-5">Cloudtracks</h1>

          <nav className="px-16">
            <ul>
              <li>
                <Link to="auth/login" className="p-8 tracking-widest text-gray-800 hover:underline underline-offset-8">
                  LOGIN 🔓
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

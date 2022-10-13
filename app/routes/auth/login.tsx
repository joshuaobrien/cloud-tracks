import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useActionData, useSearchParams } from '@remix-run/react';
import { login } from '~/auth.server';

function validateUrl(url: any) {
  console.log(url);
  let urls = ['/dashboard'];
  if (urls.includes(url)) {
    return url;
  }
  return '/dashboard';
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');

  const redirectTo = validateUrl(form.get('redirectTo') || '/dashboard');

  if (typeof email !== 'string' || typeof redirectTo !== 'string') {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { email };
  const successs = await login({ email });

  if (!successs) {
    return badRequest({
      fields,
      formError: 'Not implemented',
    });
  }

  // TODO: Redirect to a 'Check your email' screen
  return redirect('confirm');
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  const [searchParams] = useSearchParams();
  return (
    <div>
      <h1>Cloudtracks</h1>
      <form method="post">
        <input type="hidden" name="redirectTo" value={searchParams.get('redirectTo') ?? undefined} />

        <div>
          <label htmlFor="email-input">Email</label>
          <input
            type="text"
            id="email-input"
            name="email"
            defaultValue={actionData?.fields?.email}
            aria-invalid={Boolean(actionData?.fieldErrors?.email)}
            aria-errormessage={actionData?.fieldErrors?.email ? 'email-error' : undefined}
          />
          {actionData?.fieldErrors?.email ? (
            <p role="alert" id="email-error">
              {actionData.fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div id="form-error-message">{actionData?.formError ? <p role="alert">{actionData.formError}</p> : null}</div>
        <button type="submit">Submit</button>
      </form>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

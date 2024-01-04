import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* @ts-expect-error Error variable is expected to always be 'unknown' type */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

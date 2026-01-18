import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // The error is a standard 404, 500, etc.
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500">
        <i>{errorMessage}</i>
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to Dashboard
      </Link>
    </div>
  );
}

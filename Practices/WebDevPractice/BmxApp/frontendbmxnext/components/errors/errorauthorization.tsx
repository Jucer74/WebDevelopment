// ErrorAuthorization page
export default function ErrorAuthorization({
  id,
  error,
}: {
  id: string;
  error: string;
}) {
  return (
    <>
      <div className="hero min-h-screen bg-neutral">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Ey you have an authorization error
            </h1>
            <p className="py-6">{error}</p>
            <h3 key={id}>Error ID: {id}</h3>
            <a className="btn btn-primary m-1 p-1" href="/login">
              Login to gain access
            </a>
            <a className="btn btn-secondary m-1 p-1" href="/register">
              Register to gain access
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

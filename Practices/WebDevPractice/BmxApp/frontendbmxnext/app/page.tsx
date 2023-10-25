export default function HomePage() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2017/08/31/4afd6a85-0cf8-4755-aa75-a8590f1e9237/bmx)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Hello there FrontEndBmxNext
          </h1>
          <p className="mb-5 text-4xl">
            This is project is creation using NextJS, ReactJS, Tailwind CSS,
            DaisyUI, Redux, Axios and TypeScript.
          </p>
        </div>
        <p className="mb-5 text-2xl font-bold">
          This project consists of consuming an API that offers endpoints to
          create users, bikes and this API has something special which is an
          authentication, authorization, through the JWT token, we have an
          architecture for this project based on unique components and
          responsibilities for each task . We have 2 cruds: user and bike, like
          a login and a registration. It has a global store to manage the
          application data that is managed with redux and with this we can
          manage the global states throughout the application.
        </p>
      </div>
    </div>
  );
}

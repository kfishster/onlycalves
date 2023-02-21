import "./App.css";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="flex text-4xl font-semibold">
        OnlyCalves official website
      </h1>

      <div className="group flex flex-col items-center gap-4">
        <img
          src="https://thumbs.dreamstime.com/b/fitness-healthy-leg-muscle-leg-muscleillustration-design-vector-isolated-white-background-122386596.jpg"
          className="flex h-80 w-80 animate-slowspin -z-10"
          alt="logo"
        />
        <p className="label flex text-3xl invisible group-hover:visible">
          Definition (noun) (ˈkävz): The fleshy back part of the leg below the
          knee
        </p>
      </div>
    </div>
  );
}

export default App;

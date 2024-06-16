import AgeCalculator from "./components/ageCalculator";

function App() {
  return (
    <main className="grid min-h-screen w-full place-content-center bg-of-white font-poppins">
      <div className="sm:w-medio w-small rounded-calculator bg-white 2xl:w-large">
        <AgeCalculator />
      </div>
    </main>
  );
}

export default App;

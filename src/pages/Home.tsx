function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <main
        style={{
          backgroundImage: "url('/src/assets/images/hero.jpg')",
        }}
        className="relative w-full h-full max-h-[60%] flex flex-col bg-no-repeat bg-cover bg-center "
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="text-3xl font-bold">Welcome to Recippy</h1>
        <p className="mt-4">Your go-to app for all your recipe needs.</p>
      </main>
    </div>
  );
}

export default Home;

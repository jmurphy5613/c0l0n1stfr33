import CatanBoard from './components/CatanBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Catan Game Board</h1>
      <CatanBoard />
    </main>
  );
}

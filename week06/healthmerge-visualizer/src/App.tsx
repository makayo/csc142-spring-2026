import MergeVisualizer from "./components/MergeVisualizer";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-10">
        HealthMerge Patient Record Integration
      </h1>

      <MergeVisualizer />
    </main>
  );
}

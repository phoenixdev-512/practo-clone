import CompleteTRPCDemo from '../src/components/CompleteTRPCDemo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Practo Clone - Doctor Management System
        </h1>
        <CompleteTRPCDemo />
      </div>
    </div>
  );
}

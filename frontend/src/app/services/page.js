export const metadata = {
  title: "Services | MyNextApp",
  description: "Our services — placeholder list for the Next.js project."
};

const dummyServices = [
  {
    id: "1",
    title: "Web Development",
    description: "Building responsive and performant web applications."
  },
  {
    id: "2",
    title: "API Integration",
    description: "Connecting frontend to backend services securely."
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "Designing intuitive interfaces with Tailwind CSS."
  }
];

export default function Services() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {dummyServices.map((s) => (
          <div key={s.id} className="border rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-gray-600">{s.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

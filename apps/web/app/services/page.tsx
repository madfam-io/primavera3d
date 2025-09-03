export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-blueprint-dark text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-12">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border border-blueprint-light/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">3D Visualization</h2>
            <p className="text-blueprint-light">
              Create stunning 3D models and animations for your products and concepts.
            </p>
          </div>
          <div className="border border-blueprint-light/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Interactive Experiences</h2>
            <p className="text-blueprint-light">
              Develop immersive web-based interactive experiences that engage your audience.
            </p>
          </div>
          <div className="border border-blueprint-light/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Web Development</h2>
            <p className="text-blueprint-light">
              Build modern, performant web applications with cutting-edge technologies.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
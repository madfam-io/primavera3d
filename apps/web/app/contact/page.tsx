export default function ContactPage() {
  return (
    <main className="min-h-screen bg-blueprint-dark text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-12">Contact Us</h1>
        <div className="max-w-2xl">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 bg-blueprint-dark border border-blueprint-light/30 rounded-lg focus:outline-none focus:border-blueprint-blue"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-blueprint-blue text-white rounded-lg hover:bg-blueprint-blue/80 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
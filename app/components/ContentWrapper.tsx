export default function ContentWrapper({ children }: { children: React.ReactNode }) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {children}
      </main>
    );
  }
  
export default function Contact() {
  return (
    <main className="space-y-8 py-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">Get in touch with our news team</p>
      </section>

      <section className="prose max-w-none">
        <p>
          Have a news tip, story idea, or feedback? We'd love to hear from you!
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">News Tips</h3>
            <p>Email: tips@newsportal.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
            <p>Email: info@newsportal.com</p>
            <p>Phone: +1 (555) 987-6543</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Advertising</h3>
            <p>Email: ads@newsportal.com</p>
            <p>Phone: +1 (555) 246-8101</p>
          </div>
        </div>
      </section>
    </main>
  );
}

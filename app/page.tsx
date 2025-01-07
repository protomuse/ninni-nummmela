import { ContactForm } from "@/app/components/contact-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </main>
  )
} 
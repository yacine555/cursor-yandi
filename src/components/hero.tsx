import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Unlock GitHub Insights with Yandi</h1>
        <p className="text-xl mb-8">
          Get summaries, star trends, cool facts, and important updates for any open source GitHub repository.
        </p>
        <Button asChild size="lg">
          <Link href="/signup">Start Analyzing for Free</Link>
        </Button>
      </div>
    </section>
  )
}


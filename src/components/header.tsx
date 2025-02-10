import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="py-4 px-6 bg-background border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Yandi Github Analyzer
        </Link>
        <nav>
          <Button variant="ghost" asChild className="mr-2">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}


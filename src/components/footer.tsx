import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-6 bg-background border-t">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yandi Github Analyzer. All rights reserved.
          </div>
          <nav className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}


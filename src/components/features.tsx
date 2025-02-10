import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3, Star, GitPullRequest, TagIcon } from "lucide-react"

const features = [
  {
    title: "Repository Summaries",
    description: "Get concise overviews of any GitHub repository at a glance.",
    icon: BarChart3,
  },
  {
    title: "Star Trends",
    description: "Track and analyze star history to gauge project popularity.",
    icon: Star,
  },
  {
    title: "Important Pull Requests",
    description: "Stay updated on crucial changes and contributions.",
    icon: GitPullRequest,
  },
  {
    title: "Version Updates",
    description: "Keep track of major releases and version changes.",
    icon: TagIcon,
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 mb-3 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


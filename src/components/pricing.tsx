import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small projects",
    features: ["5 repository analyses per month", "Basic insights", "Email support"],
  },
  {
    name: "Pro",
    price: "$19",
    description: "For growing teams and businesses",
    features: ["Unlimited repository analyses", "Advanced insights", "Priority support", "Custom reports"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited repository analyses",
      "Advanced insights",
      "Dedicated support",
      "Custom integrations",
      "On-premise option",
    ],
  },
]

export default function Pricing() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={index === 1 ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


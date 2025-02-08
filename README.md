# Yandi - AI API Management

Yandi is a web application built with Next.js that helps developers manage and monitor their AI API keys and usage across multiple providers. Track costs, set budgets, and optimize your AI infrastructure all in one place.

## Features

- 🔑 Secure API key management
- 🔄 Multiple AI provider support

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [LangChain](https://js.langchain.com/) - AI/LLM framework

## Getting Started

### Prerequisites

- Node.js 20.0 or later
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies:

bash
npm install


3. Create a `.env.local` file in the root directory and add your environment variables:
DB_URL=https://*****urtwunxejemboqgiqmzk*****.supabase.co
DB_NAME=******
DB_USER=******
DB_PASSWORD=******
DB_PORT=********
NEXT_PUBLIC_SUPABASE_URL=https://*******.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***


4. Run the development server:
bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

yandi/
├── src/
│ ├── app/ # App router pages
│ ├── components/ # Reusable components
│ ├── lib/ # Utility functions and shared logic
│ └── types/ # TypeScript type definitions
├── public/ # Static assets
└── tailwind.config.js # Tailwind CSS configuration

## Development

### Code Style

- Use TypeScript for type safety
- Follow the [Next.js App Router patterns](https://nextjs.org/docs/app)
- Use Tailwind CSS for styling
- Implement responsive design for all components

### Best Practices

- Write meaningful commit messages
- Create feature branches for new development
- Add appropriate TypeScript types
- Keep components small and focused
- Use server components where possible
- Implement proper error handling
- Follow accessibility guidelines

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI capabilities powered by [LangChain](https://js.langchain.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## Support

For support, open an issue in the repository.
// lib/data/projects.ts

export type Project = {
  id: string
  title: string
  description: string // Short summary for the card
  role: string
  year: string
  category: string[]
  stack: string[]
  status: 'Completed' | 'In Progress' | 'Archived'
  featured: boolean
  github?: string
  demo?: string
  
  // Massive Case Study Fields
  coverImage: string
  overview: string
  problemStatement: string
  myRole: string
  developmentProcess: string
  challenges: string
  solutions: string
  lessonsLearned: string
  gallery: string[]
}

export const projects: Project[] = [
  {
    id: 'capstone-project',
    title: '[Capstone Project Name]',
    description: 'A comprehensive full-stack platform designed to [solve a specific problem, e.g., streamline campus recruitment].',
    role: 'Full Stack Developer',
    year: '2025',
    category: ['Full Stack', 'University', 'Web App'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    status: 'In Progress',
    featured: true,
    github: '[https://github.com/yourusername/capstone]',
    demo: '[https://your-capstone-demo.vercel.app]',
    coverImage: '/placeholder-project.svg',
    overview: '[Provide a high-level overview of the project. What is it, who is it for, and what core value does it provide?]',
    problemStatement: '[Explain the specific problem this project addresses. e.g., Students lacked a centralized platform to discover university-specific internship opportunities, leading to fragmented communication.]',
    myRole: '[Detail your specific responsibilities. e.g., I acted as the lead full-stack developer, responsible for architecting the database schema, designing the UI system, and implementing the core authentication flow.]',
    developmentProcess: '[Describe the steps you took to build it. e.g., We started with low-fidelity wireframes in Figma, moved to a highly normalized PostgreSQL schema, and built the application iteratively using Next.js App Router.]',
    challenges: '[Mention a technical hurdle. e.g., Optimizing database queries for the search filtering system without degrading performance on the student dashboard.]',
    solutions: '[How did you solve the challenge? e.g., Implemented Prisma indexing on highly queried fields and utilized React Server Components to push heavy rendering logic to the server.]',
    lessonsLearned: '[What did you take away? e.g., Gained deep practical experience in relational database design and the nuances of Server-Side Rendering in Next.js.]',
    gallery: [
      '/placeholder-project.svg',
      '/placeholder-project.svg',
      '/placeholder-project.svg'
    ],
  },
  {
    id: 'ecommerce-platform',
    title: '[E-Commerce Storefront]',
    description: 'A modern e-commerce storefront featuring a functional shopping cart, secure checkout, and product filtering.',
    role: 'Frontend Developer',
    year: '2024',
    category: ['Frontend', 'Personal', 'E-Commerce'],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Stripe API', 'Firebase'],
    status: 'Completed',
    featured: true,
    github: '[https://github.com/yourusername/ecommerce]',
    demo: '[https://your-ecommerce-demo.vercel.app]',
    coverImage: '/placeholder-project.svg',
    overview: '[A modern, fully functional e-commerce prototype designed to demonstrate complex global state management and seamless third-party API integrations.]',
    problemStatement: '[Explain the problem. e.g., I needed a challenging project to solidify my understanding of complex global state management (shopping carts) and third-party API integration (payments).]',
    myRole: '[Detail your contribution. e.g., Designed and developed the entire frontend application from scratch, utilizing Redux for state and Firebase for mock authentication.]',
    developmentProcess: '[Describe the steps. e.g., Began by mapping out the global state tree, then built reusable UI components, and finally integrated Stripe test mode for simulated checkouts.]',
    challenges: '[Mention a challenge. e.g., Ensuring the shopping cart state remained synchronized across different browser tabs and persisted through page refreshes.]',
    solutions: '[How did you solve it? e.g., Utilized Redux Persist connected to local storage, and implemented a custom hook to listen for cross-tab storage events.]',
    lessonsLearned: '[What did you learn? e.g., Mastered Redux Toolkit for predictable state transitions and learned how to securely integrate the Stripe payment gateway.]',
    gallery: [
      '/placeholder-project.svg',
      '/placeholder-project.svg'
    ],
  },
  {
    id: 'task-management-dashboard',
    title: '[Task Management Dashboard]',
    description: 'A productivity application enabling users to organize tasks, manage Kanban boards, and track progress.',
    role: 'Frontend Developer',
    year: '2024',
    category: ['Frontend', 'Personal', 'Dashboard'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Chart.js'],
    status: 'Completed',
    featured: true,
    github: '[https://github.com/yourusername/task-dashboard]',
    demo: '[https://your-dashboard-demo.vercel.app]',
    coverImage: '/placeholder-project.svg',
    overview: '[A highly interactive task management dashboard focused on fluid animations, immediate visual feedback, and clear data visualization.]',
    problemStatement: '[Explain the problem. e.g., Many task management apps feel sluggish or lack intuitive visual feedback during complex interactions like drag-and-drop.]',
    myRole: '[Detail your contribution. e.g., Implemented the drag-and-drop logic from scratch, integrated Chart.js for productivity metrics, and enforced strict type-safety with TypeScript.]',
    developmentProcess: '[Describe the steps. e.g., Focused heavily on the mathematical logic behind drag-and-drop intersections before polishing the UI with Framer Motion spring physics.]',
    challenges: '[Mention a challenge. e.g., Managing the complex nested state of columns and cards during a drag-and-drop event without causing unnecessary DOM re-renders.]',
    solutions: '[How did you solve it? e.g., Normalized the state structure (using IDs instead of nested objects) and heavily utilized React.memo and useMemo for performance.]',
    lessonsLearned: '[What did you learn? e.g., Deepened my understanding of React performance optimization techniques and advanced TypeScript generic typing.]',
    gallery: [
      '/placeholder-project.svg',
      '/placeholder-project.svg',
      '/placeholder-project.svg',
      '/placeholder-project.svg'
    ],
  },
  {
    id: 'algorithm-visualizer',
    title: '[Algorithm Visualizer]',
    description: 'An educational tool that visually demonstrates how sorting and pathfinding algorithms execute in real-time.',
    role: 'Frontend Developer',
    year: '2023',
    category: ['Frontend', 'University', 'Educational'],
    stack: ['JavaScript', 'HTML5', 'CSS3', 'Algorithms'],
    status: 'Completed',
    featured: false,
    github: '[https://github.com/yourusername/algo-visualizer]',
    demo: '[https://your-algo-visualizer.vercel.app]',
    coverImage: '/placeholder-project.svg',
    overview: '[A web-based visualization tool that steps through algorithm execution frame-by-frame, highlighting active elements in the DOM.]',
    problemStatement: '[Explain the problem. e.g., Abstract algorithms are notoriously difficult for beginner computer science students to conceptualize and trace mentally.]',
    myRole: '[Detail your contribution. e.g., Implemented the core sorting logic (Merge, Quick, Bubble) and designed the timing mechanism to animate the DOM manipulations.]',
    developmentProcess: '[Describe the steps. e.g., Started by writing the raw algorithms in JavaScript, then decoupled the logic into generator functions that yield state changes to the UI.]',
    challenges: '[Mention a challenge. e.g., Synchronizing the asynchronous delays (setTimeout) with the synchronous algorithm loops to create a smooth animation effect.]',
    solutions: '[How did you solve it? e.g., Refactored the algorithms to use async/await within a custom sleep function to halt execution precisely when a visual update was required.]',
    lessonsLearned: '[What did you learn? e.g., Solidified my foundational knowledge of Data Structures & Algorithms while gaining hands-on experience with native DOM manipulation.]',
    gallery: [
      '/placeholder-project.svg'
    ],
  },
  {
    id: 'university-management-system',
    title: '[University Management System]',
    description: 'A robust backend system designed to manage student records, course registrations, and faculty scheduling.',
    role: 'Backend Developer',
    year: '2023',
    category: ['Backend', 'University', 'Database'],
    stack: ['Node.js', 'Express', 'MySQL', 'JWT'],
    status: 'Completed',
    featured: false,
    github: '[https://github.com/yourusername/university-backend]',
    coverImage: '/placeholder-project.svg',
    overview: '[A highly normalized relational database and secure REST API designed to handle complex administrative operations for a university environment.]',
    problemStatement: '[Explain the problem. e.g., University administration required a normalized database system to prevent data anomalies during peak course registration periods.]',
    myRole: '[Detail your contribution. e.g., Designed the Entity-Relationship (ER) diagram, wrote complex SQL queries, and implemented JWT-based role authorization.]',
    developmentProcess: '[Describe the steps. e.g., Spent weeks exclusively on data modeling and normalization (up to 3NF) before writing a single line of backend routing logic.]',
    challenges: '[Mention a challenge. e.g., Designing the schema to handle complex many-to-many relationships, such as students registering for multiple courses with prerequisites.]',
    solutions: '[How did you solve it? e.g., Utilized junction tables and wrote stored procedures to encapsulate the complex prerequisite validation logic at the database level.]',
    lessonsLearned: '[What did you learn? e.g., Gained practical experience in database normalization (3NF), writing efficient SQL queries, and securing API endpoints.]',
    gallery: [
      '/placeholder-project.svg'
    ],
  },
]

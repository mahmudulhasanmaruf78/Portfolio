// lib/data/projects.ts

export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  role: string
  year: string
  category: string[]
  stack: string[]
  status: 'Completed' | 'In Progress' | 'Archived'
  featured: boolean
  github?: string
  demo?: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: 'capstone-project',
    title: '[Capstone Project Name]',
    description:
      'A comprehensive full-stack platform designed to [solve a specific problem, e.g., streamline campus recruitment]. Built with modern web technologies for high performance and scalability.',
    longDescription:
      'This application serves as my final-year engineering capstone project. It addresses the inefficiencies in [specific domain] by providing a centralized, intuitive platform. I led the architectural design and full-stack implementation, ensuring the system is both performant and easily maintainable. The backend utilizes [Technology] to handle complex relational data, while the frontend delivers a seamless, responsive experience using [Technology].',
    role: 'Full Stack Developer',
    year: '2025',
    category: ['Full Stack', 'University', 'Web App'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    status: 'In Progress',
    featured: true,
    github: '[https://github.com/yourusername/capstone]',
    demo: '[https://your-capstone-demo.vercel.app]',
    highlights: [
      'Architected a robust relational database schema capable of handling concurrent user transactions.',
      'Implemented secure authentication and role-based authorization flows.',
      'Optimized frontend rendering strategies (Server-Side Rendering and Static Site Generation) to achieve high Lighthouse performance scores.',
      'Designed a scalable component library using Tailwind CSS for consistent UI across the platform.',
    ],
  },
  {
    id: 'ecommerce-platform',
    title: '[E-Commerce Storefront]',
    description:
      'A modern e-commerce storefront featuring a fully functional shopping cart, secure checkout process, and an intuitive product filtering system.',
    longDescription:
      'Developed a modern e-commerce web application to deepen my understanding of state management and payment gateway integrations. The platform provides a seamless shopping experience from product discovery to secure checkout. By utilizing [Technology, e.g., Redux Toolkit or Zustand], I managed complex client-side state for the shopping cart and user sessions. The project demonstrates my ability to build consumer-facing applications that prioritize user experience and security.',
    role: 'Frontend Developer',
    year: '2024',
    category: ['Frontend', 'Personal', 'E-Commerce'],
    stack: ['React', 'Redux', 'Styled Components', 'Stripe API', 'Firebase'],
    status: 'Completed',
    featured: true,
    github: '[https://github.com/yourusername/ecommerce]',
    demo: '[https://your-ecommerce-demo.vercel.app]',
    highlights: [
      'Integrated Stripe API to facilitate secure, simulated payment processing and order management.',
      'Engineered a highly responsive product filtering and search system, reducing product discovery time.',
      'Implemented efficient client-side state management for the shopping cart to ensure persistence across sessions.',
      'Leveraged Firebase for real-time inventory updates and user authentication.',
    ],
  },
  {
    id: 'task-management-dashboard',
    title: '[Task Management Dashboard]',
    description:
      'A productivity application enabling users to organize tasks, manage project boards, and track progress with interactive data visualization.',
    longDescription:
      'Created a comprehensive task management dashboard inspired by industry-leading productivity tools. This project was built to master complex UI interactions and data visualization in React. The application allows users to create tasks, organize them into Kanban boards, and view productivity metrics through interactive charts. I focused heavily on creating fluid drag-and-drop interactions and ensuring the application remains responsive across all devices.',
    role: 'Frontend Developer',
    year: '2024',
    category: ['Frontend', 'Personal', 'Dashboard'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Chart.js'],
    status: 'Completed',
    featured: true,
    github: '[https://github.com/yourusername/task-dashboard]',
    demo: '[https://your-dashboard-demo.vercel.app]',
    highlights: [
      'Developed complex, performant drag-and-drop interactions for Kanban board task management.',
      'Integrated Chart.js to provide users with interactive, visual insights into their productivity metrics.',
      'Utilized Framer Motion to implement fluid micro-interactions and page transitions, enhancing overall UX.',
      'Designed a deeply customizable, responsive UI system using Tailwind CSS.',
    ],
  },
  {
    id: 'algorithm-visualizer',
    title: '[Algorithm Visualizer]',
    description:
      'An educational tool that visually demonstrates how popular sorting and pathfinding algorithms execute in real-time.',
    longDescription:
      'Built an interactive algorithm visualizer as an educational resource to help computer science students better understand fundamental algorithms. The application visually demonstrates the step-by-step execution of sorting algorithms (like Quick Sort and Merge Sort) and pathfinding algorithms (like Dijkstra\'s and A*). This project challenged me to manage complex application state and optimize rendering performance to handle rapid DOM updates without lagging.',
    role: 'Frontend Developer',
    year: '2023',
    category: ['Frontend', 'University', 'Educational'],
    stack: ['JavaScript', 'HTML5', 'CSS3', 'Algorithms'],
    status: 'Completed',
    featured: false,
    github: '[https://github.com/yourusername/algo-visualizer]',
    demo: '[https://your-algo-visualizer.vercel.app]',
    highlights: [
      'Implemented core CS algorithms from scratch, ensuring accurate visual representation of execution steps.',
      'Optimized rendering loops to handle high-frequency UI updates during algorithm visualization.',
      'Designed intuitive controls allowing users to adjust algorithm speed and dynamically generate new datasets.',
    ],
  },
  {
    id: 'university-management-system',
    title: '[University Management System]',
    description:
      'A robust backend system designed to manage student records, course registrations, and faculty scheduling for a university environment.',
    longDescription:
      'Developed as part of the Database Management Systems coursework, this project focuses entirely on backend architecture and database design. I architected a normalized relational database capable of handling complex queries related to student enrollment, grade tracking, and course prerequisite validation. The backend API provides secure endpoints for administrative operations, emphasizing data integrity and efficient query performance.',
    role: 'Backend Developer',
    year: '2023',
    category: ['Backend', 'University', 'Database'],
    stack: ['Node.js', 'Express', 'MySQL', 'JWT'],
    status: 'Completed',
    featured: false,
    github: '[https://github.com/yourusername/university-backend]',
    highlights: [
      'Designed a highly normalized MySQL database schema to ensure data integrity across multiple related entities.',
      'Developed secure RESTful API endpoints with JWT-based authentication and role-based access control (RBAC).',
      'Wrote complex SQL queries and stored procedures for generating academic transcripts and validating course prerequisites.',
    ],
  },
]

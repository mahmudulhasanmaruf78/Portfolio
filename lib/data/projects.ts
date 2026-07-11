// lib/data/projects.ts

export interface TechItem {
  name: string
  icon: string
  color: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  techStack: TechItem[]
  myRole: {
    title: string
    contributions: string[]
  }
  lifecycleSteps: {
    phase: string
    details: string
  }[]
  visualThoughtProcess: {
    title: string
    description: string
    image: string
  }[]
  githubLink: string
  liveLink: string
}

export const projects: Project[] = [
  {
    id: "job-portal",
    title: "Job Portal Web Application",
    tagline: "A multi-tier platform for managing job applications and tracking candidates.",
    description: "We built this platform for our Web Technologies course at AIUB. It connects employers and job seekers, allowing employers to post roles and track applicants through a centralized dashboard.",
    techStack: [
      { name: "PHP", icon: "SiPhp", color: "#777BB4" },
      { name: "MySQL", icon: "DiMysql", color: "#4479A1" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
      { name: "Chart.js", icon: "SiChartdotjs", color: "#FF6384" },
      { name: "Bootstrap", icon: "SiBootstrap", color: "#7952B3" }
    ],
    myRole: {
      title: "Backend Engineer",
      contributions: [
        "I built the employer dashboard to display applicant details in a dynamic data table.",
        "I wrote an AJAX system to update application statuses (Reviewed, Shortlisted, Rejected) dynamically without reloading the page.",
        "I integrated Chart.js to generate horizontal funnel charts representing candidate distributions.",
        "I created an administrative panel feature allowing admins to soft-delete job listings by changing the database status to closed."
      ]
    },
    lifecycleSteps: [
      {
        phase: "Phase 1: Architecture and Database Design",
        details: "We designed the relational database schema and structured our application using a Model View Controller pattern."
      },
      {
        phase: "Phase 2: Controller Implementation",
        details: "We wrote PHP controllers to manage data requests and isolate database queries inside specific repository files."
      },
      {
        phase: "Phase 3: Security Integration",
        details: "We secured our API endpoints by validating PHP sessions and verifying user roles before processing database updates."
      }
    ],
    visualThoughtProcess: [
      {
        title: "Project Banner",
        description: "A high-level preview showcasing the Job Portal's core interface and design language.",
        image: "/images/projects/job-portal-banner.png"
      },
      {
        title: "System Architecture Diagram",
        description: "Our structural layout mapping the separation of controllers, models, and views.",
        image: "/images/projects/job-portal-architecture.png"
      },
      {
        title: "Application Tracking Dashboard",
        description: "The employer interface I developed, displaying the interactive status selector and the Chart.js visual data funnel.",
        image: "/images/projects/Application-Tracking-Dashboard.png"
      },
      {
        title: "Admin Job Management Panel",
        description: "The administrative interface I built, displaying total job statistics and the soft-delete controls.",
        image: "/images/projects/admin-panel.png"
      }
    ],
    githubLink: "https://github.com/mahmudulhasanmaruf78/Web_Project_Spring_25_26_G6",
    liveLink: ""
  },
  {
    id: "cyclonesafe",
    title: "CycloneSafe – Disaster Preparedness & Cyclone Safety Planning System",
    tagline: "A complete Software Engineering lifecycle project applying Agile Scrum to design a cyclone safety platform.",
    description: "CycloneSafe is an academic Software Engineering project focused on designing a comprehensive disaster preparedness platform for cyclone-prone communities. The project covers the full SDLC — from requirements gathering and UML modeling to risk assessment, budgeting, and Scrum-based project management — demonstrating industry-standard engineering practices without a production implementation.",
    techStack: [
      { name: "Figma", icon: "SiFigma", color: "#F24E1E" },
      { name: "ClickUp", icon: "SiClickup", color: "#7B68EE" },
      { name: "Draw.io", icon: "SiDiagramsdotnet", color: "#F08705" },
      { name: "Git", icon: "SiGit", color: "#F05032" },
      { name: "GitHub", icon: "SiGithub", color: "#ffffff" },
      { name: "PowerPoint", icon: "SiMicrosoftpowerpoint", color: "#B7472A" },
      { name: "Word", icon: "SiMicrosoftword", color: "#2B579A" }
    ],
    myRole: {
      title: "Project Planner & Documentation Lead",
      contributions: [
        "Led software project planning and defined the full project scope, objectives, and requirements.",
        "Prepared comprehensive Software Development Life Cycle (SDLC) documentation following industry standards.",
        "Designed UML diagrams (Use Case, Activity, Sequence, and Class Diagrams) using Draw.io.",
        "Conducted budgeting, cost estimation, and financial feasibility analysis for the proposed system.",
        "Performed risk identification, assessment, and mitigation planning across all project phases.",
        "Created the Work Breakdown Structure (WBS) and effort estimation for all deliverables.",
        "Managed Scrum artifacts including backlog, sprint planning, and Agile workflow documentation.",
        "Designed and delivered the project presentation materials and maintained version control via Git & GitHub."
      ]
    },
    lifecycleSteps: [
      {
        phase: "Phase 1: Requirements & Scope Definition",
        details: "Gathered functional and non-functional requirements, defined project scope, objectives, and conducted stakeholder analysis to understand the needs of disaster-affected communities."
      },
      {
        phase: "Phase 2: System Design & UML Modeling",
        details: "Produced comprehensive UML diagrams including Use Case, Activity, Sequence, and Class Diagrams using Draw.io to model the system architecture and behavior."
      },
      {
        phase: "Phase 3: Agile Planning & Risk Management",
        details: "Applied Scrum methodology to define sprints and backlog items. Conducted full risk assessment with mitigation strategies and produced a Work Breakdown Structure with effort estimates."
      },
      {
        phase: "Phase 4: Documentation & Presentation",
        details: "Compiled all engineering artifacts into a formal Software Engineering report and designed a structured presentation to communicate findings and system design to stakeholders."
      }
    ],
    visualThoughtProcess: [
      {
        title: "Project Banner",
        description: "A cyclone-themed banner representing the disaster preparedness focus of the CycloneSafe planning project.",
        image: "/image/Custom cyclone-themed banner.png"
      }
    ],
    githubLink: "https://github.com/mahmudulhasanmaruf78/Software-project-CycloneSafe",
    liveLink: "/Software Project.pdf"
  }
];

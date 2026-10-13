export const profiles = {
  sravanimedagam: {
    name: "Sravani Medagam",
    title: "Full-Stack Software Engineer",
    location: "Fullerton, CA",
    email: "sravanimedagam0709@gmail.com",
    phone: "657-631-7877",
    resumeUrl: "/Sravani_Medagam_Resume.pdf",
    resumeDownloadUrl: "/Sravani_Medagam_Resume.pdf",
    links: {
      linkedin: "https://www.linkedin.com/in/sravanireddy-medagam-364190354",
      github: "https://github.com/Sravani-Developer",
      portfolio: "https://sravani-portfolio-three.vercel.app/"
    },
    githubUsername: "Sravani-Developer",
    githubFeaturedRepos: [
      {
        repo: "project-3",
        displayName: "EventLens",
        description:
          "Event discovery and RSVP platform with role-based workflows for admins, organizers, and users."
      },
      {
        repo: "sravani_portfolio",
        displayName: "Developer Portfolio Website",
        description:
          "React and Vite portfolio with admin dashboard, contact management, visitor tracking, and GitHub activity."
      },
      {
        repo: "Develevate-ai",
        displayName: "DevElevate AI",
        description:
          "Full-stack AI-powered career preparation SaaS with resume analysis, mock interviews, roadmaps, analytics, and coding practice."
      }
    ],
    summary:
      "Full-Stack Software Engineer with 4+ years of experience building secure, scalable applications with React, TypeScript, Python, FastAPI, Node.js, PostgreSQL, MongoDB, and AWS. Experienced in multi-tenant architecture, RESTful API and database design, logistics workflow automation, production systems serving 6,000+ users, and mentoring junior developers.",
    tagline:
      "I build secure, production-ready web applications with React, TypeScript, Python, FastAPI, Node.js, PostgreSQL, and AWS.",
    openTo:
      "Open to Full-Stack Software Engineer, Frontend Developer, and Web Developer roles.",
    highlights: [
      {
        value: "4+",
        label: "Years of full-stack development"
      },
      {
        value: "6K+",
        label: "Users served by production apps"
      },
      {
        value: "40+",
        label: "REST APIs built and maintained"
      },
      {
        value: "6",
        label: "Junior developers mentored"
      }
    ],
    skills: [
      {
        label: "Frontend",
        items: [
          "React.js",
          "Next.js",
          "Angular",
          "AngularJS",
          "JavaScript (ES6+)",
          "TypeScript",
          "Tailwind CSS",
          "HTML5",
          "CSS3",
          "SASS",
          "Bootstrap",
          "Responsive Design"
        ]
      },
      {
        label: "Backend",
        items: [
          "Python",
          "FastAPI",
          "Node.js",
          "Express.js",
          "REST APIs",
          "Authentication & Authorization",
          "JWT",
          "Session Management"
        ]
      },
      {
        label: "Databases",
        items: [
          "MongoDB",
          "MongoDB Atlas",
          "Mongoose",
          "PostgreSQL",
          "SQLAlchemy",
          "MySQL",
          "Data Modeling"
        ]
      },
      {
        label: "Cloud & DevOps",
        items: [
          "AWS",
          "Git",
          "GitHub",
          "CI/CD",
          "Vercel",
          "Render"
        ]
      },
      {
        label: "Tools",
        items: [
          "Postman",
          "VS Code",
          "Docker",
          "npm",
          "Nodemon"
        ]
      }
    ],
    experience: [
      {
        role: "Freelance Full-Stack Software Engineer",
        org: "SMS Logistics / CIX Tech (In-House Software Team)",
        location: "Remote",
        dates: "May 2026 - September 2026",
        summary:
          "Developed and enhanced full-stack web applications for logistics operations and workforce management, focusing on scalable backend services, secure multi-tenant architecture, and intuitive user experiences. Collaborated with the internal development team to translate operational requirements into reliable, maintainable software solutions.",
        tags: [
          "Python",
          "FastAPI",
          "React.js",
          "TypeScript",
          "PostgreSQL",
          "SQLAlchemy",
          "REST APIs",
          "Tailwind CSS"
        ],
        bullets: [
          "Developed Python and FastAPI backend services for CIX Attendance, a multi-tenant workforce management platform supporting 3 organizations, 10 locations, and 100+ users.",
          "Designed RESTful APIs and PostgreSQL-backed workflows for employee attendance, trip management, and operational reporting.",
          "Implemented organization-scoped authorization and server-side role validation to enforce secure access boundaries across organizations and locations.",
          "Built validation mechanisms to prevent duplicate check-ins and automatically classify incomplete attendance records, improving operational consistency.",
          "Built responsive React and TypeScript interfaces for a logistics website, including an interactive five-step freight estimator.",
          "Integrated geocoding, route-distance calculations, and vehicle recommendations to streamline freight estimation."
        ]
      },
      {
        role: "Full Stack Web Developer",
        org: "Eazy Refund Consultancy LLP",
        location: "Hyderabad, India",
        dates: "September 2020 - January 2025",
        tags: [
          "React.js",
          "AngularJS",
          "Node.js",
          "Express.js",
          "MongoDB",
          "AWS",
          "Payment Gateways",
          "Agile"
        ],
        bullets: [
          "Developed and scaled 5 business-critical web applications serving 6,000+ users across tax, compliance, customer onboarding, document management, and payment-processing workflows.",
          "Led migration of legacy AngularJS applications to React, modernizing frontend architecture and improving maintainability, scalability, and developer productivity.",
          "Architected and maintained 40+ RESTful APIs using Node.js, Express.js, and MongoDB for authentication, onboarding, payment processing, workflow automation, reporting, and document management.",
          "Integrated secure payment gateways and third-party business services supporting thousands of customer transactions annually across multiple platforms.",
          "Deployed and maintained production applications on AWS, managing releases, monitoring system health, troubleshooting production issues, and ensuring platform reliability.",
          "Mentored 6 junior developers through code reviews, technical guidance, and knowledge-sharing while contributing to Agile planning and project delivery."
        ]
      }
    ],
    projects: [
      {
        title: "Logistics & Workforce Management Platforms",
        subtitle: "Python, FastAPI, React, TypeScript, PostgreSQL, SQLAlchemy, Tailwind CSS",
        description:
          "Full-stack logistics and workforce software spanning multi-tenant attendance operations and an interactive freight-estimation experience.",
        role:
          "Freelance full-stack engineer collaborating with the SMS Logistics / CIX Tech in-house software team.",
        problem:
          "Operations teams needed secure organization-scoped workforce workflows and a simpler way for customers to estimate freight requirements online.",
        impact:
          "Supported 3 organizations, 10 locations, and 100+ users while streamlining freight estimation through route calculations and vehicle recommendations.",
        architecture:
          "React and TypeScript interfaces connected to Python/FastAPI REST services with PostgreSQL, SQLAlchemy, server-side role validation, and organization-scoped authorization.",
        image: "/sms-logistics.png",
        links: {
          live: "https://smslogisticsin.com/"
        },
        tags: [
          "Python",
          "FastAPI",
          "React",
          "TypeScript",
          "PostgreSQL",
          "SQLAlchemy",
          "Multi-Tenant Architecture",
          "Tailwind CSS"
        ],
        highlights: [
          "Multi-tenant workforce platform supporting 3 organizations, 10 locations, and 100+ users",
          "Organization-scoped authorization and server-side role validation",
          "Duplicate check-in prevention and incomplete-attendance classification",
          "Five-step freight estimator with geocoding, route distance, and vehicle recommendations"
        ],
        bullets: [
          "Designed RESTful attendance, trip-management, and operational-reporting workflows backed by PostgreSQL.",
          "Enforced access boundaries across organizations and locations through scoped authorization and role validation.",
          "Built responsive logistics interfaces and automated freight-estimation workflows using React and TypeScript."
        ]
      },
      {
        title: "EventLens - Event Discovery & Management Platform",
        subtitle: "React, Node.js, Express.js, MongoDB, Render, MongoDB Atlas",
        description:
          "Full-stack event discovery platform enabling users to discover, create, manage, and RSVP to local events.",
        role:
          "Full-stack developer responsible for frontend workflows, backend APIs, authentication, and deployment.",
        problem:
          "Local event users needed one place to discover events, RSVP, and manage organizer/admin workflows securely.",
        impact:
          "Delivered complete user, organizer, and admin flows with RSVP validation, protected access, and production deployment.",
        architecture:
          "React frontend connected to an Express.js REST API, backed by MongoDB Atlas and deployed on Render.",
        image: "/eventlens.png",
        links: {
          github: "https://github.com/Sravani-Developer/project-3.git",
          live: "https://eventlens-86zi.onrender.com"
        },
        tags: ["React", "Node.js", "Express.js", "MongoDB", "RBAC", "PWA"],
        highlights: [
          "Event discovery, creation, management, and RSVP workflows",
          "Session authentication, bcrypt hashing, protected routes, and RBAC",
          "REST APIs for events, RSVPs, attendee tracking, and user accounts",
          "Search/filtering, RSVP validation, organizer dashboards, and PWA support"
        ],
        bullets: [
          "Developed a full-stack event discovery platform enabling users to discover, create, manage, and RSVP to local events.",
          "Implemented session authentication, bcrypt password hashing, protected routes, and role-based access control.",
          "Built RESTful APIs for event management, RSVP processing, attendee tracking, and user account management.",
          "Developed search and filtering, RSVP validation, organizer dashboards, PWA support, and backend security practices."
        ]
      },
      {
        title: "Developer Portfolio Platform",
        subtitle: "React, Vite, Node.js, MongoDB Atlas, Vercel, Render",
        description:
          "Full-stack portfolio platform with an admin dashboard for projects, contact inquiries, and visitor analytics.",
        role:
          "Sole developer responsible for frontend, backend API, admin dashboard, database persistence, and cloud deployment.",
        problem:
          "The portfolio needed to move beyond a static resume page and support live project updates, contact tracking, and visitor insight.",
        impact:
          "Added CMS-style project management, contact message tracking, visitor analytics, GitHub activity, and production persistence.",
        architecture:
          "React/Vite frontend on Vercel -> Node.js REST API on Render -> MongoDB Atlas for projects, contacts, and analytics events.",
        image: "/portfolio.png",
        links: {
          github: "https://github.com/Sravani-Developer/sravani_portfolio.git",
          live: "https://sravani-portfolio-three.vercel.app/"
        },
        tags: ["React", "Vite", "Node.js", "MongoDB Atlas", "JWT", "GitHub API"],
        highlights: [
          "Admin dashboard for projects, contact inquiries, and visitor analytics",
          "JWT authentication and protected admin routes",
          "MongoDB-backed content management and secure API integrations",
          "GitHub API integration, event tracking, and cloud deployment"
        ],
        bullets: [
          "Developed a full-stack portfolio platform with an admin dashboard for projects, contact inquiries, and visitor analytics.",
          "Implemented JWT authentication, protected admin routes, MongoDB-backed content management, and secure API integrations.",
          "Built project management, contact management, visitor analytics, event tracking, and GitHub API integration modules.",
          "Deployed the frontend on Vercel and backend services on Render using scalable cloud deployment practices."
        ]
      },
      {
        title: "DevElevate AI - Career Preparation SaaS Platform",
        subtitle:
          "Next.js, React, TypeScript, Node.js, Express.js, Redis, Docker, JWT",
        description:
          "Full-stack AI-powered career preparation SaaS platform for resume analysis, mock interview practice, personalized roadmaps, analytics, and coding challenge preparation.",
        role:
          "Full-stack developer responsible for product workflows, frontend dashboards, backend modules, database schema, authentication, testing, CI/CD, and production deployment.",
        problem:
          "Job seekers need one platform to practice interviews, improve resumes, follow role-specific roadmaps, and build coding confidence across technical and non-technical career paths.",
        impact:
          "Delivered an end-to-end deployed SaaS-style platform with real authentication, database persistence, role-aware preparation flows, analytics, and production-friendly fallback handling.",
        architecture:
          "Next.js and React frontend connected to Node.js and Express.js REST APIs, with Redis-backed infrastructure and Docker-based development workflows.",
        image: "/develevate.png",
        links: {
          github: "https://github.com/Sravani-Developer/Develevate-ai.git",
          live: "https://develevate-ai-api.vercel.app/"
        },
        tags: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Express.js",
          "Redis",
          "JWT",
          "Docker"
        ],
        highlights: [
          "JWT authentication with refresh-token session handling and secure cookies",
          "Resume analyzer with ATS-style scoring, job-description matching, and missing skill detection",
          "Mock interview practice with role, stack, focus, and difficulty-based questions plus feedback scoring",
          "Personalized roadmap generation for technical and non-technical roles",
          "Real-time coding room interface with role/topic-based challenges and local Docker execution",
          "GitHub Actions workflow with backend tests, frontend tests, type checks, E2E checks, and production builds"
        ],
        bullets: [
          "Built secure registration and login flows with JWT sessions, refresh tokens, secure cookies, and persistent user data.",
          "Developed Node.js and Express.js backend modules for authentication, resume analysis, interviews, roadmaps, analytics, coding rooms, and administrative workflows.",
          "Implemented resume analysis workflows with ATS-style scoring, job-description matching, matched skills, and missing skill detection.",
          "Created mock interview and roadmap flows that adapt to role, technology stack, focus area, and difficulty level.",
          "Built analytics dashboards using Recharts to track interview score and resume progress across user activity.",
          "Added a coding room experience with Monaco Editor, Socket.IO, role/topic-based challenge generation, local review feedback, and Docker-based local execution for JavaScript, TypeScript, Python, Java, and C++.",
          "Configured Docker-based development workflows and added GitHub Actions CI/CD checks for application quality and deployment readiness."
        ]
      },
      {
        title: "Lead.AI SMART Capstone - AI Business Strategy & Product Validation",
        subtitle:
          "Westcliff University | Customer Discovery, Product Validation, Strategic Roadmapping",
        description:
          "Pilot-first business strategy for an AI-assisted solution designed to help small businesses organize customer inquiries, improve follow-up efficiency, and recover missed opportunities.",
        role:
          "Team member focused on problem analysis, stakeholder research, product validation, and strategic recommendations.",
        problem:
          "Small businesses often receive inquiries through disconnected channels, creating delayed responses, inconsistent follow-up, missed bookings, and limited visibility into lead status.",
        impact:
          "Recommended a focused 90-day pilot for appointment-based salon and beauty businesses, supported by measurable response, lead-recovery, booking-recovery, and approval metrics. The sponsor confirmed that the final direction aligned with Lead.AI's expectations.",
        image: "/lead-ai-concept.png",
        tags: [
          "AI Strategy",
          "Business Analysis",
          "Product Validation",
          "Customer Discovery",
          "Stakeholder Analysis",
          "Strategic Roadmapping"
        ],
        bullets: [
          "Analyzed delayed follow-up, fragmented customer inquiries, and missed revenue opportunities across calls, messages, websites, and social media.",
          "Contributed to customer discovery, stakeholder analysis, competitive research, project scoping, assumption testing, and risk identification.",
          "Recommended a human-reviewed AI workflow for inquiry organization, response suggestions, follow-up tracking, and business-owner approval.",
          "Helped identify appointment-based salon and beauty businesses as a focused pilot segment with clear, time-sensitive, and measurable workflows.",
          "Defined success metrics and contributed to a 90-day roadmap, weekly milestone reports, executive presentations, case-study documentation, and sponsor-facing deliverables."
        ]
      }
    ],
    education: [
      {
        degree: "Master's in Computer Science (Web Development)",
        school: "Westcliff University",
        dates: "March 2025 - August 2026",
        gpa: "3.9"
      },
        {
        degree: "Master's in Computer Science",
        school: "Sri Krishnadevaraya University",
        dates: "June 2019 - July 2021",
        cgpa: "7.65"
      },
    ]
  },

  demo: {
    name: "Jordan Rivera",
    title: "Principal Product Engineer",
    location: "Austin, TX",
    email: "jordan.rivera@example.com",
    phone: "+1 512 555 0199",
    resumeUrl: "/resumes/demo.pdf",
    links: {
      linkedin: "https://www.linkedin.com/in/jordan-rivera",
      github: "https://github.com/jordanrivera"
    },
    summary:
      "Principal engineer with 10+ years building product platforms, leading cross-functional teams, and shipping customer-facing experiences. Strong at system design, mentoring, and turning business goals into measurable outcomes across web, data, and ML products.",
    skills: [
      {
        label: "Product Engineering",
        items: [
          "System Design",
          "Product Strategy",
          "Technical Leadership",
          "UX Collaboration",
          "Performance Optimization"
        ]
      },
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Design Systems", "Accessibility"]
      },
      {
        label: "Backend",
        items: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis"]
      },
      {
        label: "Cloud",
        items: ["AWS", "Docker", "CI/CD", "Observability"]
      }
    ],
    experience: [
      {
        role: "Principal Product Engineer",
        org: "Nova Labs",
        location: "Remote",
        dates: "2022 - Present",
        bullets: [
          "Led a redesign of the flagship analytics platform, improving activation by 28%.",
          "Built a shared design system and component library adopted by 6 teams.",
          "Implemented performance budgets that reduced core page load time by 35%."
        ]
      },
      {
        role: "Senior Software Engineer",
        org: "Helios Health",
        location: "Austin, TX",
        dates: "2018 - 2022",
        bullets: [
          "Owned the patient onboarding workflow, raising completion rate by 18%.",
          "Designed scalable API contracts for partner integrations and data sync.",
          "Mentored 4 engineers and led weekly architecture reviews."
        ]
      }
    ],
    education: [
      {
        degree: "B.S. in Computer Science",
        school: "University of Texas at Austin",
        dates: "2011 - 2015",
        gpa: "3.8"
      }
    ],
    projects: [
      {
        title: "Pulseboard",
        subtitle: "Real-time product analytics dashboard",
        description:
          "Built a streaming analytics dashboard with role-based insights and alerting for growth teams.",
        link: "https://example.com/pulseboard"
      },
      {
        title: "CarePath",
        subtitle: "Healthcare onboarding workflow",
        description:
          "Delivered a guided intake flow that cut drop-offs and improved patient satisfaction."
      }
    ],
    certifications: [
      {
        title: "AWS Certified Solutions Architect - Associate",
        subtitle: "Amazon Web Services"
      },
      {
        title: "Certified ScrumMaster",
        subtitle: "Scrum Alliance"
      }
    ],
    publications: [
      {
        title: "Designing Product Analytics at Scale",
        subtitle: "Product Engineering Journal, 2023",
        description:
          "A practical framework for building analytics systems that balance speed, governance, and cost.",
        link: "https://example.com/analytics-at-scale"
      }
    ],
    awards: [
      {
        title: "Engineering Excellence Award",
        subtitle: "Nova Labs, 2023"
      }
    ],
    achievements: [
      {
        title: "Speaker, Product Ops Summit",
        subtitle: "2024"
      }
    ]
  }
};

export const defaultProfileKey = "sravanimedagam";

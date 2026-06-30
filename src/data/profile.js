export const profiles = {
  sravanimedagam: {
    name: "Sravani Medagam",
    title: "Full Stack Engineer",
    location: "United States",
    email: "sravanimedagam0709@gmail.com",
    phone: "657-631-7877",
    resumeUrl: "/Sravani_Medagam_Resume.pdf",
    resumeDownloadUrl: "/Sravani_Medagam_Resume.pdf",
    links: {
      linkedin: "https://www.linkedin.com/in/sravanireddy-medagam-364190354",
      github: "https://github.com/Sravani-Developer",
      portfolio: "https://github.com/Sravani-Developer"
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
      }
    ],
    summary:
      "Full Stack Engineer with 4.5+ years of experience building scalable web applications using React.js, Next.js, Node.js, MongoDB, PostgreSQL, and AWS. Experienced in developing production applications serving 6,000+ users, designing RESTful APIs, integrating payment gateways, modernizing AngularJS applications, and mentoring junior developers.",
    tagline:
      "I build production-ready full-stack applications with React.js, Node.js, MongoDB, PostgreSQL, and AWS.",
    openTo:
      "Open to Full-Stack Software Engineer, Frontend Developer, and Web Developer roles.",
    highlights: [
      {
        value: "4.5+",
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
        role: "Full Stack Engineer",
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
      }
    ],
    education: [
      {
        degree: "Master's in Computer Science (Web Development)",
        school: "Westcliff University",
        dates: "March 2025 - August 2026",
        gpa: "3.89"
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

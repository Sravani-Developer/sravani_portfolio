from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Sravani_Medagam_Resume.pdf"

NAVY = colors.HexColor("#15233A")
BLUE = colors.HexColor("#1D5FA7")
SLATE = colors.HexColor("#38465A")
MUTED = colors.HexColor("#64748B")
RULE = colors.HexColor("#CBD5E1")


class ResumeDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=LETTER,
            leftMargin=0.48 * inch,
            rightMargin=0.48 * inch,
            topMargin=0.42 * inch,
            bottomMargin=0.42 * inch,
            title="Sravani Medagam - Full-Stack Software Engineer Resume",
            author="Sravani Medagam",
            subject="Full-Stack Software Engineer Resume",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="resume", frames=[frame], onPage=self._footer))

    @staticmethod
    def _footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.35)
        canvas.line(doc.leftMargin, 0.31 * inch, LETTER[0] - doc.rightMargin, 0.31 * inch)
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(MUTED)
        canvas.drawString(doc.leftMargin, 0.18 * inch, "Sravani Medagam | Full-Stack Software Engineer")
        canvas.drawRightString(LETTER[0] - doc.rightMargin, 0.18 * inch, f"Page {doc.page}")
        canvas.restoreState()


styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=20,
    leading=22,
    textColor=NAVY,
    alignment=TA_CENTER,
    spaceAfter=2,
)
title_style = ParagraphStyle(
    "Title",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.3,
    leading=11,
    textColor=BLUE,
    alignment=TA_CENTER,
    spaceAfter=3,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.7,
    leading=9.5,
    textColor=SLATE,
    alignment=TA_CENTER,
    spaceAfter=6,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.2,
    leading=11,
    textColor=NAVY,
    borderColor=BLUE,
    borderWidth=0,
    borderPadding=0,
    spaceBefore=5,
    spaceAfter=3,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.7,
    leading=9.8,
    textColor=SLATE,
    spaceAfter=2,
)
job_style = ParagraphStyle(
    "Job",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=8.4,
    leading=10,
    textColor=NAVY,
    spaceBefore=2,
    spaceAfter=1,
)
meta_style = ParagraphStyle(
    "Meta",
    parent=body_style,
    fontName="Helvetica-Oblique",
    fontSize=7.4,
    leading=9,
    textColor=MUTED,
    spaceAfter=2,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=10,
    firstLineIndent=-6,
    bulletIndent=0,
    spaceAfter=1.2,
)
skills_style = ParagraphStyle(
    "Skills",
    parent=body_style,
    fontSize=7.4,
    leading=9.4,
    spaceAfter=1,
)


def section(title):
    return [
        Paragraph(title.upper(), section_style),
        Spacer(1, -1),
        RuleFlowable(),
        Spacer(1, 2),
    ]


class RuleFlowable(Spacer):
    def __init__(self):
        super().__init__(1, 1)

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return availWidth, self.height

    def draw(self):
        self.canv.setStrokeColor(BLUE)
        self.canv.setLineWidth(0.55)
        self.canv.line(0, 0.5, self.width, 0.5)


def bullet(text):
    return Paragraph(f"- {text}", bullet_style)


def job(role, dates, company, location, bullets):
    content = [
        Paragraph(f"{role} <font color='#64748B'>| {dates}</font>", job_style),
        Paragraph(f"{company} | {location}", meta_style),
    ]
    content.extend(bullet(item) for item in bullets)
    return KeepTogether(content)


def project(title, stack, bullets, links=None):
    link_text = f" | {links}" if links else ""
    content = [
        Paragraph(f"{title}<font color='#64748B'>{link_text}</font>", job_style),
        Paragraph(stack, meta_style),
    ]
    content.extend(bullet(item) for item in bullets)
    return KeepTogether(content)


story = [
    Paragraph("Sravani Medagam", name_style),
    Paragraph("FULL-STACK SOFTWARE ENGINEER | REACT | TYPESCRIPT | PYTHON | FASTAPI | NODE.JS", title_style),
    Paragraph(
        "657-631-7877 | "
        "<link href='mailto:sravanimedagam0709@gmail.com' color='#1D5FA7'>sravanimedagam0709@gmail.com</link> | "
        "<link href='https://www.linkedin.com/in/sravanireddy-medagam-364190354' color='#1D5FA7'>LinkedIn</link> | "
        "<link href='https://github.com/Sravani-Developer' color='#1D5FA7'>GitHub</link> | "
        "<link href='https://sravani-portfolio-three.vercel.app/' color='#1D5FA7'>Portfolio</link>",
        contact_style,
    ),
]

story += section("Professional Summary")
story.append(
    Paragraph(
        "Full-Stack Software Engineer with 4.5+ years of experience building secure, scalable web applications with React, TypeScript, Python, FastAPI, Node.js, PostgreSQL, MongoDB, and AWS. Experienced in multi-tenant architecture, RESTful API and database design, logistics workflow automation, authentication and authorization, production deployment, and systems serving 6,000+ users.",
        body_style,
    )
)

story += section("Technical Skills")
skills = [
    ("Languages & Frontend", "Python, JavaScript (ES6+), TypeScript, React.js, Next.js, Angular, AngularJS, HTML5, CSS3, Tailwind CSS, Bootstrap, SASS, Responsive Design"),
    ("Backend & APIs", "FastAPI, Node.js, Express.js, NestJS, REST APIs, Socket.IO, JWT, session management, authentication and authorization, RBAC, secure cookies"),
    ("Databases & ORM", "PostgreSQL, SQLAlchemy, MongoDB, MongoDB Atlas, MySQL, Prisma ORM, Mongoose, Redis, data modeling, query optimization"),
    ("Cloud, DevOps & Testing", "AWS, Docker, Git, GitHub Actions, CI/CD, Vercel, Render, Neon, Upstash, Jest, Vitest, Playwright, Postman"),
]
for label, items in skills:
    story.append(Paragraph(f"<b>{label}:</b> {items}", skills_style))

story += section("Professional Experience")
story.append(
    job(
        "Freelance Full-Stack Software Engineer",
        "May 2026 - September 2026",
        "SMS Logistics / CIX Tech (In-House Software Team)",
        "Remote",
        [
            "Developed Python/FastAPI services for CIX Attendance, a multi-tenant workforce platform supporting 3 organizations, 10 locations, and 100+ users.",
            "Designed RESTful APIs and PostgreSQL/SQLAlchemy workflows for employee attendance, trip management, and operational reporting.",
            "Implemented organization-scoped authorization and server-side role validation to enforce secure access boundaries across organizations and locations.",
            "Built validation to prevent duplicate check-ins and automatically classify incomplete attendance records, improving operational consistency.",
            "Built responsive React/TypeScript interfaces and a five-step freight estimator with geocoding, route-distance calculations, and vehicle recommendations.",
        ],
    )
)
story.append(Spacer(1, 2))
story.append(
    job(
        "Full Stack Engineer",
        "September 2020 - January 2025",
        "Eazy Refund Consultancy LLP",
        "Hyderabad, India",
        [
            "Developed and scaled 5 business-critical applications serving 6,000+ users across tax, compliance, onboarding, document management, and payment workflows.",
            "Led migration of legacy AngularJS applications to React, improving frontend maintainability, scalability, and developer productivity.",
            "Architected and maintained 40+ Node.js/Express/MongoDB REST APIs for authentication, onboarding, payments, reporting, and workflow automation.",
            "Integrated secure payment gateways and third-party services supporting thousands of customer transactions annually across multiple platforms.",
            "Deployed production applications on AWS and mentored 6 junior developers through reviews, technical guidance, and Agile delivery.",
        ],
    )
)

story += section("Selected Projects")
story.append(
    project(
        "Logistics & Workforce Management Platforms",
        "Python, FastAPI, React, TypeScript, PostgreSQL, SQLAlchemy, Tailwind CSS",
        [
            "Delivered secure multi-tenant attendance workflows and organization/location-scoped access controls for operational teams.",
            "Developed a responsive freight-estimation experience with geocoding, route distance, and vehicle recommendations.",
        ],
        "smslogisticsin.com",
    )
)
story.append(Spacer(1, 2))
story.append(
    project(
        "DevElevate AI - AI-Powered Career Preparation SaaS",
        "Next.js, React, TypeScript, NestJS, PostgreSQL, Prisma, Redis, Docker",
        [
            "Built resume analysis, mock interviews, career roadmaps, analytics, subscriptions, and role-aware coding practice in a deployed SaaS platform.",
            "Implemented JWT/refresh-token authentication, persistent data models, automated testing, GitHub Actions CI/CD, and cloud deployment.",
        ],
        "Live Demo | GitHub",
    )
)
story.append(Spacer(1, 2))
story.append(
    project(
        "EventLens - Event Discovery & Management Platform",
        "React.js, Node.js, Express.js, MongoDB, Mongoose, Render",
        [
            "Built event discovery, creation, RSVP, attendee tracking, search/filtering, organizer dashboards, and PWA functionality.",
            "Implemented session authentication, bcrypt hashing, RBAC, protected routes, validation, and production deployment.",
        ],
        "Live Demo | GitHub",
    )
)
story.append(Spacer(1, 2))
story.append(
    project(
        "Developer Portfolio Platform",
        "React.js, Vite, Node.js, Express.js, MongoDB Atlas, Vercel, Render",
        [
            "Engineered a portfolio CMS with JWT-secured project management, contact inquiries, visitor analytics, event tracking, and GitHub integration.",
            "Built protected REST APIs and deployed the frontend and backend with cloud-hosted persistence.",
        ],
        "Live Demo | GitHub",
    )
)

story += section("Education")
story.append(
    Paragraph(
        "<b>Master of Science in Computer Science - Web Development</b> <font color='#64748B'>| March 2025 - August 2026</font>",
        job_style,
    )
)
story.append(Paragraph("Westcliff University, California, USA | GPA: 3.9/4.0", meta_style))
story.append(
    Paragraph(
        "<b>Master of Science in Computer Science</b> <font color='#64748B'>| June 2019 - July 2021</font>",
        job_style,
    )
)
story.append(Paragraph("Sri Krishnadevaraya University, India | CGPA: 7.65/10", meta_style))

story += section("Additional Strengths")
story.append(
    Paragraph(
        "Agile development, SDLC, API security, performance optimization, debugging, code reviews, production support, cross-functional collaboration, stakeholder communication, and technical mentoring.",
        body_style,
    )
)

ResumeDocTemplate(str(OUTPUT)).build(story)
print(f"Generated {OUTPUT}")

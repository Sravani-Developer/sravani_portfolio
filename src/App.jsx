import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { profiles } from "./data/profile";
import Landing from "./components/Landing";

function getProfileFromQuery(search) {
  const params = new URLSearchParams(search);
  const rawKey = params.get("profile");
  const key = (rawKey || "").toLowerCase();
  const profile = key ? profiles[key] : null;
  return { profile, key, hasParam: Boolean(rawKey) };
}

function normalizeItem(item) {
  if (typeof item === "string") {
    return { title: item };
  }

  return {
    title: item.title || item.name || item.label || "Item",
    subtitle: item.subtitle || item.org || item.issuer || item.venue || item.year,
    description: item.description,
    link: item.link || item.url,
    tags: item.tags || [],
  };
}

function normalizeSkillItem(item) {
  if (typeof item === "string") {
    return { name: item, level: 85 };
  }

  return {
    name: item.name || item.title || item.label || "Skill",
    level: item.level || 85,
    icon: item.icon,
  };
}

export default function App() {
  const [profileState, setProfileState] = useState(() =>
    getProfileFromQuery(window.location.search)
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setProfileState(getProfileFromQuery(window.location.search));
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const { profile, hasParam } = profileState;

  if (!hasParam || !profile) {
    return <Landing />;
  }

  const navItems = [
    { label: "Home", href: "#home", icon: "home" },
    { label: "Summary", href: "#summary", icon: "article" },
  ];

  if (profile.experience?.length || profile.skills?.length) {
    navItems.push({ label: "Experience & Skills", href: "#experience-skills", icon: "analytics" });
  }
  if (profile.education?.length) {
    navItems.push({ label: "Education", href: "#education", icon: "school" });
  }
  if (profile.projects?.length) {
    navItems.push({ label: "Projects", href: "#projects", icon: "dashboard" });
  }
  if (profile.certifications?.length) {
    navItems.push({ label: "Certifications", href: "#certifications", icon: "verified" });
  }
  if (profile.publications?.length) {
    navItems.push({ label: "Publications", href: "#publications", icon: "menu_book" });
  }
  if (profile.awards?.length || profile.achievements?.length) {
    navItems.push({ label: "Achievements", href: "#achievements", icon: "emoji_events" });
  }
  if (profile.email || profile.phone || profile.links) {
    navItems.push({ label: "Contact", href: "#contact", icon: "mail" });
  }

  const skillGroups = useMemo(() => {
    return (profile.skills || [])
      .map((group) => ({
        label: group.label || "Skills",
        items: (group.items || []).map(normalizeSkillItem),
      }))
      .filter((group) => group.items.length > 0);
  }, [profile.skills]);

  const projects = (profile.projects || []).map(normalizeItem);
  const certifications = (profile.certifications || []).map(normalizeItem);
  const publications = (profile.publications || []).map(normalizeItem);
  const achievements = [...(profile.awards || []), ...(profile.achievements || [])].map(normalizeItem);

  return (
    <div className="resume-root">
      <div className="resume-layout">
        <aside className="resume-sidebar">
          <div className="resume-side-inner">
            <div className="resume-brand">
              <div>
                <h1 className="resume-brand-title">{profile.name}</h1>
                <p className="resume-brand-subtitle">{profile.title}</p>
              </div>
            </div>
            <nav className="resume-nav">
              {navItems.map((item) => (
                <a key={item.href} className="resume-nav-link" href={item.href}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="resume-social">
              {profile.links?.linkedin ? (
                <a className="resume-social-btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <span className="material-symbols-outlined">public</span>
                </a>
              ) : null}
              {profile.links?.github ? (
                <a className="resume-social-btn" href={profile.links.github} target="_blank" rel="noreferrer">
                  <span className="material-symbols-outlined">terminal</span>
                </a>
              ) : null}
              <button className="resume-social-btn" type="button">
                <span className="material-symbols-outlined">groups</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="resume-main">
          <div className="resume-container">
            <section className="resume-hero" id="home">
              <div className="resume-hero-inner">
                <div className="resume-hero-text">
                  <span className="resume-hero-eyebrow">{profile.title}</span>
                  <h1 className="resume-hero-title">{profile.name}</h1>
                </div>
                <div className="resume-hero-meta">
                  <span>
                    <span className="material-symbols-outlined">location_on</span>
                    {profile.location}
                  </span>
                  <span>
                    <span className="material-symbols-outlined">mail</span>
                    {profile.email}
                  </span>
                  <span>
                    <span className="material-symbols-outlined">phone_iphone</span>
                    {profile.phone}
                  </span>
                </div>
                <div className="resume-hero-actions">
                  {profile.resumeUrl ? (
                    <a
                      className="resume-btn resume-btn-secondary"
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View CV
                    </a>
                  ) : null}
                  <a className="resume-btn resume-btn-primary" href={`mailto:${profile.email}`}>
                    Contact Me
                  </a>
                </div>
              </div>
            </section>

            <section className="resume-section" id="summary">
              <h2 className="resume-section-title">Summary</h2>
              <div className="resume-summary">
                <p>{profile.summary}</p>
              </div>
            </section>

            {(profile.experience?.length || profile.skills?.length) && (
              <div className="resume-section resume-grid" id="experience-skills">
                {profile.experience?.length ? (
                  <section className="resume-experience" id="experience">
                    <h2 className="resume-section-title">Experience</h2>
                    <div className="resume-timeline">
                      {profile.experience.map((item) => (
                        <div key={`${item.role}-${item.org}`} className="resume-timeline-item">
                          <div className="resume-timeline-dot"></div>
                          <div className="resume-timeline-content">
                            <div className="resume-timeline-header">
                              <div>
                                <h3>{item.role}</h3>
                                <p className="resume-timeline-org">
                                  {item.org} - {item.dates}
                                </p>
                              </div>
                              <div className="resume-timeline-icon">
                                <span className="material-symbols-outlined">corporate_fare</span>
                              </div>
                            </div>
                            <ul>
                              {item.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}

                {skillGroups.length ? (
                  <section className="resume-skills" id="skills">
                    <h2 className="resume-section-title">Skills</h2>
                    <div className="resume-skill-groups">
                      {skillGroups.map((group) => (
                        <div key={group.label} className="resume-skill-group">
                          <h3 className="resume-skill-heading">
                            <span></span>
                            {group.label}
                          </h3>
                          <div className="resume-skill-list">
                            {group.items.map((item) => (
                              <span key={item.name} className="resume-skill-text">
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            )}

            {profile.education?.length ? (
              <section className="resume-section" id="education">
                <h2 className="resume-section-title">Education</h2>
                <div className="resume-education-grid">
                  {profile.education.map((item) => (
                    <div key={item.degree} className="resume-education-card">
                      <div className="resume-education-icon">
                        <span className="material-symbols-outlined">school</span>
                      </div>
                      <div>
                        <h3>{item.degree}</h3>
                        <p>{item.school}</p>
                        <p className="resume-education-meta">
                          {item.dates} - GPA {item.gpa}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {projects.length ? (
              <section className="resume-section" id="projects">
                <h2 className="resume-section-title">Projects</h2>
                <div className="resume-project-grid">
                  {projects.map((project) => (
                    <div key={project.title} className="resume-project-card">
                      <div className="resume-project-header">
                        <h3>{project.title}</h3>
                        <div className="resume-project-links">
                          {project.link ? (
                            <a href={project.link} target="_blank" rel="noreferrer">
                              <span className="material-symbols-outlined">open_in_new</span>
                            </a>
                          ) : null}
                        </div>
                      </div>
                      {project.description ? (
                        <p className="resume-project-description">{project.description}</p>
                      ) : null}
                      {project.tags?.length ? (
                        <div className="resume-project-tags">
                          {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {certifications.length ? (
              <section className="resume-section" id="certifications">
                <h2 className="resume-section-title">Certifications</h2>
                <div className="resume-cert-grid">
                  {certifications.map((cert) => (
                    <div key={cert.title} className="resume-cert-card">
                      <div className="resume-cert-icon">
                        <span className="material-symbols-outlined">verified</span>
                      </div>
                      <p className="resume-cert-title">{cert.title}</p>
                      {cert.subtitle ? (
                        <p className="resume-cert-subtitle">{cert.subtitle}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {publications.length ? (
              <section className="resume-section" id="publications">
                <h2 className="resume-section-title">Publications</h2>
                <div className="resume-publications">
                  {publications.map((pub) => (
                    <div key={pub.title} className="resume-publication-card">
                      <div className="resume-publication-header">
                        <h3>{pub.title}</h3>
                        {pub.link ? (
                          <a href={pub.link} target="_blank" rel="noreferrer">
                            DOI
                            <span className="material-symbols-outlined">open_in_new</span>
                          </a>
                        ) : null}
                      </div>
                      {pub.subtitle ? (
                        <p className="resume-publication-subtitle">{pub.subtitle}</p>
                      ) : null}
                      {pub.description ? (
                        <p className="resume-publication-description">{pub.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {achievements.length ? (
              <section className="resume-section" id="achievements">
                <h2 className="resume-section-title">Achievements</h2>
                <div className="resume-achievement-grid">
                  {achievements.map((item) => (
                    <div key={item.title} className="resume-achievement-card">
                      <span className="material-symbols-outlined">emoji_events</span>
                      <h3>{item.title}</h3>
                      {item.subtitle ? <p>{item.subtitle}</p> : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="resume-section resume-contact" id="contact">
              <h2 className="resume-section-title">Contact</h2>
              <div className="resume-contact-grid">
                <div>
                  <h3>
                    Let's build something <span>extraordinary</span> together.
                  </h3>
                  <p>
                    Open to new opportunities, consulting projects, or technical leadership
                    roles. Reach out via the form or direct contact details.
                  </p>
                  <div className="resume-contact-list">
                    <div className="resume-contact-item">
                      <div className="resume-contact-icon">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p>Email Address</p>
                        <span>{profile.email}</span>
                      </div>
                    </div>
                    <div className="resume-contact-item">
                      <div className="resume-contact-icon">
                        <span className="material-symbols-outlined">phone_iphone</span>
                      </div>
                      <div>
                        <p>Phone Number</p>
                        <span>{profile.phone}</span>
                      </div>
                    </div>
                    <div className="resume-contact-item">
                      <div className="resume-contact-icon">
                        <span className="material-symbols-outlined">share</span>
                      </div>
                      <div>
                        <p>Social Connect</p>
                        <div className="resume-contact-links">
                          {profile.links?.linkedin ? (
                            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                              <span className="material-symbols-outlined">public</span>
                            </a>
                          ) : null}
                          {profile.links?.github ? (
                            <a href={profile.links.github} target="_blank" rel="noreferrer">
                              <span className="material-symbols-outlined">terminal</span>
                            </a>
                          ) : null}
                          <a href="#">
                            <span className="material-symbols-outlined">groups</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="resume-contact-form">
                  <form>
                    <div>
                      <label>Full Name</label>
                      <input placeholder="Name" type="text" />
                    </div>
                    <div>
                      <label>Email Address</label>
                      <input placeholder="email" type="email" />
                    </div>
                    <div>
                      <label>Message</label>
                      <textarea placeholder="Tell me about your project..." rows="5"></textarea>
                    </div>
                    <button type="submit">
                      Send Message
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>

          <footer className="resume-footer">
            <p>{profile.name} Profile.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

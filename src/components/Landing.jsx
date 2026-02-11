import { useState } from "react";
import "./Landing.css";

export default function Landing() {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = username.trim();
    if (!value) {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    params.set("profile", value);
    window.location.search = params.toString();
  };

  return (
    <div className="landing-root">
      <header className="landing-header">
        <div className="brand">
          <span className="material-symbols-outlined brand-icon">verified_user</span>
          <div className="brand-text">
            <span className="brand-title">
              YOUR<span className="accent">PROFILE</span>
            </span>
            <span className="brand-subtitle">PORTFOLIO</span>
          </div>
        </div>
        <nav className="landing-nav"></nav>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <span className="hero-eyebrow">Professional Presence Redefined</span>
          <h1 className="hero-title">
            Your Career,{" "}
            <span className="hero-underline">Instantly Accessible</span>
          </h1>
          <p className="hero-subtitle">
            The world's most sophisticated platform for executive-level
            professional profiles and portfolio management.
          </p>
        </div>

        <div className="bento-grid">
          <div className="bento-card bento-card--large">
            <div className="bento-ghost">
              <span className="material-symbols-outlined bento-ghost-icon">
                person_search
              </span>
            </div>
            <div className="bento-content">
              <div className="section-label">
                <span className="material-symbols-outlined section-icon">
                  visibility
                </span>
                <span className="section-text">Existing Members</span>
              </div>
              <h2 className="bento-title">
                View Your <span className="accent">Live Profile</span>
              </h2>
              <p className="bento-copy">
                Access your public page instantly. Simply enter your unique
                username below to{" "}
                <span className="bento-highlight">find your profile</span> and
                share it with recruiters or clients.
              </p>
              <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-field">
                  <span className="search-prefix">profile.me/ </span>
                  <input
                    className="search-input"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <button className="btn btn-primary glow-button" type="submit">
                  <span className="material-symbols-outlined">search</span>
                  Locate Profile
                </button>
              </form>
            </div>

          </div>

          <div className="bento-card bento-card--tall">
            <div className="bento-tall-content">
              <div className="section-label">
                <span className="material-symbols-outlined section-icon">
                  person_add
                </span>
                <span className="section-text">New Creators</span>
              </div>
              <h3 className="bento-title bento-title--small">
                Build Your <span className="accent">Legacy</span>
              </h3>
              <p className="bento-copy bento-copy--small">
                Join 25,000+ executives who trust our premium architecture to
                showcase their career milestones.
              </p>
            </div>
            <div className="bento-tall-footer">
              <button className="btn btn-secondary" type="button">
                Get Started
                <span className="material-symbols-outlined btn-arrow">
                  arrow_forward
                </span>
              </button>

            </div>
          </div>

          <div className="bento-card bento-card--small">
            <span className="material-symbols-outlined feature-icon">speed</span>
            <h4 className="feature-title">Lightning Fast</h4>
            <p className="feature-text">
              Profiles load in under 200ms globally, ensuring you never miss an
              opportunity.
            </p>
          </div>

          <div className="bento-card bento-card--small">
            <span className="material-symbols-outlined feature-icon">
              security
            </span>
            <h4 className="feature-title">Privacy Controls</h4>
            <p className="feature-text">
              Granular visibility settings to protect your data while
              maintaining professional reach.
            </p>
          </div>

          <div className="bento-card bento-card--small">
            <span className="material-symbols-outlined feature-icon">
              smartphone
            </span>
            <h4 className="feature-title">Mobile First</h4>
            <p className="feature-text">
              Perfectly responsive layouts designed for decision-makers on the
              go.
            </p>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-copy">
            <h2 className="footer-title">
              Finding your professional <span className="accent">digital home</span>{" "}
              has never been easier.
            </h2>
            <p className="footer-note-text">
              Your Profile Service Portal.
            </p>
          </div>
          <div className="footer-links">
            <a className="footer-link" href="#">
              Privacy Policy
            </a>
            <a className="footer-link" href="#">
              Terms of Service
            </a>
            <a className="footer-link" href="#">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

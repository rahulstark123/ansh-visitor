import {
  ECOSYSTEM_LINKS,
  LANDING_FEATURES,
  LANDING_FAQS,
  LANDING_H1,
  LANDING_HERO_SUBLINE,
  WHAT_VISITOR_DOES,
} from "@/lib/landing-seo";

export function LandingSeoContent() {
  return (
    <noscript>
      <section
        aria-label="ANSH Visitor product overview"
        style={{
          padding: "2rem 1.5rem",
          maxWidth: "48rem",
          margin: "0 auto",
          color: "#e2e8f0",
          background: "#020617",
        }}
      >
        <h1>{LANDING_H1}</h1>
        <p>{WHAT_VISITOR_DOES}</p>
        <p>{LANDING_HERO_SUBLINE}</p>

        <h2>What ANSH Visitor does</h2>
        <ul>
          {LANDING_FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <h2>Frequently asked questions</h2>
        {LANDING_FAQS.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}

        <h2>ANSH Apps ecosystem</h2>
        <ul>
          {ECOSYSTEM_LINKS.map((app) => (
            <li key={app.name}>
              <a href={app.href}>{app.name}</a> — {app.description}
            </li>
          ))}
        </ul>
      </section>
    </noscript>
  );
}

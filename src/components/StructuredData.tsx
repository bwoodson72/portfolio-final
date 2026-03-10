const person = {
    "@type": "Person",
    name: "Brian Woodson",
    url: "https://brianwoodson.dev",
    jobTitle: "Web Developer",
    sameAs: [
        "https://www.linkedin.com/in/brianwoodson",
        "https://www.fiverr.com/brianwoodson",
    ],
    knowsAbout: ["Next.js", "React", "Web Performance", "SEO", "Tailwind CSS"],
};

const graph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            name: "Brian Woodson",
            url: "https://brianwoodson.dev",
            description: "Custom websites for small businesses. Fast, modern, built to rank.",
            publisher: person,
        },
        person,
    ],
};

export default function StructuredData() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}

const organization = {
    "@type": "Organization",
    name: "Brian Woodson Web Development",
    url: "https://brianwoodson.dev",
    founder: {
        "@type": "Person",
        name: "Brian Woodson",
    },
    sameAs: [
        "https://www.linkedin.com/in/brianwoodson",
        "https://www.fiverr.com/brianwoodson",
    ],
    knowsAbout: ["Web Design", "Web Development", "SEO", "Copywriting", "Website Performance", "Small Business Websites"],
};

const graph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            name: "Brian Woodson Web Development",
            url: "https://brianwoodson.dev",
            description: "A web studio that designs, writes, and builds websites for small businesses. Copy, SEO, and ongoing support included.",
            publisher: organization,
        },
        organization,
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

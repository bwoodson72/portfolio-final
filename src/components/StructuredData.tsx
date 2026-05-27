const graph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://brianwoodson.dev/#organization",
            "name": "Brian Woodson Web Development",
            "url": "https://brianwoodson.dev",
            "telephone": "+18177764893",
            "founder": {
                "@type": "Person",
                "name": "Brian Woodson"
            },
            "sameAs": [
                "https://www.linkedin.com/in/brianwoodson",
                "https://www.fiverr.com/brianwoodson"
            ],
            "knowsAbout": ["Web Design", "Website Development", "Local SEO", "Copywriting", "Small Business Websites", "Landing Page Design"]
        }
    ]
};

export default function StructuredData() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}

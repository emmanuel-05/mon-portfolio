import "./Expertise.css";

const EXPERTISE = [
    {
        id: 1,
        icon: "</>",
        title: "Web Development",
        description: "Modern and high-performance web applications"
    },
    {
        id: 2,
        icon: "⊟",
        title: "Backend",
        description: "Robust and scalable APIs"
    },
    {
        id: 3,
        icon: "</>",
        title: "Frontend",
        description: "Responsive user interfaces"
    },
    {
        id: 4,
        icon: "☐",
        title: "Mobile",
        description: "Cross-platform mobile applications"
    },
    {
        id: 5,
        icon: "⊗",
        title: "System",
        description: "System and low-level programming"
    },
    {
        id: 6,
        icon: "⊞",
        title: "Game/Network",
        description: "Game and network development"
    }
];

const Expertise = () => {
    return (
        <section className="expertise">
            <div className="expertise__content">
                <h2 className="expertise__title">Areas of Expertise</h2>
                <div className="expertise__grid">
                    {EXPERTISE.map((item) => (
                        <article key={item.id} className="expertise-card">
                            <span className="expertise-card__icon">{item.icon}</span>
                            <h3 className="expertise-card__title">{item.title}</h3>
                            <p className="expertise-card__description">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;

import "./Expertise.css";
import { Code2, Smartphone, Database, Brain, BarChart3, Cpu, } from 'lucide-react';
const EXPERTISE = [
{
        id: 1,
        icon: <Code2 size={28} />,
        title: "Full-Stack Development",
        description: "Applications web modernes, du backend au frontend."
    },
    {
        id: 2,
        icon: <Smartphone size={28} />,
        title: "Mobile Development",
        description: "Applications mobiles performantes pour iOS et Android."
    },
    {
        id: 3,
        icon: <Database size={28} />,
        title: "Data Engineering",
        description: "Conception de pipelines (ETL) et architectures de données."
    },
    {
        id: 4,
        icon: <BarChart3 size={28} />, 
        title: "Data Analytics",
        description: "Analyse de données complexes et dashboards décisionnels."
    },
    {
        id: 5,
        icon: <Cpu size={28} />, 
        title: "Artificial Intelligence",
        description: "Intégration d'APIs intelligentes et automatisation de processus."
    },
];

const Expertise = () => {
    return (
        <section className="expertise">
            <div className="expertise__content">
                <h2 className="expertise__title">Domaines d'expertise</h2>
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

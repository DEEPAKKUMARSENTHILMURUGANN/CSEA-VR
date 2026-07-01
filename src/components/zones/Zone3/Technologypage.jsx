import { useNavigate, useParams } from "react-router-dom";
import { technologies } from "./zone3data";
import { technologyIcons } from "./icons";
import "../../../components-css/zone3.css";

function TechnologyPage() {

    const { slug } = useParams();

    const navigate = useNavigate();

    const technology = technologies.find(
        (tech) => tech.slug === slug
    );

    if (!technology) {
        return (
            <div className="zone3">
                <h1>Technology Not Found</h1>
            </div>
        );
    }

    const Icon = technologyIcons[technology.slug];

    return (

        <div className="zone3">

            {/* Back Button */}

            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                ← Back to Technologies
            </button>

            {/* Header */}

            <section className="technology-header">

                <div className="technology-title">

                    <Icon
                        className="tech-page-icon"
                        size={60}
                        color={technology.accentColor}
                    />

                    <h1>{technology.title}</h1>

                </div>

                <p>{technology.shortDescription}</p>

            </section>

            {/* Laboratories */}

            <section>

                <h2 className="section-heading">

                    Explore Our Laboratories

                </h2>

                <div className="labs-grid">

                    {technology.labs.map((lab) => (

                        <div
                            key={lab.id}
                            className="lab-card"
                            onClick={() =>
                                navigate(
                                    `/technology/${technology.slug}/lab/${lab.id}`
                                )
                            }
                        >

                            {/* Image */}

                            <div className="lab-image">

                                <img
                                    src={lab.images[0]}
                                    alt={lab.name}
                                />

                                <div className="image-overlay"></div>

                                {/* Badge */}

                                <span className="lab-badge">

                                    {lab.room}

                                </span>

                                {/* Explore Button */}

                                <button
                                    className="image-button"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        navigate(
                                            `/technology/${technology.slug}/lab/${lab.id}`
                                        );

                                    }}
                                >
                                    Explore Lab →
                                </button>

                            </div>

                            {/* Content */}

                            <div className="lab-content">

                                <h3>{lab.name}</h3>

                                <p>{lab.subtitle}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </div>

    );
}

export default TechnologyPage;
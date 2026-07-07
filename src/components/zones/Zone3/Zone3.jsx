import { technologies } from "./zone3data";
import { technologyIcons } from "./icons";
import GridWaveBg from "../../ui/bgs/GridWaveBg";
import "../../../components-css/zone3.css";
import { useNavigate } from "react-router-dom";

function Zone3() {
    const navigate = useNavigate();

    return (
        <div className="zone3" style={{ position: 'relative', isolation: 'isolate' }}>
            <GridWaveBg />

            {/* HERO */}

            <section className="hero">

                <p className="hero-tag">
                    PSG COLLEGE OF TECHNOLOGY • DEPARTMENT OF CSE
                </p>

                <h1>
                    AI & Emerging
                    <br />
                    Technologies Pavilion
                </h1>

                <p className="hero-desc">
                    Explore cutting-edge technologies, laboratories and
                    innovation facilities shaping the future of computing.
                </p>

            </section>

            {/* TECHNOLOGY GRID */}

            <section className="technology-grid">

                {technologies.map((tech) => {

                    const Icon = technologyIcons[tech.slug];

                    return (

                        <div
                            key={tech.id}
                            className="technology-card"
                            style={{
                                borderLeft: `5px solid ${tech.accentColor}`,
                            }}
                            onClick={() =>
                                navigate(`/technology/${tech.slug}`)
                            }
                        >

                            {/* Labs Badge */}

                            <div
                                className="labs-count"
                                style={{
                                    color: tech.accentColor,
                                    borderColor: tech.accentColor,
                                }}
                            >
                                {tech.labsCount} Labs
                            </div>

                            {/* Technology Icon */}

                            {Icon && (
                                <Icon
                                    className="tech-icon"
                                    size={48}
                                    color={tech.accentColor}
                                />
                            )}

                            {/* Title */}

                            <h2>{tech.title}</h2>

                            {/* Description */}

                            <p>
                                {tech.shortDescription ||
                                    "Explore laboratories and facilities under this technology."}
                            </p>

                            {/* Background Number */}

                            <span className="card-number">
                                {String(tech.id).padStart(2, "0")}
                            </span>

                            {/* Explore Button */}

                            <button
                                className="explore-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/technology/${tech.slug}`);
                                }}
                            >
                                Explore Technology →
                            </button>

                        </div>

                    );

                })}

            </section>

        </div>
    );
}

export default Zone3;
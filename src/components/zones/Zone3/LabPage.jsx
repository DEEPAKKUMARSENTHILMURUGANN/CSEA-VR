import { useNavigate, useParams } from "react-router-dom";
import { technologies } from "./zone3data";
import { specIcons, sectionIcons } from "./icons";
import "../../../components-css/zone3.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function LabPage() {

    const { slug, labId } = useParams();

    const navigate = useNavigate();

    const technology = technologies.find(
        (tech) => tech.slug === slug
    );

    if (!technology) {
        return <h1>Technology Not Found</h1>;
    }

    const lab = technology.labs.find(
        (item) => item.id === Number(labId)
    );

    if (!lab) {
        return <h1>Lab Not Found</h1>;
    }

    const ProcessorIcon = specIcons.processor;
    const RamIcon = specIcons.ram;
    const GpuIcon = specIcons.gpu;
    const SystemIcon = specIcons.systems;

    const SpecificationIcon = sectionIcons.specifications;
    const SoftwareIcon = sectionIcons.software;
    const FacilityIcon = sectionIcons.facilities;
    const ProjectIcon = sectionIcons.projects;

    return (

        <div className="zone3">

            <button
                className="back-btn"
                onClick={() => navigate(`/technology/${slug}`)}
            >
                ← Back to Laboratories
            </button>

            {/* HERO */}

            <section className="lab-hero">

                <h1>{lab.name}</h1>

                <p>{lab.subtitle}</p>

                <div className="gallery">

                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        className="main-swiper"
                    >

                        {lab.images.map((image, index) => (

                            <SwiperSlide key={index}>

                                <img
                                    src={image}
                                    alt={lab.name}
                                    className="hero-image"
                                />

                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>

            </section>

            {/* ABOUT */}

            <section className="content-section">

                <h2>About the Laboratory</h2>

                <p>{lab.description}</p>

            </section>

            {/* SPECIFICATIONS */}

            <section className="content-section">

                <h2>

                    <SpecificationIcon className="heading-icon" />

                    Hardware Specifications

                </h2>

                <div className="spec-grid">

                    <div className="spec-card">

                        <ProcessorIcon className="spec-icon" />

                        <h4>Processor</h4>

                        <p>{lab.specifications.processor}</p>

                    </div>

                    <div className="spec-card">

                        <RamIcon className="spec-icon" />

                        <h4>RAM</h4>

                        <p>{lab.specifications.ram}</p>

                    </div>

                    <div className="spec-card">

                        <GpuIcon className="spec-icon" />

                        <h4>GPU</h4>

                        <p>{lab.specifications.gpu}</p>

                    </div>

                    <div className="spec-card">

                        <SystemIcon className="spec-icon" />

                        <h4>Systems</h4>

                        <p>{lab.specifications.systems}</p>

                    </div>

                </div>

            </section>

            {/* SOFTWARE */}

            <section className="content-section">

                <h2>

                    <SoftwareIcon className="heading-icon" />

                    Software Installed

                </h2>

                <div className="chip-container">

                    {lab.software.map((software) => (

                        <span
                            key={software}
                            className="chip"
                        >
                            {software}
                        </span>

                    ))}

                </div>

            </section>

            {/* FACILITIES */}

            <section className="content-section">

                <h2>

                    <FacilityIcon className="heading-icon" />

                    Facilities

                </h2>

                <div className="chip-container">

                    {lab.facilities.map((facility) => (

                        <span
                            key={facility}
                            className="chip"
                        >
                            {facility}
                        </span>

                    ))}

                </div>

            </section>

            {/* PROJECTS */}

            <section className="content-section">

                <h2>

                    <ProjectIcon className="heading-icon" />

                    Projects Developed

                </h2>

                <div className="projects-grid">

                    {lab.projects.map((project) => (

                        <div
                            key={project}
                            className="project-card"
                        >

                            {project}

                        </div>

                    ))}

                </div>

            </section>

        </div>

    );

}

export default LabPage;
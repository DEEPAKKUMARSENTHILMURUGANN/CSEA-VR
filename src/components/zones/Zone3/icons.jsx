import {
    FaBrain,
    FaRobot,
    FaEye,
    FaLanguage,
    FaMicrochip,
    FaCube,
    FaNetworkWired,
    FaSatelliteDish,
    FaProjectDiagram,
    FaLink,
    FaLaptopCode,
    FaServer,
    FaMemory,
    FaDesktop,
    FaCloud,
    FaDatabase,
    FaTools,
    FaCogs,
    FaRocket,
    FaArrowRight,
    FaArrowLeft,
    FaImages,
    FaUniversity,
    FaWifi,
} from "react-icons/fa";

export const technologyIcons = {
    "artificial-intelligence": FaBrain,
    "generative-ai": FaRobot,
    "agentic-ai": FaRobot,
    "computer-vision": FaEye,
    "natural-language-processing": FaLanguage,
    "robotics": FaMicrochip,
    "iot": FaWifi,
    "edge-ai": FaSatelliteDish,
    "digital-twins": FaProjectDiagram,
    "blockchain": FaLink,
};

export const specIcons = {
    processor: FaMicrochip,
    ram: FaMemory,
    gpu: FaDesktop,
    systems: FaServer,
};

export const sectionIcons = {
    software: FaLaptopCode,
    facilities: FaTools,
    projects: FaRocket,
    specifications: FaCogs,
    gallery: FaImages,
    laboratory: FaUniversity,
};

export const commonIcons = {
    cloud: FaCloud,
    database: FaDatabase,
    back: FaArrowLeft,
    next: FaArrowRight,
};
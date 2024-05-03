import './Section.scss';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    aosDuration?: number;
    aosDelay?: number;
}

export default function Section({ children, className, aosDelay=0, aosDuration=300}: SectionProps) {
    return (
        <section className={`section ${className}`} data-aos="zoom-in" data-aos-delay={aosDelay} data-aos-duration={aosDuration}>
            {children}
        </section>
    )
}
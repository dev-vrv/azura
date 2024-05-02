import './Section.scss';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
}

export default function Section({ children, className}: SectionProps) {
    return (
        <section className={`section ${className}`}>
            {children}
        </section>
    )
}
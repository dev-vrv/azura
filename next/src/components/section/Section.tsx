interface PropsSection {
    children: any
    extraClass?: string
    dataAos?: string
    dataAosDuration?: string
    dataAosDelay?: string
}

export default function Section({children, extraClass, dataAos, dataAosDelay, dataAosDuration}: PropsSection) {
    return (
        <section 
        className={`section ${extraClass? extraClass : ''}`} 
        data-aos={dataAos? dataAos : 'zoom-in'} 
        data-aos-duration={dataAosDuration? dataAosDuration : '700'}
        data-aos-delay={dataAosDelay? dataAosDelay : '0'}
        >
            {children}
        </section>
    )
}
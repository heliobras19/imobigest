import React, { useState } from 'react';
import styles from './styles.module.css';
import ServiceCard from '../ServiceCard';

export default function OurServices() {

    let services = [
        {
            id: 1,
            image: "/images/home/pesquisa_desenvolvimento.jpeg",
            title: "Pesquisa e Desenvolvimento",
            description: "Com a missão de oferecer produtos de alta qualidade voltados para a área corporativa, buscando assim o reconhecimento da nossa empresa. Com total respeito e atenção aos nossos clientes."
        },
        {
            id: 2,
            image: "https://ajung-intelligenz.s3.amazonaws.com/teste/aeOdjxvxbvNGZfZeOpErVkQxb2jdW0IxGyBQI8Xu.jpg",
            title: "Gravação e Personalização",
            description: "Fazemos todo tipo de gravação adequado a cada produto comercializado por nós. Todas as técnicas foram estudadas e testadas a cada produto para oferecermos a melhor gravação para apresentação de sua marca."
        },
        {
            id: 3,
            image: "/images/home/atendimento.jpeg",
            title: "Atendimento",
            description: "Um grupo de profissionais altamente capacitados e comprometidos em oferecer excelência e qualidade nos serviços prestados como foco nas suas ideias, mantendo a criatividade com tônica predominante de suas atuações, sem abrir mão de atender com excelência."
        },
    ];

    return (
        <div className='pb-5' style={{ backgroundColor: "#F8F7F3"}}>
            <div className="container">
                <div className={`row `}>
                    <span className={`${styles.title} text-center h2 my-5 spectral`}>Nossos serviços</span>
                </div>
                <div className={`row`}>
                    {services.map((service, index) => (
                        <div className={`col-12 col-md-4`} key={`service-card-${index}`}>
                            <ServiceCard service={service} key={service.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
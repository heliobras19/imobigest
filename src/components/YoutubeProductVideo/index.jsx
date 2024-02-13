import React, { useState } from 'react';
import styles from './styles.module.css';
import ButtonYoutubeProductVideo from '../ButtonYoutubeProductVideo'


export default function YoutubeProductVideo({ urlVideo, product }) {

    return (
        <div className={`${styles.root} mb-5`} style={{ backgroundColor: "#F8F7F3" }}>
            <div className={`${styles.root} container pb-5 d-flex flex-column`}>
                <div className={`row d-flex justify-content-center mb-5`}>
                    <iframe className={`${styles.iframeVideo} p-0`} src={urlVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className={`row d-flex justify-content-center mb-md-4`}>
                    <div className={`col-md-6 text-center`}>
                        <span className={`h1 spectral`}>{product?.name ? product.name : ''}</span>
                    </div>
                </div>
                <div className={`row d-flex justify-content-center`}>
                    <div className={`col-md-6 text-center mb-3`}>
                        <span className={`${styles.code}`}>{product?.code ? product.code : ''}</span>
                    </div>
                </div>
                <div className={`row d-flex justify-content-center mb-4`}>
                    <div className={`col-md-6`}>
                        <span className={`${styles.description}`}>{product?.description ? product.description : ''}</span>
                    </div>
                </div>
                <div className={`row d-flex justify-content-center mb-4`}>
                    <div className={`col-md-6`}>
                        <ul className={`p-0 mb-0`}>
                            {
                                product?.variants.map((variant, index) => (
                                    variant.features.map((feature, index) => (
                                        <li key={`variant-a-${index}`} className={`${styles.description}`}>
                                            <span>{`${feature.variant_type}:
                                            ${feature.variant_name}`}</span>
                                        </li>
                                    ))
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className={`row d-flex justify-content-center`}>
                    <div className={`col-md-6 d-flex justify-content-center`}>
                        {product != undefined ?
                            <ButtonYoutubeProductVideo slug={product.slug}/>
                        : null}

                    </div>
                </div>
            </div>
        </div>
    )
}
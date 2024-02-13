import Link from 'next/link';
// import React, { useState } from 'react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// export default function InstagramPosts({ posts }) {
export default function InstagramPosts({ posts}) {
    // const [posts, setPosts] = useState();
/* 
    useEffect(() => {
        const posts = {
            data: [{
                'file': '/images/home/post1.png',
                'title': 'Post1'
            },{
                'file': '/images/home/post2.png',
                'title': 'Post2'
            },{
                'file': '/images/home/post3.png',
                'title': 'Post3'
            },{
                'file': '/images/home/post4.png',
                'title': 'Post4'
            },{
                'file': '/images/home/post5.png',
                'title': 'Post5'
            },{
                'file': '/images/home/post6.png',
                'title': 'Post6'
            }
        ]};
        setPosts(posts);
    }); */

    return (
        <div className={`d-none d-md-block container mb-5 mb-md-0`}>
            <div className={`row`}>
                <span className={`${styles.title} text-center h2 mb-4 spectral`}>Instagram</span>
            </div>
            <div className={`row`}>
                <span className={`${styles.description} text-center text-secondary h5 mb-5 spectral`}>Acompanhe nossas redes sociais e fique por dentro do trends do mercado promocional</span>
            </div>
            
            <div className={`row row g-3 g-lg-4`}>
                { posts.length > 0 && posts?.map((post, index) => {
                    return (
                        <div className={`col-sm-2 col-md-4`} key={`instagram-post-item-${index}`}>
                            <Link target='blank' href={post.link != null ? `https://instagram.com/${post?.link}` : `#`}>
                                <div className={styles.postImage}>
                                    <Image
                                        src={post?.image_url}
                                        alt={post?.title}
                                        fill
                                    />
                                </div>
                            </Link>
                        </div>
                    );    
                }) }
            </div> 

        </div>
    )
}
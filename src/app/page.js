'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { useTransform, useScroll, motion } from 'framer-motion';
import {
  floating1, 
  floating2, 
  floating3, 
  floating4, 
  floating5, 
  floating6, 
  floating7, 
  floating8
} from '../data'

const images = [
  {
    src: "1.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "2.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "3.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "4.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "5.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "6.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "7.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "8.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "9.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "10.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "11.jpg",
    url: "https://www.c2montreal.com/"
  },
  {
    src: "12.jpg",
    url: "https://www.c2montreal.com/"
  },
]

export default function Home() {
  
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e
    xForce += movementX * speed;
    yForce += movementY * speed;

    if(requestAnimationFrameId == null){
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  }

  const lerp = (start, target, amount) => start * (1 - amount) +target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, {x: `+=${xForce}`, y: `+=${yForce}`})
    gsap.set(plane2.current, {x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}`})
    gsap.set(plane3.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}`})

    if(Math.abs(xForce) < 0.01) xForce = 0;
    if(Math.abs(yForce) < 0.01) yForce = 0;
    
    if(xForce != 0 || yForce != 0){
      requestAnimationFrame(animate);
    }
    else{
      cancelAnimationFrame(requestAnimationFrameId)
      requestAnimationFrameId = null;
    }
  }

  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    if (gallery.current) {
      gallery.current.addEventListener('resize', resize);
    }

    requestAnimationFrame(raf);
    resize();


    return () => {
      if (gallery.current) {
        gallery.current.removeEventListener('resize', resize);
      }
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.spacer}>
        <div onMouseMove={(e) => {manageMouseMove(e)}} className={styles.float}>
          <div ref={plane1} className={styles.plane}>
              <Image 
                src={floating1}
                alt='image'
                width={300}
              />
              <Image 
                src={floating2}
                alt='image'
                width={300}
              />
              <Image 
                src={floating7}
                alt='image'
                width={225}
              />
          </div>
          <div ref={plane2} className={styles.plane}>
              <Image 
                src={floating4}
                alt='image'
                width={250}
              />
              <Image 
                src={floating6}
                alt='image'
                width={200}
              />
              <Image 
                src={floating8}
                alt='image'
                width={225}
              />
          </div>
          <div ref={plane3} className={styles.plane}>
              <Image 
                src={floating3}
                alt='image'
                width={150}
              />
              <Image 
                src={floating5}
                alt='image'
                width={200}
              />
          </div>
          <div className={styles.title}>
            <h1>Demo website</h1>
            <p>Next.js and GSAP</p>
          </div>
        </div>
      </div>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y}/>
        <Column images={[images[3], images[4], images[5]]} y={y2}/>
        <Column images={[images[6], images[7], images[8]]} y={y3}/>
        <Column images={[images[9], images[10], images[11]]} y={y4}/>
      </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({ images, y }) => {
  const handleDivClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((image, i) => {
        // Check if the image object is defined and has 'src' and 'url' properties
        if (image && image.src && image.url) {
          const { src, url } = image;

          return (
            <div
              key={i}
              className={`${styles.imageContainer} ${styles.clickable}`}
              onClick={() => handleDivClick(url)}
            >
              <Image src={`/images/${src}`} alt='image' fill />
            </div>
          );
        } else {
          // Handle cases where 'src' or 'url' is missing
          return (
            <div key={i} className={styles.imageContainer}>
              <p>Image missing src or url</p>
            </div>
          );
        }
      })}
    </motion.div>
  );
};
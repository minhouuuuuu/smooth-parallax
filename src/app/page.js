'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';

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

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.spacer}>
        <strong>Je t&apos;aime Alixan</strong>
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
import Image from 'next/image';

import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/nbw.png'
          alt='Masjid Nabawi'
          height='300'
          width='300'
        />
      </div>
      <h1>Hi, I'm Irsyad</h1>
      <p>Ini merupakan latihan membuat blog pada course NextJs.</p>
    </section>
  );
};

export default Hero;

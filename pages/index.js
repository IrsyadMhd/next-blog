import { Fragment } from 'react';

import FeaturedPosts from '../components/home-page/layout/featured-posts';
import Hero from '../components/home-page/hero';

const DUMMY_DATA = [
  {
    title: 'Get started with Next-JS',
    date: '2021-12-12',
    slug: 'get-started-with-next-js',
    image: 'getting-started-nextjs.png',
    excerpt:
      'Next.js gives you the best developer experience with all the features you need for production.',
  },
  {
    title: 'Get started with Next-JS2',
    date: '2021-12-12',
    slug: 'get-started-with-next-js2',
    image: 'getting-started-nextjs.png',
    excerpt:
      'Next.js gives you the best developer experience with all the features you need for production.',
  },
  {
    title: 'Get started with Next-JS3',
    date: '2021-12-12',
    slug: 'get-started-with-next-js3',
    image: 'getting-started-nextjs.png',
    excerpt:
      'Next.js gives you the best developer experience with all the features you need for production.',
  },
  {
    title: 'Get started with Next-JS4',
    date: '2021-12-12',
    slug: 'get-started-with-next-js4',
    image: 'getting-started-nextjs.png',
    excerpt:
      'Next.js gives you the best developer experience with all the features you need for production.',
  },
];

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_DATA} />
    </Fragment>
  );
};

export default HomePage;

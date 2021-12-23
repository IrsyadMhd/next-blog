import { Fragment } from 'react';

import FeaturedPosts from '../components/home-page/layout/featured-posts';
import Hero from '../components/home-page/hero';

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={} />
    </Fragment>
  );
};

export default HomePage;

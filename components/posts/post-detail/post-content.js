import PostHeader from './post-header';
import classes from './post-content.module.css';

const DUMMY_POST = {
  title: 'Get started with Next-JS',
  date: '2021-12-12',
  slug: 'get-started-with-next-js',
  image: 'getting-started-nextjs.png',
  content: '# This is the first post',
};

const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      {DUMMY_POST.content}
    </article>
  );
};

export default PostContent;

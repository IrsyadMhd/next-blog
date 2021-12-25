import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostFiles } from '../../lib/post-util';

const DetailPost = props => {
  return <PostContent post={props.post} />;
};

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFiles = getPostFiles();
  const slugs = postFiles.map(postFile => postFile.replace(/\.md$/, ''));

  return {
    paths: slugs.map(slug => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default DetailPost;

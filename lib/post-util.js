import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostData = postIdentifier => {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const postPath = path.join(postsDirectory, `${postSlug}.md`);
  const postFile = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(postFile);

  return {
    slug: postSlug,
    ...data,
    content,
  };
};

export const getAllPosts = () => {
  const postFiles = getPostFiles();
  const allPosts = postFiles.map(postFile => getPostData(postFile));

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.isFeatured);
};

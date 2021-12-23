import Link from 'next/link';

const MainNavigation = () => {
  return (
    <header>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <ul>
        <li>
          <Link href='/posts'>Posts</Link>
        </li>
      </ul>
    </header>
  );
};

export default MainNavigation;

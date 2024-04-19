import Link from 'next/link';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/create-quiz">
            <a>Create Quiz</a>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
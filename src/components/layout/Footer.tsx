import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <span className="footer-copy">
          © {new Date().getFullYear()} The Blank Page
        </span>
        <div className="footer-links">
          <Link to="/write" className="footer-link">
            Write
          </Link>
          <Link to="/about" className="footer-link">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

import {Link} from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <h3>🌿 EcoTrack</h3>

      <p>
        Making sustainability simple and accessible for everyone.
      </p>

      <div className="footer-links">
        <Link to="/about">About Us</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/contact">Contact Us</Link>
      </div>

      <p className="copyright">
        © 2026 EcoTrack. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
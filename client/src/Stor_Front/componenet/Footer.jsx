import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <>
      <div className="footer mt-5 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-3">
              <h5 className="fw-bold footer-content footer-paragraphs">
                Casa Chic Vibes
              </h5>
              <p className="mt-5 footer-paragraphs">
                At Casa Chic Vibes, we believe that your home is more than just
                a space to live, it is a place where memories are made.
              </p>
            </div>
            <div className="col-md-4 footer-content mt-3">
              <h5 className="fw-bold footer-paragraphs">Contact Us</h5>
              <p className="mt-5 footer-paragraphs">
                Email: casavibes@gmail.com
              </p>
              <p className="footer-paragraphs">Phone: +212 645350290</p>
            </div>
            <div className="col-md-4 footer-content mt-3">
              <h5 className="fw-bold footer-paragraphs">Follow Us</h5>
              {/* <ul className="list-unstyled">
                <li>
                  <a href="#">Link 1</a>
                </li>
                <li>
                  <a href="#">Link 2</a>
                </li>
                <li>
                  <a href="#">Link 3</a>
                </li>
              </ul> */}
              <div className="social-icons">
                <p className="mt-5 footer-paragraphs">
                  Follow us on social media.
                </p>
                <a
                  href="https://www.facebook.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    style={{ color: "#b1afbd" }}
                  />
                </a>
                <a
                  href="https://www.twitter.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    size="2x"
                    style={{ color: "#b1afbd" }}
                  />
                </a>
                <a
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    style={{ color: "#b1afbd" }}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <hr className="footer-divider" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="copyright">
                &copy; 2023 Casa Chic Vibes. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

import React, { useEffect, useState } from "react";

import "./footer.css";

function Footer({}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("newsletterEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSocialIconClick = (socialPlatform) => {
    console.log(`Clicked on ${socialPlatform}`);

    switch (socialPlatform) {
      case "Facebook":
        window.location.href = "https://www.facebook.com/";
        break;
      case "Twitter":
        window.location.href = "https://twitter.com/";
        break;
      case "Instagram":
        window.location.href = "https://www.instagram.com/";
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email submitted:", email);

    localStorage.setItem("newsletterEmail", email);
    toast.success(
      "Registered successfully! We will keep you updated about our products & promotions"
    );
    setEmail("");
  };

  return (
    <>
      <div className="footer-container">
        <div className="footer-section footer-section1">
          <h3>Contact</h3>
          <p>Islamabad, Pakistan.</p>
          <p>Call: +923000725776</p>
          <p>support@productsApp.pk</p>
        </div>
        <div className="footer-section footer-section2">
          <h3>Information</h3>
          <ul>
            <li to="/contact" className="footer-link">
              Contact Us
            </li>
            <li to="/faqs" className="footer-link">
              FAQs
            </li>
            <li to="/about" className="footer-link">
              About Us
            </li>
            <li to="/policy" className="footer-link">
              Privacy & Cookie Policy
            </li>
            <li to="/terms-condition" className="footer-link">
              Terms & Condition
            </li>
          </ul>
        </div>
        <div className="footer-section footer-section3">
          <div className="follow-us">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href="#"
                onClick={() => handleSocialIconClick("Facebook")}
                className="social-icon"
              ></a>
              <a
                href="#"
                onClick={() => handleSocialIconClick("Twitter")}
                className="social-icon"
              ></a>
              <a
                href="#"
                onClick={() => handleSocialIconClick("Instagram")}
                className="social-icon"
              ></a>
            </div>
            <p>Newsletter Sign Up</p>
            <p>Receive our latest updates about our products & promotions.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                className="emailinput"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="footer-section footer-section4">
          <p>© 2024, Products App. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Footer;

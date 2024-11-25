const Footer = () => {
    return (
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>About Us</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
            </div>
            <div className="col-md-4 mb-3 ">
              <h5>Quick Links</h5>
              <ul className="list-unstyled mx-auto text-center">
                <li><a href="/shop" className="text-light text-decoration-none">Shop   </a></li>
                <li><a href="/signin" className="text-light text-decoration-none">Sign In</a></li>
                <li><a href="/cart" className="text-light text-decoration-none">Cart</a></li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Contact Us</h5>
              <p>Email: support@brandlogo.com</p>
              <p>Phone: +123 456 7890</p>
            </div>
          </div>
          <hr className="bg-light" />
          <p className="mb-0">&copy; 2024 BrandLogo. All Rights Reserved.</p>
        </div>
      </footer>
    );
  };

export default Footer;
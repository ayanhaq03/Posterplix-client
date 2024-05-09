import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { BsCart2 } from "react-icons/bs";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  
  const categories = useSelector((state) => state.categoryReducer.categories);
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalItems = 0;
  cart.forEach((item) => (totalItems += item.quantity));
  const { loginWithRedirect, isAuthenticated, logout} = useAuth0();
  return (
    <>
      <nav className="Navbar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              {categories?.map((category) => (
                <li className="hover-link" key={category.id}>
                  <Link
                    className="link"
                    to={`/category/${category.attributes.key}`}
                  >
                    {category.attributes.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/">
              <h1 className="banner">PosterPlix.</h1>
            </Link>
          </div>
          <div className="nav-right">
            <div
              className="nav-cart hover-link"
              onClick={() => setOpenCart(!openCart)}
            >
              <BsCart2 className="icon" />
              {totalItems > 0 && (
                <span className="cart-count center">{totalItems}</span>
              )}
            </div>

            <div className="login">
              {isAuthenticated ? (
                <li>
                  <button
                    className="cta btn-primary"
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Log Out
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    className="cta btn-primary"
                    onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </button>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>

      {openCart && <Cart onClose={() => setOpenCart(false)} />}
    </>
  );
}

export default Navbar;

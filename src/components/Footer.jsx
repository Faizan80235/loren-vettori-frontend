import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const FullWidthWrapper = styled.footer`
  width: 100%;
  margin-top: 100px;
`;

const FooterContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1rem 2rem 1rem;

  @media (min-width: 1440px) {
    max-width: 1400px;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SectionTitle = styled.h3`
  font-weight: 500;
  color: #111827;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  color: #4b5563;

  li {
    margin-bottom: 0.75rem;

    a {
      color: inherit;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s ease;

      &:hover {
        color: #111827;
      }
    }
  }
`;

const EmailForm = styled.form`
  display: flex;
  margin-bottom: 1.5rem;

  input {
    flex: 1;
    padding: 0.625rem 1rem;
    border: 1px solid #d1d5db;
    border-right: none;
    border-radius: 0.25rem 0 0 0.25rem;
    outline: none;
    font-size: 0.875rem;

    &:focus {
      border-color: #111827;
    }
  }

  button {
    padding: 0.625rem 1.5rem;
    background-color: #111827;
    color: white;
    font-weight: 500;
    font-size: 0.75rem;
    border: none;
    border-radius: 0 0.25rem 0.25rem 0;
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &:hover {
      background-color: #000000;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  a {
    color: #4b5563;
    transition: color 0.2s ease;

    &:hover {
      color: #111827;
    }
  }
`;

const CountrySelect = styled.select`
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: white;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #111827;
  }
`;

const AccessibilityLink = styled.a`
  display: inline-block;
  font-size: 0.75rem;
  color: #4b5563;
  text-decoration: underline;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`;

const Copyright = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

const Footer = () => {
  const { currency } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Pakistan (PKR ₨)");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <FullWidthWrapper>
      <FooterContainer>
        <Grid>
          {/* Shop */}
          <div>
            <SectionTitle>Shop</SectionTitle>
            <LinkList>
              <li><Link to="/collection?category=boots&subcategory=men">Men's Boots</Link></li>
              <li><Link to="/collection?category=boots&subcategory=women">Women's Boots</Link></li>
              <li><Link to="/collection?category=sneakers&subcategory=men">Men's Sneakers</Link></li>
              <li><Link to="/collection?category=sneakers&subcategory=women">Women's Sneakers</Link></li>
              <li><Link to="/collection?category=shoes&subcategory=men">Men's Shoes</Link></li>
              <li><Link to="/collection?category=shoes&subcategory=women">Women's Shoes</Link></li>
              <li><Link to="/collection?category=jackets&subcategory=men">Men's Jackets</Link></li>
              <li><Link to="/collection?category=jackets&subcategory=women">Women's Jackets</Link></li>
              <li><Link to="/collection?category=accessories">Accessories</Link></li>
              <li><Link to="/gift-cards">Gift Cards</Link></li>
            </LinkList>
          </div>

          {/* About */}
          <div>
            <SectionTitle>About</SectionTitle>
            <LinkList>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/press">Featured Press</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/locations">Locations</Link></li>
              <li><Link to="/ambassadors">Ambassadors</Link></li>
            </LinkList>
          </div>

          {/* Support */}
          <div>
            <SectionTitle>Support</SectionTitle>
            <LinkList>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/care">Shoe Care</Link></li>
              <li><Link to="/accessibility">Accessibility Statement</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </LinkList>
          </div>

          {/* Newsletter */}
          <div>
            <SectionTitle>Stay Connected</SectionTitle>

            <EmailForm onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
              <button type="submit">Subscribe</button>
            </EmailForm>

            <SocialIcons>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
              </a>
            </SocialIcons>

            <CountrySelect
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="Pakistan (PKR ₨)">Pakistan (PKR ₨)</option>
              <option value="United States (USD $)">United States (USD $)</option>
              <option value="United Kingdom (GBP £)">United Kingdom (GBP £)</option>
              <option value="Canada (CAD $)">Canada (CAD $)</option>
              <option value="Australia (AUD $)">Australia (AUD $)</option>
              <option value="Europe (EUR €)">Europe (EUR €)</option>
            </CountrySelect>

            <AccessibilityLink as={Link} to="/accessibility">
              View In Accessibility Mode
            </AccessibilityLink>
          </div>
        </Grid>

        <Copyright>
          © 2025 Loren Vettori - All rights reserved.
        </Copyright>
      </FooterContainer>
    </FullWidthWrapper>
  );
};

export default Footer;
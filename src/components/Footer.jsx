import React, { useState } from "react";
import styled from "styled-components";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

// ✅ This wrapper ensures full-width background
const FullWidthWrapper = styled.footer`
  // background-color: #f9fafb;
  width: 100%;
  margin-top:100px;
`;

// ✅ Max-width container for center alignment
const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 100erm;
  padding: 8rem 0rem 0erm 0 erm;

  @media (min-width: 1440px) {
    max-width: 1400px; /* Optional: make it wider for large screens */
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
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-right: none;
    border-radius: 0.375rem 0 0 0.375rem;
    outline: none;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
  }

  button {
    padding: 0.5rem 1.5rem;
    background-color: #2563eb;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 0 0.375rem 0.375rem 0;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #1e40af;
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
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

const AccessibilityLink = styled.a`
  display: inline-block;
  font-size: 0.875rem;
  color: #4b5563;
  text-decoration: underline;
  transition: color 0.2s ease;

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

// ✅ Footer Component
const Footer = () => {
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Pakistan (PKR ₨)");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <FullWidthWrapper>
      <FooterContainer>
        <Grid>
          {/* Shop */}
          <div>
            <SectionTitle>Shop</SectionTitle>
            <LinkList>
              <li><a href="#">Men's Boots</a></li>
              <li><a href="#">Women's Boots</a></li>
              <li><a href="#">Men's Sneakers</a></li>
              <li><a href="#">Women's Sneakers</a></li>
              <li><a href="#">Men's Shoes</a></li>
              <li><a href="#">Women's Shoes</a></li>
              <li><a href="#">Men's Jackets</a></li>
              <li><a href="#">Women's Jackets</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">Gift Cards</a></li>
            </LinkList>
          </div>

          {/* About */}
          <div>
            <SectionTitle>About</SectionTitle>
            <LinkList>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Featured Press</a></li>
              <li><a href="#">Reviews</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">Ambassadors</a></li>
            </LinkList>
          </div>

          {/* Support */}
          <div>
            <SectionTitle>Support</SectionTitle>
            <LinkList>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Shoe Care</a></li>
              <li><a href="#">Accessibility Statement</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Us</a></li>
            </LinkList>
          </div>

          {/* Newsletter */}
          <div>
            <SectionTitle>Sign Up For Early Access & Exclusive Events</SectionTitle>

            <EmailForm onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
              <button type="submit">JOIN TEAM </button>
            </EmailForm>

            <SocialIcons>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
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
            </CountrySelect>

            <AccessibilityLink href="#">
              View In Accessibility Mode
            </AccessibilityLink>
          </div>
        </Grid>

        <Copyright>
          © 2025 lorenvettori.com - All rights reserved.
        </Copyright>
      </FooterContainer>
    </FullWidthWrapper>
  );
};

export default Footer;

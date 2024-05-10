"use client"
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <SearchBarWrapper>
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  background-color: ${(props) => props.theme.colorBg};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 0.4rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colorBg};
  color: ${(props) => props.theme.colorGrey3};
  outline: none;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.colorGrey2};
  }

  &:focus {
    border-color: ${(props) => props.theme.colorPrimary};
  }
`;



const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colorRed}; /* Red color */
  color: ${(props) => props.theme.colorWhite};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: all 0.3s ease;

  /* Add box-shadow for a raised effect */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  /* Add hover effect */
  &:hover {
    background-color: ${(props) => props.theme.colorRedDark}; /* Darker red color */
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Add focus outline */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.7); /* White outline */
  }

  /* Add glow animation on click */
  &:active {
    animation: ${glowAnimation} 0.5s ease forwards;
  }
`;

export default SearchBar;

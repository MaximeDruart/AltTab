import styled from "styled-components"

export const styles = {
  txtSize: {
    small: "//",
    medium: "//",
    large: "//",
  },
  txtColor1: "#E2E2E2",
  txtColor2: "#BEBEBE",
  txtColorDisabled: "#858585",
  black: {
    light: "#272732",
    medium: "#1B1B26",
    dark: "#0F0F12",
  },
}

export const Button = styled.button`
  display: inline-block;
  border: 1px solid white;
  text-transform: uppercase;
  padding: 1.2rem 2.4rem;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: border 250ms ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;

  &:hover,
  &:focus {
    border: 2px solid white;
  }
`

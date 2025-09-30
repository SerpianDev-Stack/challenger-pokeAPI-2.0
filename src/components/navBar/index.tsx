import styled from "styled-components";
import { GenericButton } from "../button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import type { ComponentsProps } from "../list";

interface MenuProps {
  onToggleExtra: () => void;
  showExtra: boolean;
}

interface NavegationProps extends ComponentsProps {
  $bg: string;
}

const Navegation = styled.nav<NavegationProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10rem;
  background: ${({ $bg }) => $bg};
  padding: 0 4rem;
  // border:1px solid white;
`;

const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: auto;
  height: 100%;
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background-image: linear-gradient(135deg, var(--teal-200), var(--cyan-500));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-transform: uppercase;
`;

export const NavBar = ({ onToggleExtra, showExtra }: MenuProps) => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Navegation $bg={theme.background}>
      <Logo>PokeList</Logo>
      <ContainerButton>
        <GenericButton onClick={toggleTheme}>change the theme</GenericButton>
        <Link to="/">
          <GenericButton>Home</GenericButton>
        </Link>
        <GenericButton onClick={onToggleExtra}>
          {showExtra ? "Hide Extra" : "Show more"}
        </GenericButton>
      </ContainerButton>
    </Navegation>
  );
};

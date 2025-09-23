import styled from "styled-components";
import type { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = styled.button`
padding: 1rem 3rem; 
border:none;
border-radius: 5rem;
background-image: linear-gradient(135deg, var(--teal-200), var(--cyan-500));
color: var(--white);
cursor:pointer;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
transition: transform 0.2s ease, box-shadow 0.2s ease;
font-family: 'Open Sans Condensed';
font-size:1rem;
text-transform: capitalize;

 &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.6);
  }
`

export const GenericButton = ({ children, ...props }: IButtonProps) => {


  return <Button {...props}>{children}</Button>
}
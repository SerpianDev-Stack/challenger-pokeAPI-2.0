import styled from "styled-components";
import type { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const StyledButton = styled.button`
 /* Cores e Estilo Inicial (AGORA PADRÃO ESCURO) */
  // Cor padrão do Navy 850 (do seu hover anterior)
  background: var(--navy-850, hsl(217, 28%, 15%)); 
  // Cor de texto padrão Teal 200 (do seu hover anterior)
  color: var(--teal-200); 
  border: none;

  /* Propriedades Comuns */
  font-weight: 700;
  font-size: 14px; 
  letter-spacing: 0.5px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  /* Arredondamento e Sombra */
  border-radius: 50px; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);

  /* Interações (AGORA HOVER CLARO/ACCENT) */
  &:hover {
    // Cor de fundo no hover Teal 200 (do seu padrão anterior)
    background-color: var(--teal-200); 
    // Cor de texto no hover Navy 950 (do seu padrão anterior)
    color: var(--navy-950, hsl(216, 53%, 9%)); 
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.7);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.8);
  }
`;

export const GenericButton = ({ children, ...props }: IButtonProps) => {


  return <StyledButton {...props}>{children}</StyledButton>
}
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";




interface FilterSelectProps {
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;
  $bg?: string;
  $color?: string;
}

const StyledSelect = styled.select<Pick<FilterSelectProps, "$bg" | "$color">>`
  padding: 8px;
  font-size: 14px;
  border: 1px solid var(--teal-200);
  border-radius: 4px;
  background-color: ${({ $bg }) => $bg || "var(--navy-900)"};
  color: ${({ $color }) => $color || "var(--white)"};
  margin-bottom: 2rem;
`;


export const FilterSelect = ({ selectedType, setSelectedType, $bg, $color }: FilterSelectProps) => {
    return (
        <StyledSelect
            $bg={$bg}
            $color={$color}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
        >
            <option value="">Todos os Tipos</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
        </StyledSelect>
    );
};
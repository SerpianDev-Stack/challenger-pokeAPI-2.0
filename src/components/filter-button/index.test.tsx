import { render, screen, fireEvent } from "@testing-library/react";
import { FilterSelect } from ".";

describe("FilterSelect", () => {
  const mockSetSelectedType = jest.fn();

  beforeEach(() => {
    mockSetSelectedType.mockClear();
  });

  test("renderiza corretamente com todas as opções", () => {
    render(
      <FilterSelect
        selectedType=""
        setSelectedType={mockSetSelectedType}
        $bg="white"
        $color="black"
      />
    );

    // Checa se a primeira opção está presente
    expect(screen.getByRole("option", { name: /Todos os Tipos/i })).toBeInTheDocument();
    
    // Checa uma opção qualquer
    expect(screen.getByRole("option", { name: /Fire/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Water/i })).toBeInTheDocument();
  });

  test("valor inicial é o passado por props", () => {
    render(
      <FilterSelect
        selectedType="fire"
        setSelectedType={mockSetSelectedType}
        $bg="white"
        $color="black"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("fire");
  });

  test("chama setSelectedType ao mudar o valor", () => {
    render(
      <FilterSelect
        selectedType=""
        setSelectedType={mockSetSelectedType}
        $bg="white"
        $color="black"
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "water" } });

    expect(mockSetSelectedType).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedType).toHaveBeenCalledWith("water");
  });
});
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./Navbar";
import { List } from "./List";
import { Details } from "./PokemonDetails";
import { useState } from "react";


export const AppRoutes = () => {

    const [showExtra, setShowExtra] = useState(false);

    const toggleExtra = () => setShowExtra(prev => !prev);

    return (
        <BrowserRouter basename="/challenger-pokeAPI-2.0">
            <Menu onToggleExtra={toggleExtra} showExtra={showExtra} />
            <Routes>
                <Route path="/" element={<List showExtra={showExtra} />} />
                <Route path="/pokemon/:id" element={<Details />} />
            </Routes>
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "../pages/navbar";
import { List } from "../pages/home";
import { Details } from "../pages/pokemon-details-page";
import { useState } from "react";


export const AppRoutes = () => {

    const [showExtra, setShowExtra] = useState(false);

    const toggleExtra = () => setShowExtra(prev => !prev);

    return (
        <BrowserRouter>
            <Menu onToggleExtra={toggleExtra} showExtra={showExtra} />
            <Routes>
                <Route path="/" element={<List showExtra={showExtra} />} />
                <Route path="/pokemon/:id" element={<Details />} />
            </Routes>
        </BrowserRouter>
    )
}
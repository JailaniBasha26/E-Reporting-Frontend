import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import "./ThemeTry.css";

export default function ThemeTry() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
                <Dropdown inputId="dd-city" value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" className="w-full md:w-14rem" />
                <label htmlFor="dd-city">Theme</label>
            </span>
        </div>
    )
}
        
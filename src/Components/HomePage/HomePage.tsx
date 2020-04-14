import React from "react";
import "./HomePage.scss";

export default function HomePage()
{
    return (
        <div className="homePage">
            <h1>Rank Pok&eacute;mon!!!</h1>
            <div className="buttons">
                <button>Red/Blue</button>
                <button>Sword/Shield</button>
                <button>Water Types</button>
                <button>Custom</button>
            </div>
            <div className="footer">
                &copy;2020 Mina Kemp
            </div>
        </div>
    )
}
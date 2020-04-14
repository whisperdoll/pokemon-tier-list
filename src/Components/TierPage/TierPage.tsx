import React from "react";
import "./TierPage.scss";
import TierList from "./TierList/TierList";
import TierInventory from "./TierInventory/TierInventory";

export default function TierPage()
{
    return (
        <div className="tierPage">
            <div className="header">
                <h1>TITLE</h1>
                <button>Save and Share</button>
            </div>
            <TierList />
            <TierInventory />
        </div>
    )
}
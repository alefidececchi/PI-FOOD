import React from "react";

function Recipe({ title, image, dietTypes, i }) {

    return (
        <div>
            <h3>{title}</h3>
            <img src={image} alt={title} />
            <div>
                {dietTypes.map((d, i) => <span key={`${d}-${i}`}> {d} </span>)}
            </div>
        </div>
    )
}

export default Recipe
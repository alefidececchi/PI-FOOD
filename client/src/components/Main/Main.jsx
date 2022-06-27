import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Main() {

    const recipes = useSelector(state => state.recipes)

    return (
        <div>
            <h1>Hey! i'm Main</h1>
            <div>

                {
                    recipes && recipes.map((r, i) => {
                        return (
                            <div key={`${r.title}-${i}`} >
                                <h3>{r.title}</h3>
                                <img src={r.image} />
                                <div>
                                    {r.dietTypes.map((d, i) => <span key={`${d}-${i}`}> {d} </span>)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Main
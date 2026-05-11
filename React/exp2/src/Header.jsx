import React from "react"

function Header(props) {
    return(
        <header style={{background:"blue"  , padding:"1.5rem"}}>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;
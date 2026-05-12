import React from "react"

function Footer(props) {
    return(
       <footer style={{background:'blue' ,padding:"2rem"}}>
        <p>{props.tagline}</p>
        <small>{props.copyright}</small>
       </footer>
    );
}
export default Footer;
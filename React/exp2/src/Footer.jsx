import React from "react"

function Footer(props) {
    return(
       <footer style={{background:'#f1f1f1' ,padding:"1rem"}}>
        <p>{props.tagline}</p>
        <small>{props.copyright}</small>
       </footer>
    );
}
export default Footer;
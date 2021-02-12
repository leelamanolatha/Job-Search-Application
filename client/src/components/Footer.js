import React from 'react'

import "./Footer.css";

// function to return footer component.
export default function Footer() {
    return (
        <footer>
            <div className="about">
                <span>A Job Search website for Blue collared workers to find their desired jobs, post pandemic.</span>
            </div>
            
            <div className="links">
                <a href="https://www.linkedin.com/in/leelamanolathaa/" target="_blank">
                    <img src="/assets/icon/linkedin.png" />
                </a>
                <a href="https://github.com/leelamanolatha" target="_blank">
                    <img src="/assets/icon/github.jpg" />
                </a>
            </div>
        </footer>
    )
}
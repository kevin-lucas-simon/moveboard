import React from "react";
type PropsSVG = React.SVGProps<SVGSVGElement>;

export function MoveBoardLogo(props: PropsSVG) {
    return (
        <svg {...props} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <mask id="cutout">
                    <rect width="24" height="24" fill="white"/>
                    <circle cx="15" cy="9" r="3" fill="black"/>
                </mask>
            </defs>
            <path d="M12 0H20A4 4 0 0 1 24 4V20A4 4 0 0 1 20 24H4A4 4 0 0 1 0 20V12A12 12 0 0 1 12 0Z" fill="currentColor" mask="url(#cutout)"/>
        </svg>
    );
}

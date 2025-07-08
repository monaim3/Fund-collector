import React from "react";
const Footer =()=> {
    return (    
        <div className="flex h-16 items-center justify-center border-t">            
            <p className="text-sm leading-loose">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
        </div>
        );
}

export default Footer;
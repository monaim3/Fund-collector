import React from "react";
const Footer =()=> {
    return (    
        <div className="flex h-16   bg-gradient-to-r from-[#2596be] to-[#2a3e97] items-center justify-center border-t">            
            <p className="text-sm leading-loose text-white">
                &copy; {new Date().getFullYear()} CSE-112 Batch All rights reserved.
            </p>
        </div>
        );
}

export default Footer;
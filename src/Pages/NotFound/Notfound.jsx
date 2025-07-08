
// ** Imoprt icons
import { Button } from "@/components/ui/button"

import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col items-center justify-center pt-10">
                <img src="/image/404page.png" className="w-[700px]" />
                <h3 className="font-[500] mt-3 text-4xl">
                    Oops! The Page You're Looking For Doesn't Exist.
                </h3>
                <Link to="/" className="pt-10">
                    <Button className="px-7 py-6">Back To Home</Button>
                </Link>
            </div>
        </>
    );
}
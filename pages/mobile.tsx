import { useRouter } from "next/router";
import React from "react";

export default function Mobile() {
    return (
        <div className="font-primary flex flex-col items-center justify-center h-screen">
            <p className="text-4xl text-center absolute top-5 border-b border-black">Memory of Yesterday</p>
            <p className="text-4xl text-center">Sorry...mobile isn&apos;t supported yet.</p>
            <p className="text-4xl text-center">Please go on your laptop! 😁</p>
        </div>
    )
}
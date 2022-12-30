import { useRouter } from "next/router";
import React from "react";

export default function Mobile() {
    const router = useRouter()

    React.useEffect(() => {
        const checkWindow = () => {
            if (typeof window !== 'undefined') {
                if (window.innerWidth > 1000) {
                    router.push("../index");
                }
            }
        }

        checkWindow();
    }, [router]);


    return (
        <div className="font-primary flex flex-col items-center justify-center h-screen">
            <p className="text-4xl text-center absolute top-5 border-b border-black">Memory of Yesterday</p>
            <p className="text-4xl text-center">Sorry...mobile isn&apos;t supported yet.</p>
            <p className="text-4xl text-center">Come back later! 😁</p>
        </div>
    )
}
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar({ username }: { username: string | null }) {
    const router = useRouter()
    const [canGoBack, setCanGoBack] = React.useState<boolean>(true);

    React.useEffect(() => {
        const hostnameRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im;
        const current_host = document.baseURI.match(hostnameRegex)
        const last_host = document.referrer.match(hostnameRegex)
        // if (current_host !== null && last_host !== null) {
        //     if (current_host[1] === last_host[1]) {
        //         setCanGoBack(true);
        //     }
        // } else {
        //     setCanGoBack(false);
        // }
    }, []);

    const handleBack = () => {
        if (canGoBack) {
            router.back()
        }
    }

    const handleProfile = () => {
        if (username !== null) {
            router.push(`../../${username}`)
        }
    }
    //  py-10
    return (
        <div className='fixed top-0 left-0 w-min h-full bg-white border-black flex flex-col justify-between py-10'
            style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem", borderRightWidth: '2px' }}>
            <p className='cursor-pointer' onClick={handleBack} style={{transform:"rotate(-90deg)"}}>BACK</p>
            <p className='cursor-pointer' onClick={handleProfile} style={{transform:"rotate(-90deg)"}}>PROFILE</p>
            <Link href={"/landing"} style={{transform:"rotate(-90deg)"}}>
                <p>LANDING</p>
            </Link>
        </div>
    )
}
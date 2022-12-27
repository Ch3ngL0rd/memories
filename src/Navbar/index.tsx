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

    return (
        <div className='fixed top-0 left-0 border-r border-black w-min h-screen bg-white flex flex-col justify-between py-10'>
            <p className='-rotate-90 cursor-pointer' onClick={handleBack}>BACK</p>
            <div onClick={handleProfile} className="cursor-pointer">
                <p className='-rotate-90'>PROFILE</p>
            </div>
            <Link href={"../../home"}><p className='-rotate-90'>HOME</p></Link>
        </div>
    )
}
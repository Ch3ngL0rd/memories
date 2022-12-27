import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar({username}: {username : string}) {
    const router = useRouter()

    return (
        <div className='fixed top-0 left-0 border-r border-black w-min h-screen bg-white flex flex-col justify-between py-10'>
            <p className='-rotate-90 cursor-pointer' onClick={router.back}>BACK</p>
            <Link href={`../../${username}`}><p className='-rotate-90'>PROFILE</p></Link>
            <Link href={"../../home"}><p className='-rotate-90'>HOME</p></Link>
        </div>
    )
}
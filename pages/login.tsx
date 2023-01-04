import Head from "next/head"
import Link from "next/link"
import React, { SyntheticEvent } from "react"
import { pb } from "../src/pocketbase_config"
import { useRouter } from "next/router"

export default function Login() {
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [err, setErr] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter()

    const handleLogin = async (e: SyntheticEvent) => {
        setLoading(true);
        setErr(false);
        e.preventDefault();
        try {
            const authData = await pb.collection('users').authWithPassword(
                email,
                password,
            );
            router.push("./home")
        } catch (err) {
            setErr(true);
        }
        setLoading(false);
    }
    return (
        <>
            <Head>
                <title>Memories of Yesterday</title>
            </Head>
            <div className="flex flex-col justify-center items-center h-screen w-screen font-primary">
                <div className="min-w-[400px]">
                    <div className="mb-10 w-full flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-4xl text-left">Welcome back</p>
                            <p className="font-normal text-left opacity-60">Please login into your account</p>
                        </div>
                        {
                            loading === true ? 
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className="w-full text-center mb-10"
                        style={{ visibility: err === false ? "hidden" : "visible" }}>
                        <p>Incorrect login details</p>
                    </div>
                    <form className="flex flex-col justify-start items-start w-full mb-16" onSubmit={handleLogin}>
                        <input className="focus:outline-none focus:shadow-outline border-b border-black w-full mb-10 pb-2"
                            type="email" id="email" placeholder="Email" name="email"
                            onInput={(e) => setEmail(e.currentTarget.value)} />
                        <input className="focus:outline-none focus:shadow-outline border-b border-black w-full mb-10 pb-2"
                            type="password" id="password" placeholder="Password" name="password"
                            onInput={(e) => setPassword(e.currentTarget.value)} />
                        {/* <button className="w-full text-end mb-10">
                        <p className="underline font-medium">Forgot password?</p>
                    </button> */}
                        <button className="w-full p-3 flex flex-row justify-center gap-2 mt-10"
                            style={{ backgroundColor: "#393939" }}
                            type="submit">
                            <p className="font-normal text-white">Login</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </form>
                    <div className="flex flex-row justify-between items-center text-sm">
                        <p className="opacity-60">Don't have an account yet?</p>
                        <Link href={"./signup"}>
                            <p className="underline">Sign up for free</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
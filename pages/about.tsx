import Link from "next/link";

export default function About() {
    return (
        <div className="grid grid-cols-8 h-screen w-full font-primary">
            <div className="md:col-span-2"></div>
            <div className="col-span-8 md:col-span-4 flex justify-start flex-col h-screen align-center mx-10">
                <h1 className="xl:text-5xl text-3xl text-center font-semibold my-10">About</h1>
                <div className="leading-8 my-10 font-light">
                    <p>

                        One small thing that brings me a lot of joy is the "year ago" feature on Snapchat.
                        Every time I see a memory from a year ago, it reminds me of where I was at that time,
                        the challenges I've faced since then, the happiness I've experienced, and the friendships I've made.
                        It's a really powerful way to reflect on my journey over the past year.
                        <br /><br />
                        As I was thinking about all these memories, I realised that I really want to find a better way to capture them.
                        One of my good friends is an avid journaler, while I tend to rely more on taking photos.
                        So I had an idea: what if we combined the two approaches and created a "social journalling" project?
                        We could help each other remember and document all the special moments we've shared, and even
                        add in details that the other person might have missed.
                        <br /><br />
                    </p>
                    <div className="text-center">
                        <p>
                            That's the goal of this project – to create a<br />
                            <b className="font-semibold"> meaningful and interactive way to keep track of our memories.</b>
                        </p>
                    </div>
                </div>
            </div>
            <footer className="fixed bottom-5 right-10 flex justify-between w-40">
                <Link href={"/landing"}>LANDING</Link>
                <Link href={"/about"}>ABOUT</Link>
            </footer>
        </div >
    )
}
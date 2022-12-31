import Link from "next/link";
import React from "react";
import styles from "../styles/Landing.module.css";
import posts from "../src/landingPosts";
import { Post } from "../src/interface";
import Head from "next/head";

export default function Index() {
    const photoRefs = React.useRef<HTMLImageElement[]>([]);
    const [isHover, setIsHover] = React.useState<boolean>(false);
    const [post, setPost] = React.useState<Post | null>(null);
    // Seed used to randomise photo width
    const seed = 324001409;

    const handleHover = (element: HTMLImageElement, currentPost: Post) => {
        setIsHover(true);
        setPost(currentPost);
        for (let i = 0; i < photoRefs.current.length; i++) {
            photoRefs.current[i].style.scale = "1.0"
            if (photoRefs.current[i] === element) {
                photoRefs.current[i].style.opacity = "1"
                continue;
            }
            photoRefs.current[i].style.scale = "0.9"
            photoRefs.current[i].style.opacity = "0.2"
        }
    }

    const handleHoverExit = () => {
        setIsHover(false);
        setPost(null);
        for (let i = 0; i < photoRefs.current.length; i++) {
            photoRefs.current[i].style.opacity = "1.0"
            photoRefs.current[i].style.scale = "1.0"
        }
    }

    React.useEffect(() => {
        for (let i = 0; i < photoRefs.current.length; i++) {
            photoRefs.current[i].style.transition = "opacity 0.5s ease-out 0s, scale 0.5s ease-out 0s"
        }
    }, [photoRefs])

    return (
        <>
            <Head>
                <title>Memories of Yesterday</title>
            </Head>
            <div className="grid grid-cols-10 h-screen overflow-hidden font-primary">
                <div className="col-span-7 flex flex-row justify-center h-screen"
                    onMouseLeave={handleHoverExit}>
                    <div
                        className="flex flex-col w-full items-end relative justify-center"
                    >
                        {posts.slice(0, 3).map((currentPost, idx) => {
                            const randomWidth = 60 + ((seed + idx * idx ** 2) ** 2) % 30;
                            return (
                                <Link className="relative flex flex-row justify-end" key={currentPost.title}
                                    href={`xX_Ch3ngL0rd_Xx/journal/${currentPost.journal_id}`}>
                                    <img
                                        ref={(el) => photoRefs.current[idx] = el!}
                                        onMouseEnter={(el) => handleHover(el.currentTarget, currentPost)}
                                        src={`${currentPost.image}.jpg`} className={`object-cover py-1 px-1 relative`}
                                        style={{ width: `${randomWidth}%` }}
                                    />
                                    {
                                        post === currentPost ?
                                            <p className="absolute bottom-2 right-2 mr-1 text-lg text-white pointer-events-none font-medium"
                                                style={{ textShadow: "1.5px 1.5px #000000" }}>{currentPost.caption.toLowerCase()}</p>
                                            :
                                            <></>
                                    }
                                </Link>)
                        })}
                    </div>
                    <div className="flex flex-col w-full items-start justify-center">
                        {posts.slice(3,).map((currentPost, idx) => {
                            const randomWidth = 60 + ((seed + idx * idx ** 2) ** 2) % 30;
                            return (
                                <Link className="relative flex flex-row justify-start" key={currentPost.title}
                                    href={`xX_Ch3ngL0rd_Xx/journal/${currentPost.journal_id}`}>
                                    <img
                                        ref={(el) => photoRefs.current[idx + 3] = el!}
                                        onMouseEnter={(el) => handleHover(el.currentTarget, currentPost)}
                                        src={`${currentPost.image}.jpg`} className={`object-cover py-1 px-1`}
                                        style={{ width: `${randomWidth}%` }}
                                    />
                                    {
                                        post === currentPost ?
                                            <p className="absolute bottom-2 left-2 mr-1 text-lg text-white pointer-events-none font-medium"
                                                style={{ textShadow: "1.5px 1.5px #000000" }}>{currentPost.caption.toLowerCase()}</p>
                                            :
                                            <></>
                                    }
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-center items-end mr-10">
                    <div className="flex flex-col w-full relative justify-center">
                        <div
                            style={{
                                position: 'absolute',
                                transition: "opacity 0.5s ease-in-out 0s, scale 0.5s ease-in-out 0s",
                                scale: isHover ? "1" : "1.2",
                                opacity: isHover ? "1" : "0",
                            }}>
                            <h1 className="xl:text-7xl md:text-6xl text-start font-light"
                                style={{ lineHeight: 1.25, letterSpacing: '-0.05em' }}>{post?.title}</h1>
                            <p className="text-base text-start mt-6 font-light leading-8">{post?.entry}</p>
                        </div>
                        <div
                            style={{
                                visibility: "visible",
                                transition: "opacity 0.5s ease-in-out 0s, scale 0.5s ease-in-out 0s",
                                scale: isHover ? "0.80" : "1",
                                opacity: isHover ? "0" : "1",
                            }}>
                            <h1 className="xl:text-7xl md:text-6xl text-end font-light" style={{ lineHeight: 1.25 }}> Memory<br />of<br />Yesterday</h1>
                            <p className="text-base text-end mt-6 font-light">dedicated to my friends & family<br />by zachary cheng</p>
                        </div>
                    </div>
                </div >
                <footer className="absolute bottom-5 right-10 flex justify-between w-40">
                    <Link href={"/"}>LANDING</Link>
                    <Link href={"/about"}>ABOUT</Link>
                </footer>
            </div >
        </>
    )
}
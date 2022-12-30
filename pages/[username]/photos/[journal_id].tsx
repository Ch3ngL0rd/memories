import React from "react";
import Navbar from "../../../src/Navbar";
import { Journal, Image } from "../../../src/interface";
import { pb } from "../../../src/pocketbase_config";
import { useRouter } from "next/router";
import styles from "../../../styles/Photos.module.css"
import Link from "next/link";

export default function Photo({ journal }: { journal: Journal | null }) {
    const router = useRouter()
    const { username } = router.query;
    const photoRefs = React.useRef<HTMLImageElement[]>([]);
    const divRef = React.useRef<HTMLDivElement>(null);
    const [hover, setHover] = React.useState<boolean>(false);
    const [scrollPercent, setScrollPercent] = React.useState<number>(0.0);
    const [caption, setCaption] = React.useState<string | null>(null)

    if (journal === null || journal?.expand["photos(journal_id)"] === undefined) {
        return (
            <>
                <Navbar username={null} />
                <div className="w-screen h-screen flex flex-col justify-center items-center">
                    <h1 className="text-3xl text-black font-light">
                        Sorry, we couldn't find any photos.
                    </h1>
                    <br /><br />
                    <div className="cursor-pointer" onClick={router.back}>
                        <h1
                            className="text-3xl text-black font-light underline">Back</h1>
                    </div>
                </div>
            </>
        )
    }

    const scrollDot = () => {
        if (!divRef.current) {
            return;
        }
        setScrollPercent(100 * ((divRef.current.scrollLeft + divRef.current.clientWidth) / divRef.current.scrollWidth) ** 2)
    }

    const handleHover = (element: HTMLImageElement, image: Image) => {
        if (image.caption !== undefined) {
            setCaption(image.caption);
        }
        for (let i = 0; i < photoRefs.current.length; i++) {
            if (photoRefs.current[i] === element) {
                photoRefs.current[i].style.opacity = "1"
                continue;
            }
            photoRefs.current[i].style.opacity = "0.2"
            photoRefs.current[i].style.scale = "0.9"
        }
    }
    const handleExit = () => {
        setCaption(null);
        for (let i = 0; i < photoRefs.current.length; i++) {
            photoRefs.current[i].style.opacity = "1"
            photoRefs.current[i].style.scale = "1"
        }
    }

    const breakpoint = Math.floor(journal.expand["photos(journal_id)"].length / 2);
    const images = journal.expand["photos(journal_id)"];
    const date = new Date(journal.date.split(" ")[0]).toLocaleDateString(
        "en-US", { day: 'numeric', month: 'long', year: 'numeric' }
    );

    if (images.length <= 2) {
        return (
            <>
                <Navbar username={journal.expand.creator.username} />
                <div className="grid grid-cols-2 h-[100vh] w-[100vw] pl-[5vw] overflow-x-hidden font-primary">
                    <div className="row-span-1 flex flex-col justify-center items-center w-full h-screen px-5 max-h-screen overflow-y-hidden">
                        {images.map((image: Image, idx: number) => {
                            return (
                                <div className="py-5 px-5 relative flex justify-center items-center"
                                    style={{ maxHeight: `${100 / images.length}%`, maxWidth: `80%` }}
                                    key={image.id}>
                                    <img className="object-contain"
                                        ref={(el) => photoRefs.current[idx] = el!}
                                        src={`http://127.0.0.1:8090/api/files/${image.collectionId}/${image.id}/${image.photo}`} />
                                </div>
                            )
                        })}
                    </div>
                    <div className="row-span-1 flex flex-col justify-center items-end h-full mr-5">
                        <h1 className="text-7xl font-light py-4 text-end" style={{ letterSpacing: '-0.05em' }}>{journal.title}</h1>
                        <p className="text-2xl text-end">{date}</p>
                        <p className="text-2xl text-end">{images.length} {images.length === 1 ? "Memory" : "Memories"}</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar username={journal.expand.creator.username} />
            <div className="grid grid-rows-3 h-screen w-[100vw] pl-[5vw] font-primary">
                <div className="absolute w-[90vw]">
                    <svg width={20} height={20} className="relative"
                        style={{ left: `${scrollPercent}%` }}>
                        <circle
                            cx={10}
                            cy={10}
                            r={5}
                            fill="black"
                        />
                    </svg>
                </div>
                <div className="row-span-2">
                    <div ref={divRef} onScroll={scrollDot} className={`flex flex-row justify-start overflow-x-scroll mt-5 items-center relative ${styles.container} h-full`}>
                        {images.map((image: Image, idx: number) => {
                            const randomHeight = 70 + Array.from(image.id)
                                .map((letter) => letter.charCodeAt(0) ** 2)
                                .reduce((sum, x) => sum + x, 0) % 20;
                            return (
                                <img
                                    className="px-2 cursor-pointer"
                                    onMouseEnter={(el) => handleHover(el.currentTarget, image)}
                                    onMouseLeave={handleExit}
                                    onClick={() => router.push(`../../../photo/${image.id}`)}
                                    ref={(el) => photoRefs.current[idx] = el!}
                                    style={{ height: `${randomHeight}%`, transition: 'all 0.5s ease-in-out' }} key={image.id}
                                    src={`http://127.0.0.1:8090/api/files/${image.collectionId}/${image.id}/${image.photo}`} />
                            )
                        })}
                    </div>
                </div>
                <div className="row-span-1 flex flex-col justify-center items-end h-full">
                    <div className="absolute flex flex-row w-full justify-center items-center"
                        style={{ opacity: caption !== null ? "1" : "0", transition: "all 0.5s ease-in-out" }}>
                        <p className="text-2xl font-light text-center w-[50%] h-min py-5 px-5">{caption}</p>
                    </div>
                    <div className="mr-5"
                        style={{ opacity: caption === null ? "1" : "0", transition: "all 0.5s ease-in-out" }}>
                        <h1 className="text-7xl py-4 text-end" style={{ letterSpacing: '-0.05em' }}>{journal.title}</h1>
                        <p className="text-2xl text-end">{date}</p>
                        <p className="text-2xl text-end">{images.length} {images.length === 1 ? "Memory" : "Memories"}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context: { params: { journal_id: string, username: string }; }) {
    // Call an external API endpoint to get posts
    try {
        const journal = await pb.collection('journal').getOne(context.params.journal_id, {
            expand: "photos(journal_id),creator"
        });
        return {
            props: {
                journal: JSON.parse(JSON.stringify(journal)),
            },
        }
    } catch {
        return {
            props: {
                journal: null
            }
        }
    }
}

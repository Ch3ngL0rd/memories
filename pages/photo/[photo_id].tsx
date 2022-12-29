import React from "react";
import Navbar from "../../src/Navbar";
import { pb } from "../../src/pocketbase_config";
import { useRouter } from "next/router";
import Balancer from 'react-wrap-balancer'
import Link from "next/link";

interface Photo {
    caption: string,
    collectionId: string,
    collectionName: string,
    created: string,
    id: string,
    journal_id: string,
    photo: string,
    updated: string,
    expand: any,
}

export default function Photo({ photo }: { photo: Photo | null }) {
    const router = useRouter();
    const [isHover, setHover] = React.useState<boolean>(false);

    if (photo === null) {
        return (
            <>
                <Navbar username={null} />
                <div className="w-screen h-screen flex flex-col justify-center items-center">
                    <Balancer>
                        <h1 className="text-3xl text-center text-black font-light">
                            Sorry, we couldn't find your photo.
                            <br /><br />
                            Check that the link is correct and you have been given permissions to view the photo.
                        </h1>
                    </Balancer>
                    <br /><br />
                    <Link href={"../../home"}>
                        <h1
                            className="text-3xl text-center text-black font-light underline cursor-pointer">Go Home</h1>
                    </Link>
                </div>
            </>
        )
    }
    
    const username = photo.expand.journal_id.expand.creator.username;
    const journal_route = `../../../../${username}/journal/${photo.expand.journal_id.id}`;
    return (
        <>
            <div className="relative h-screen overflow-x-hidden">
                <img className="h-[100%] object-contain w-full py-[2.5%]"
                    src={`http://127.0.0.1:8090/api/files/${photo.collectionId}/${photo.id}/${photo.photo}`} />
                <div className="flex flex-row justify-end align-center absolute right-0 bottom-0 mb-4 mr-4"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-16 h-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                </div>
                <div className="relative"
                    style={{
                        transition: "left 0.8s ease-in-out",
                        left: isHover ? "0%" : "50%",
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <div className="absolute right-0 bottom-0 max-w-[33%] mb-4 mr-4 py-4 px-4 bg-white border-black border-2">
                        <Balancer>
                            <h1 className="text-3xl text-end text-black font-medium">{photo.caption}</h1>
                        </Balancer>
                        <Link href={journal_route}>
                            <p className="text-2xl text-end text-black font-light underline">"{photo.expand.journal_id.title}"</p>
                        </Link>
                        <p className="text-2xl text-end text-black font-light">by {username}</p>
                    </div>
                </div>

            </div>

            <Navbar username={username} />
        </>
    )
}

export async function getServerSideProps(context: { params: { photo_id: string }; }) {
    // Call an external API endpoint to get posts
    try {
        const record = await pb.collection('photos').getOne(context.params.photo_id, {
            expand: "journal_id.creator"
        });

        return {
            props: {
                photo: JSON.parse(JSON.stringify(record)),
            },
        }
    } catch {
        return {
            props: {
                photo: null
            }
        }
    }
}
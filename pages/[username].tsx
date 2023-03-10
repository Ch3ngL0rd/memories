import React from "react";
import Navbar from "../src/Navbar";
import { Journal, User, Image } from "../src/interface";
import { pb, url } from "../src/pocketbase_config";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Profile({ user, journals }: { user: User | null, journals: { items: Journal[] } | null }) {
    const divRefs = React.useRef<HTMLDivElement[]>([]);
    const [hover, setHover] = React.useState<boolean>(false);
    const [coverImage, setCoverImage] = React.useState<Image | null>(null);
    const router = useRouter()
    const { username } = router.query;

    if (user === null) {
        return (
            <>
                <Navbar username={null} />
                <Head>
                    <title>404 Not Found</title>
                </Head>
                <div className="flex flex-col justify-center items-center h-screen w-full font-primary text-4xl text-center">
                    <p>SORRY<br />{username} NOT FOUND</p>
                    <br />
                    <div className="cursor-pointer" onClick={router.back}>
                        <h1
                            className="text-3xl text-black font-light underline">Back</h1>
                    </div>
                </div>
            </>
        )
    }

    const handleHover = (element: HTMLDivElement) => {
        setHover(true);
        for (let i = 0; i < divRefs.current.length; i++) {
            if (divRefs.current[i] === element) {
                divRefs.current[i].style.opacity = "1"
                continue;
            }
            divRefs.current[i].style.opacity = "0.3"
        }
    }

    const handleExit = () => {
        setHover(false);
        setCoverImage(null);
        for (let i = 0; i < divRefs.current.length; i++) {
            divRefs.current[i].style.opacity = "0.3"
        }
    }

    return (
        <>
            <Navbar username={user.username} />
            <Head>
                <title>{user.name} @ {user.username}</title>
            </Head>
            <div className="absolute flex flex-row justify-between pl-4 py-4 font-primary ml-[5vw] w-[93vw] h-[5vw] top-0">
                <p>JOURNAL ENTRIES</p>
                <p className="text-end">{user.name.toUpperCase()}<br />{user.username.toUpperCase()}</p>
            </div>
            <div className="font-primary flex flex-col items-end"
                style={{ marginLeft: "5vw", width: "93vw" }}>
                <div className="grid grid-cols-9">
                    <div className="col-span-4 w-full h-screen flex flex-col justify-center items-center">
                        <img src={coverImage !== null ? `${url}/api/files/${coverImage?.collectionId}/${coverImage?.id}/${coverImage?.photo}` : ""}
                            className="fixed aspect-square h-1/2 object-cover"
                            loading={"eager"}
                            style={{
                                opacity: hover === true ? "1" : "0",
                                transition: "all 0.5s ease-in-out",
                                visibility: coverImage !== null ? "visible" : "hidden",
                            }} alt={""} />
                    </div>
                    <div className="col-span-5 relative top-[5vw]">
                        {journals?.items.map((journal, idx) => {
                            const date = new Date(journal.date.split(" ")[0]).toLocaleDateString(
                                "en-US", { day: 'numeric', month: 'long', year: 'numeric' }
                            );
                            return (
                                <Link href={`./${user.username}/journal/${journal.id}`} key={idx}>
                                    <div
                                        className="text-end pb-4"
                                        style={{ opacity: "0.3", transition: "opacity 0.4s ease-in-out" }}
                                        ref={(el) => divRefs.current[idx] = el!}
                                        onMouseEnter={(el) => {
                                            handleHover(el.currentTarget)
                                            if (journal.expand.cover_image !== undefined) {
                                                setCoverImage(journal.expand.cover_image);
                                            } else {
                                                setCoverImage(null);
                                            }
                                        }}
                                        onMouseLeave={handleExit}
                                    >
                                        <p className="text-7xl" style={{ color: "#393939" }}>{journal.title.toUpperCase()}</p>
                                        <p>{date}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export async function getStaticProps(context: { params: { username: string }; }) {
    // Call an external API endpoint to get posts
    try {
        const record = await pb.collection('users_view').getFirstListItem(`username="${context.params.username}"`, {
        });
        // fetch a paginated records list
        const resultList = await pb.collection('journal').getList(1, 50, {
            expand: 'cover_image',
            filter: `creator = '${record.id}'`,
            sort: '-date'
        });
        return {
            props: {
                user: JSON.parse(JSON.stringify(record)),
                journals: JSON.parse(JSON.stringify(resultList)),
            }
        };
    } catch (err) {
        console.log(err)
        return {
            props: {
                user: null,
                journals: null,
            }
        }
    }
}



// Returns all usernames
export async function getStaticPaths() {
    try {
        const records = await pb.collection('users_view').getFullList(200 /* batch size */, {
            sort: '-created',
        });

        const users: User[] = JSON.parse(JSON.stringify(records))
        return {
            paths: users.map((user: User) => {
                return `/${user.username}`;
            }),
            fallback: false,
        }
    } catch {
        return {
            paths: [],
            fallback: false,
        }
    }
}
import Link from 'next/link';
import { useRouter } from 'next/router'
import PocketBase from 'pocketbase';
import React from 'react';
import Balancer from 'react-wrap-balancer'

const pb = new PocketBase('http://127.0.0.1:8090');

interface Journal {
    collectionId: string,
    collectionName: string,
    cover_image: string,
    created: string,
    creator: string,
    date: string,
    entry: string,
    event_id: string,
    id: string,
    title: string,
    updated: string,
    expand: any,
}

export default function JournalPage({ journal }: { journal: Journal | null }) {
    const router = useRouter()
    const { username, journal_id } = router.query;

    if (journal === null) {
        return (
            <div>
                <h1>Sorry, we couldn't find this file...</h1>
            </div>
        )
    }

    const [scrollPos, setScrollPos] = React.useState<number>(0);

    // Use the useEffect hook to update the scroll position when the user scrolls
    React.useEffect(() => {
        function handleScroll() {
            setScrollPos(window.scrollY / window.screen.height);
            console.log(window.scrollY);

            console.log(scrollPos);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cover_image = journal.expand.cover_image;
    const unfiltered_images = journal.expand["photos(journal_id)"] !== undefined ? journal.expand["photos(journal_id)"] : [];
    const images = unfiltered_images.filter((image: { id: string }) => image.id !== cover_image.id);
    const text = journal.entry.split('\n');
    const date = new Date(journal.expand.event_id.start_date.split(" ")[0]).toLocaleDateString(
        "en-US", { day: 'numeric', month: 'long', year: 'numeric' }
    );

    const handleBack = () => {
        router.back()
    }

    const handlePhoto = () => {
        router.push(`../photos/${journal_id}`);
    }

    return (
        <div className="relative font-primary">
            <div className='w-full h-screen relative'>
                {cover_image === undefined ?
                    <></>
                    :
                    <img className="absolute w-full object-cover h-full -z-50 top-0"
                        src={`http://127.0.0.1:8090/api/files/${cover_image.collectionId}/${cover_image.id}/${cover_image.photo}`} />
                }
                <div className="absolute bottom-0 right-0 w-1/2 mb-8 mr-8">
                    <p className="text-2xl text-end text-white"
                        style={{ textShadow: "1.5px 1.5px #000000" }}
                    >{date}</p>
                    <h1 className="text-8xl text-end text-white"
                        style={{
                            textShadow: "2px 2px #000000"
                        }}
                    >{journal.title}</h1>
                    <p className="text-2xl text-end text-white"
                        style={{ textShadow: "1.5px 1.5px #000000" }}
                    >by {journal.expand.creator.name}</p>
                </div>
            </div>
            <div className='fixed top-0 left-0 border-r border-black w-min h-screen bg-white flex flex-col justify-between py-10'>
                <p className='-rotate-90 cursor-pointer' onClick={handleBack}>BACK</p>
                <Link href={`../../${journal.expand.creator.username}`}><p className='-rotate-90'>PROFILE</p></Link>
                <Link href={"../../home"}><p className='-rotate-90'>HOME</p></Link>
            </div>
            {text.map((text, idx) => {
                if (idx < images.length) {
                    return (
                        <div className="flex align-center justify-center h-[50vh] my-10 mx-40" key={images[idx].id}
                            style={{ flexDirection: idx % 2 === 0 ? 'row-reverse' : "row" }}>
                            <img
                                className="object-contain max-w-[40%]"
                                src={`http://127.0.0.1:8090/api/files/${images[idx].collectionId}/${images[idx].id}/${images[idx].photo}`} />
                            <p className=" leading-[200%] font-light flex flex-col justify-center mx-10 text-lg">
                                {text}
                            </p>
                        </div>
                    )
                }
                return (
                    <div className="leading-[200%] font-light flex flex-col justify-center mx-40 text-lg text-center" key={idx}>
                        <p>{text}</p>
                    </div>
                );
            })}
            <div>
                <p className="text-center text-sm pb-6">{journal.title} - {date}</p>
            </div>
            <div className='flex flex-row justify-center align-center absolute bottom-0 right-0 mr-6 pb-6 cursor-pointer'
                onClick={handlePhoto}>
                <p className="text-center text-2xl mr-2" >PHOTOS</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </div>
        </div>
    )
}

export async function getServerSideProps(context: { params: { journal_id: string, username: string }; }) {
    // Call an external API endpoint to get posts
    try {
        const journal = await pb.collection('journal').getOne(context.params.journal_id, {
            expand: "creator,cover_image,photos(journal_id),event_id"
        });
        // @ts-ignore
        if (journal.expand.creator.username !== context.params.username) {
            return {
                props: {
                    journal: null
                }
            }
        }
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

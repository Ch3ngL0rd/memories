import { useRouter } from 'next/router'
import PocketBase from 'pocketbase';
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
    const { username, journal_id } = router.query

    if (journal === null) {
        return (
            <div>
                <h1>Sorry, we couldn't find this file...</h1>
            </div>
        )
    }

    const cover_image = journal.expand.cover_image;
    const unfiltered_images = journal.expand["photos(journal_id)"] !== undefined ? journal.expand["photos(journal_id)"] : [];
    const images = unfiltered_images.filter((image: { id: string }) => image.id !== cover_image.id);
    const text = journal.entry.split('\n');
    const date = new Date(journal.expand.event_id.start_date.split(" ")[0]).toLocaleDateString(
        "en-US", { day: 'numeric', month: 'long', year: 'numeric' }
    );
    console.log(journal)
    return (
        <div className="overflow-x-hidden">
            <div className='w-screen h-screen font-primary'>
                {cover_image === undefined ?
                    <></>
                    :
                    <img className="absolute w-full object-cover h-full -z-50"
                        src={`http://127.0.0.1:8090/api/files/${cover_image.collectionId}/${cover_image.id}/${cover_image.photo}`} />
                }
                <div className='absolute bottom-0 right-0 mb-10 mr-10 w-1/2'>
                    <p className="text-2xl text-end text-white"
                        style={{ textShadow: "2px 2px #000000" }}
                    >{date}</p>
                    <h1 className="text-8xl text-end text-white"
                        style={{ textShadow: "2px 2px #000000" }}
                    >{journal.title}</h1>
                </div>
            </div>
            {text.map((text, idx) => {
                if (idx < images.length) {
                    return (
                        <div className="flex align-center justify-center h-[50vh] my-10 mx-40" key={images[idx].id}
                            style={{ flexDirection: idx % 2 === 0 ? 'row-reverse' : "row" }}>
                            <img
                                className="object-contain max-w-[40%]"
                                src={`http://127.0.0.1:8090/api/files/${images[idx].collectionId}/${images[idx].id}/${images[idx].photo}`} />
                            <p className="leading-8 font-light flex flex-col justify-center mx-10 text-lg">
                                {text}
                            </p>
                        </div>
                    )
                }
                return (
                    <div className="leading-8 font-light flex flex-col justify-center mx-40 text-lg text-center" key={idx}>
                        <p>{text}</p>
                    </div>
                );
            })}
            <p className="text-center font-medium text-base mb-5">{journal.title} - {date}</p>
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

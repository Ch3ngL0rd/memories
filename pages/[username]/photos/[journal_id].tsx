import Navbar from "../../../src/Navbar";
import { Journal, Image } from "../../../src/interface";
import { pb } from "../../../src/pocketbase_config";

export default function Photo({ journal }: { journal: Journal | null }) {
    if (journal === null) {
        return (
            <div>
                <p>Could not find photos</p>
            </div>
        )
    }
    const breakpoint = Math.floor(journal.expand["photos(journal_id)"].length / 2);
    const images = journal.expand["photos(journal_id)"];
    return (
        <>
            <Navbar username={null} />
            <div className="grid grid-rows-5 h-screen w-[100vw] pl-[5vw] overflow-x-hidden">
                <div className="row-span-2 flex flex-row justify-start items-start mt-5">
                    {images.slice(0, breakpoint).map((image: Image) => {
                        const randomHeight = 80 + Array.from(image.id)
                            .map((letter) => letter.charCodeAt(0) ** 2)
                            .reduce((sum, x) => sum + x, 0) % 20;
                        return (
                            <img className="px-2"
                                style={{ height: `${randomHeight}%` }} key={image.id}
                                src={`http://127.0.0.1:8090/api/files/${image.collectionId}/${image.id}/${image.photo}`} />
                        )
                    })}
                </div>
                <div className="row-span-1 flex flex-row justify-end items-center h-full mr-5">
                    <h1 className=" font-primary text-7xl font-light" style={{ letterSpacing: '-0.05em' }}>{journal.title}</h1>
                </div>
                <div className="row-span-2 flex flex-row justify-start items-end mb-5">
                    {images.slice(breakpoint).map((image: Image) => {
                        const randomHeight = 70 + Array.from(image.id)
                            .map((letter) => letter.charCodeAt(0) ** 2)
                            .reduce((sum, x) => sum + x, 0) % 30;
                        return (
                            <img className="px-2"
                                style={{ height: `${randomHeight}%` }} key={image.id}
                                src={`http://127.0.0.1:8090/api/files/${image.collectionId}/${image.id}/${image.photo}`} />
                        )
                    })}
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

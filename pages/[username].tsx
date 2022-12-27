import { Journal, User } from "../src/interface";
import { pb } from "../src/pocketbase_config";

export default function Profile({ user, journal }: { user: User | null, journal: Journal | null }) {
    if (user === null) {
        return (
            <>
                <p>Sorry...couldn't find "{user}"</p>
            </>
        )
    }
    console.log(user,journal);
    return (
        <p>Welcome to the profile page</p>
    )
}

export async function getServerSideProps(context: { params: { username: string }; }) {
    // Call an external API endpoint to get posts
    try {
        console.log(`Searching for ${context.params.username}`);
        const record = await pb.collection('users_view').getFirstListItem(`username~"${context.params.username}"`, {
        });
        // fetch a paginated records list
        const resultList = await pb.collection('journal').getList(1, 50, {
            filter: `creator = '${record.id}'`,
        });
        console.log(record,resultList);
        return {
            props: {
                user: JSON.parse(JSON.stringify(record)),
                journals: JSON.parse(JSON.stringify(resultList)),
            }
        };
    } catch {
        return {
            props: {
                user: null,
                journals: null,
            }
        }
    }
}

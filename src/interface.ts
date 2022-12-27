export interface Post {
    event: string,
    date: Date,
    title: string,
    entry: string,
    image: string,
    caption: string,
    journal_id: string,
}

export interface Journal {
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

export interface User {
    avatar: string,
    collectionId: string,
    collectionName: string,
    created: string,
    id: string,
    name: string,
    updated: string,
    user: string,
    username: string,
    expand: any,
}

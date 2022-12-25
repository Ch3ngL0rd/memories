import { Post } from "./interface";

const posts: Post[] = [
    {
        event: "Clubbing w/ MSU?",
        date: new Date("12/23/2022"),
        title: "Double Danger",
        entry: "Two Zacs having fun at the clubs",
        image: "/doubletrouble",
        caption: "I have no clue where this is",
    } as Post,
    {
        event: "MSU Ball",
        date: new Date("10/19/2022"),
        title: "MSU Ball",
        entry: "Dapper in our suits and elegant in our dresses, we all look so handsome and beautiful. What a magical night.",
        image: "/familyphoto",
        caption: "Family Photo!",
    } as Post,
    {
        event: "Carnavron Car Trip",
        date: new Date("6/25/2022"),
        title: "Car Trip to Carnavron!",
        entry: "It was so much fun going on that family trip to Carnarvon! Sucks to be stuck sitting in the middle.",
        image: "/cartrip",
        caption: "The middle seat sucks",
    } as Post,
    {
        event: "Family Photo",
        date: new Date("5/30/2022"),
        title: "Clubbing with the Fam",
        entry: "That night our whole family went clubbing together (except for my sister who is still 17). Such a fun night and this photo captures it perfectly. Counting down the days until you turn 18! Can't wait for you to join us on these kinds of outings.",
        image: "/awnoemily",
        caption: "Say Cheese!",
    } as Post,
    {
        event: "ChengCraft",
        date: new Date("9/5/2022"),
        title: "ChengCraft!",
        entry: "During exam season this year, hopping on with my siblings and cousins to a private realm and building all sorts of cool stuff together was too much fun. I especially remember when we (mostly me and cat) built that cool house (seen behind), and when we blew up my brother's base (sorry not sorry). And even though we never quite made it to the ender dragon, those were some of the most fun gaming sessions I've ever had.",
        image: "/chengcraft",
        caption: "We blew up Caleb's base",
    } as Post,
    {
        event: "MSU Dodgeball Tournament",
        date: new Date("4/12/2022"),
        title: "MSU Dodgeball Tournament",
        entry: "Fond memories of participating in the yearly dodgeball tournament at MSU during my first semester. It was a blast throwing my balls with Eric, Calvin, Matt, Harry, and Jeremy. I can’t wait for the tournament next year - we can’t come last three years in a row!",
        image: "/shhhh",
        caption: "Shhhhhh!",
    } as Post,
    {
        event: "Soccer",
        date: new Date("6/23/2022"),
        title: "SUIIIIIIII",
        entry: "My dad and I at the soccer game. I'm clueless at soccer but it was lots of fun!",
        image: "/soccer",
        caption: "SUIIIIII!",
    } as Post,
    {
        event: "Clarinet Recital",
        date: new Date("9/5/2020"),
        title: "Clarinet Rectical",
        entry: "Me at my clarinet recital! Man, it was such a nerve-wracking experience, but so amazing. I'll never forget the feeling of performing in front of all those people. And a big shout out to my clarinet teacher, Mrs Bex, for helping me get to that point. It truly was a once in a lifetime experience.",
        image: "/warrior",
        caption: "Watch out for my nun-chucks",
    } as Post,
]

export default posts;
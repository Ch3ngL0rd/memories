import Link from "next/link";
import React from "react";
import styles from '../styles/Landing.module.css'
const images1 = ["/doubletrouble.png", "/familyphoto.jpg", "/cartrip.jpg", "/awnoemily.jpg"]
const images2 = ["/chengcraft.png", "/shhhh.jpg", "/soccer.jpeg", "/warrior.jpg"]

export default function Landing() {
    // Seed used to randomise photo width
    const seed = 3240014001;

    return (
        <div className="grid grid-cols-10 h-screen overflow-hidden">
            <div className="col-span-7 flex flex-row justify-center h-screen">
                <div className="flex flex-col w-full items-end relative top-[-10rem]">
                    {images1.map((path, idx) => {
                        const randomWidth = 60 + ((seed + idx * idx ** 2) ** 2) % 40;
                        return (<img
                            src={path} className={`object-cover my-1 mx-1`} key={idx}
                            style={{ width: `${randomWidth}%` }}
                        />)
                    }
                    )}
                </div>
                <div className="flex flex-col w-full items-start">
                    {images2.map((path, idx) => {
                        const randomWidth = 60 + ((seed - idx * idx ** 2) ** 2) % 40;
                        return (<img
                            src={path} className={`object-cover my-1 mx-1`} key={idx}
                            style={{ width: `${randomWidth}%` }}
                        />)
                    }
                    )}
                </div>
            </div>
            <div className="col-span-3 flex flex-col justify-center items-end mr-10">
                <div className="flex flex-col">
                    <h1 className="text-8xl text-end" style={{ lineHeight: 1.25 }}> Memory<br />of<br />Yesterday</h1>
                    <p className="text-base text-end mt-6">dedicated to my friends & family<br />by zachary cheng</p>
                </div>
            </div >
            <footer className="absolute bottom-5 right-10 flex justify-between w-40">
                <Link href={""}>Home</Link>
                <Link href={""}>About</Link>
            </footer>
        </div >
    )
}
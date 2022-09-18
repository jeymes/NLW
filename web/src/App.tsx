import "./styles/main.css";
import {useState, useEffect} from 'react'
import logoImg from '../public/logo-nlw-esports.svg'
import {GameBanner} from "./components/GameBanner";
import {Banner} from "./components/Banner";

import * as Dialog from '@radix-ui/react-dialog'
import { Modal } from "./components/Modal";
import axios from "axios";

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function App() {

    const [games, setGames] = useState < Game[] > ([])

    useEffect(() => {
        axios('http://localhost:3333/games')
        .then(response => {
            setGames(response.data)
        })
    }, [])


    return (
        <div className=" my-20 max-w-[1344px] max-auto flex items-center flex-col ">
            <img src={logoImg}/>

            <h1 className="text-6xl text-white font-black mt-20 ">
                Seu<span className=" text-transparent bg-nlw-gradient bg-clip-text">
                    Duo
                </span>está aqui
            </h1>

            <div className="grid grid-cols-6 gap-6 mt-16 ">
                {
                games.map(game => {
                    return (
                        <GameBanner key={
                                game.id
                            }
                            bannerUrl={
                                game.bannerUrl
                            }
                            title={
                                game.title
                            }
                            adsCount={
                                game._count.ads
                            }/>
                    )
                })
            } </div>

            <Dialog.Root>
                <Banner/>
                <Modal/>
            </Dialog.Root>

        </div>
    )
}

export default App

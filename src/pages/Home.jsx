import {useEffect, useState} from "react";

function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('http://localhost:5144/api/Players');
            const json = await data.json();
            setData(json);
        }
        fetchData().catch();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-center m-10">RPG</h1>
            {data.length !== 0 && data.map(player => (

                <div key={player.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{player.id} - {player.name}</h2>
                    <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Point de vie :<span className="font-bold text-xl"> {player.lifePoint}</span></h3>
                    <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Force : <span className="font-bold text-xl">{player.strength}</span></h3>
                    <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Endurance : <span className="font-bold text-xl">{player.stamina}</span></h3>
                    <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Agilité : <span className="font-bold text-xl">{player.agility}</span></h3>
                    <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Intelligence : <span className="font-bold text-xl">{player.intellect}</span></h3>
                    <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Chance : <span className="font-bold text-xl">{player.luck}</span></h3>
                </div>
            ))}
        </div>
    );
}

export default Home;
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
            <h1>RPG</h1>
            {data.length !== 0 && data.map(player => (
                <div key={player.id}>
                    <h2>{player.id} - {player.name}</h2>
                    <ul>
                        <li>
                            Point de vie : {player.lifePoint}
                        </li>
                        <li>
                            Force : {player.strength}
                        </li>
                        <li>
                            Endurance : {player.stamina}
                        </li>
                        <li>
                            Agilité : {player.agility}
                        </li>
                        <li>
                            Intelligence : {player.intellect}
                        </li>
                        <li>
                            Chance : {player.luck}
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Home;
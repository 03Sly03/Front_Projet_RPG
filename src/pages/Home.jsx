import {useEffect, useState} from "react";

function Home() {

    /**
     * @typeof {Player}
     * @property {int} id
     * @property {string} name
     * @property {int} lifePoint
     * @property {int} strength
     * @property {int} stamina
     * @property {int} agility
     * @property {int} intellect
     * @property {int} luck
     */
    const [dataPlayer, setDataPlayer] = useState(/** @type [{Player}] */ []);
    const [dataEnemies, setDataEnemies] = useState([]);
    const [isPlayerDefense, setIsPlayerDefense] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const playerData = await fetch('http://localhost:5144/api/Players');
            const playerJson = await playerData.json();
            setDataPlayer(playerJson);
            const enemiesData = await fetch('http://localhost:5144/api/Enemies');
            const enemiesJson = await enemiesData.json();
            setDataEnemies(enemiesJson);
        }
        fetchData().catch();
    }, []);

    const attack = (name) => {
        let theEnemy = dataEnemies[0];
        let thePlayer = dataPlayer[0];
        let dicePlayer = Math.floor(Math.random()*(6 - 1 + 1)) + 1;
        let diceEnemy = Math.floor(Math.random()*(6 - 1 + 1)) + 1;
        // if (name === "Player1") {
            if (thePlayer.strength + dicePlayer > theEnemy.strength + diceEnemy) {
                theEnemy.lifePoint -= 2;
                setDataEnemies([theEnemy]);
                alert("Vous avez toucher l'enemie !");
                if (dataEnemies[0].lifePoint <= 0)
                    alert("L'énemie est Dead !");
            }
            else {
                if (isPlayerDefense) {
                    setIsPlayerDefense(false);
                    thePlayer.lifePoint -= 2;
                } else {
                    thePlayer.lifePoint -= 5;
                }
                setDataPlayer([thePlayer]);
                alert("Vous avez été toucher par l'enemie !");
                if (dataPlayer[0].lifePoint <= 0)
                    alert("Vous êtes Dead !");
            }
            document.getElementById("enemie").style.display = 'block';
            document.getElementById("player").style.display = 'none';
    //     } else {
    //         console.log("C'est le tour de l'énemie");
    //     }
    }

    const defend = () => {
        setIsPlayerDefense(true);
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-center m-10">RPG</h1>
            <div className="flex justify-between m-10">
                <div>
                    {dataPlayer.length !== 0 && dataPlayer.map(player => (

                        <div key={player.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{player.id} - {player.name}</h2>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Point de vie :<span className="font-bold text-xl"> {player.lifePoint}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Force : <span className="font-bold text-xl">{player.strength}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Endurance : <span className="font-bold text-xl">{player.stamina}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Agilité : <span className="font-bold text-xl">{player.agility}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Intelligence : <span className="font-bold text-xl">{player.intellect}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Chance : <span className="font-bold text-xl">{player.luck}</span></h3>

                            <div id="player" >
                                <button onClick={() => attack(player.name)} className="player border border-black p-5 rounded-xl bg-red-500">Attack</button>
                                <button onClick={defend} className="player border border-black p-5 rounded-xl bg-orange-500">Defend</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    {dataEnemies.length !== 0 && dataEnemies.map(enemy => (

                        <div key={enemy.id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{enemy.id} - {enemy.name}</h2>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Point de vie :<span className="font-bold text-xl"> {enemy.lifePoint}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Force : <span className="font-bold text-xl">{enemy.strength}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Endurance : <span className="font-bold text-xl">{enemy.stamina}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Agilité : <span className="font-bold text-xl">{enemy.agility}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Intelligence : <span className="font-bold text-xl">{enemy.intellect}</span></h3>
                            <h3 className="font-normal text-gray-700 dark:text-gray-400 mb-2">Chance : <span className="font-bold text-xl">{enemy.luck}</span></h3>

                            <div id="enemie" className="hidden">
                                <button onClick={() => attack(enemy.name)} className="border border-black p-5 rounded-xl bg-red-500">Attack</button>
                                <button onClick={defend} className="enemie border border-black p-5 rounded-xl bg-orange-500" disabled={true}>Defend</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home
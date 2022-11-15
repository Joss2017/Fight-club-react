import React, { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface Hero {
  id: number;
  name: string;
  power: number;
  life: number;
  id_type_weapon: number;
}

const App = () => {
  // const [listHero, setListHero] = useState<any[]>([
  //   { name: 'Coco' },
  //   { name: 'Zozo' },
  //   { name: 'Toto' },
  // ]);
  const [listHero, setListHero] = useState<Hero[]>([]);
  const [listHeroById, setListHeroById] = useState<Hero[] | undefined>();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/heros")
      .then((response: AxiosResponse<{ data: Hero[] }>) => {
        console.log("Reponse GET hero: ", response.data.data);
        const myHero: Hero[] = response.data.data;
        setListHero([...myHero]);
      });
  }, []);

  let handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let userInput = e.currentTarget.value;
    setListHeroById(userInput);
    console.log(userInput);

    if (userInput) {
      axios
        .get(`http://localhost:8080/api/heros/${userInput}`)
        .then((response: AxiosResponse<{ data: Hero[] }>) => {
          console.log("Reponse GET hero: ", response.data.data);
          let myHeroID = [...response.data.data];
          setListHeroById(myHeroID);
          console.log(" mon hero ", myHeroID);
        });
    } else {
      setListHeroById(undefined);
    }
  };

  return (
    <div className="App">
      <ul>
        {listHero.map((hero: any, i: number) => (
          <li key={i}>
            {hero.name} {hero.id_type_weapon}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="recherche ton hero"
        onChange={handlechange}
      />
      <ul>
        {listHeroById ? (
          listHeroById.map((hero: Hero, id) => (
            <li key={id}>
              {hero.name} {hero.id_type_weapon}
            </li>
          ))
        ) : (
          <div>Rien à afficher</div>
        )}
      </ul>
    </div>
  );
};

export default App;

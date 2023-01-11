import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Hero } from '../interface/Hero';
const Home = () => {
  const [listHeros, setListHeros] = useState<Hero[]>([]);

  useEffect(() => {
    const getHeros = async () => {
      const herosData: AxiosResponse<{ data: Hero[] }> = await axios.get(
        'http://localhost:8080/api/heros'
      );
      setListHeros(herosData.data.data);
    };
    getHeros();
  }, []);
  return (
    <div
      className='card d-flex justify-content-center'
      style={{ width: '18rem;' }}
    >
      <div className='card-body'>
        {listHeros.map((hero) => (
          <div className='hero-card-list d-flex' style={{ width: '100%' }}>
            <h5 className='"card-title"'>NAME---: {hero.name}</h5>
            <p className='card-text'>ID---------: {hero.id}</p>
            <p className='card-text'>Power----- : {hero.power}</p>
            <p className='card-text'>Life-------: {hero.life}</p>
            <p className='card-text'>WEAPON-----: {hero.id_type_weapon}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

import { useState, useEffect } from 'react';
import { formatLocationName } from '../utils/UtiHelpers';
import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';
import '../css/PageLocationsList.css';

// TODO: add different colors for different locations; depending on city/cave/mine etc? find a good criterium
// TODO: add prev/next btn for location selection at top(?) => probably need a way to show on what page we are then

const PageLocationsList = ({ onLocationClick }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/location/?limit=21');
      const data = await res.json();

      const formattedLocations = data.results.map((location) => {
        location.name = formatLocationName(location.name);
        return location;
      });

      setLocations(formattedLocations);
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <ComTitle text='Choose location wisely...' className='location-title' />
      <ul className='locations-grid'>
        {locations.map((location) => (
          <ComBtn
            key={location.url}
            text={location.name}
            className='location-btn'
            onClick={() => onLocationClick(location.url)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PageLocationsList;

import { useState, useEffect } from 'react';
import { formatLocationName } from '../utils/UtiHelpers';
import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';
import '../css/PageLocationsList.css';

/**
 * A component that displays a list of locations for the user to choose from.
 *
 * @param {Object} props - The props for the PageLocationsList component.
 * @param {Function} props.onLocationClick - The function to handle when a location is clicked.
 * @returns {JSX.Element} The PageLocationsList component.
 */
const PageLocationsList = ({ onLocationClick }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    /**
     * Fetches a list of locations from the PokeAPI and formats them for display.
     */
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

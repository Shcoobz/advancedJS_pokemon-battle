/**
 * Formats a location name by capitalizing the first letter of each word and replacing hyphens with spaces.
 *
 * @param {string} name - The location name to be formatted.
 * @returns {string} The formatted location name.
 */
export const formatLocationName = (name) => {
  const words = name.split('-');

  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });

  const formattedName = capitalizedWords.join(' ');

  return formattedName;
};

/**
 * Capitalizes the first letter of a Pokémon name.
 *
 * @param {string} pkmName - The Pokémon name to be formatted.
 * @returns {string} The formatted Pokémon name.
 */
export function formatPokemonName(pkmName) {
  return pkmName.charAt(0).toUpperCase() + pkmName.slice(1);
}

/**
 * Converts a Pokémon species URL to a Pokémon URL for fetching detailed Pokémon data.
 *
 * @param {string} speciesUrl - The Pokémon species URL to be converted.
 * @returns {string} The Pokémon URL for fetching data.
 */
export const getPokemonUrlFromSpeciesUrl = (speciesUrl) => {
  const speciesId = speciesUrl.split('/').slice(-2, -1)[0];
  const pokemonName = speciesId.toLowerCase();
  return `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
};

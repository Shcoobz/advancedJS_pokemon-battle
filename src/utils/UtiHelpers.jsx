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

export function formatPokemonName(pkmName) {
  return pkmName.charAt(0).toUpperCase() + pkmName.slice(1);
}

export const getPokemonUrlFromSpeciesUrl = (speciesUrl) => {
  const speciesId = speciesUrl.split('/').slice(-2, -1)[0];
  const pokemonName = speciesId.toLowerCase();
  return `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
};

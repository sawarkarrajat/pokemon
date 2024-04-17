import React, { Fragment, useEffect, useState } from "react";
import { fetcher } from "../utils/commonUtils";
import AutocompleteDropDown from "./Autocomplete";
import Avatar from "@mui/material/Avatar";
const Pokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [abilities, setAbilities] = useState([])
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const plist = await fetcher("https://pokeapi.co/api/v2/pokemon/");
      setList(plist?.results);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPokemonDetails = async () => {
    const selectedOptionObject = list.filter((item) => item.name === selected);
    const url = selectedOptionObject[0]?.url;
    const pokemonDetails = await fetcher(url);
    console.log('pokemonDetails: ', pokemonDetails)
    setSelectedPokemonDetails(pokemonDetails);
    setAbilities( pokemonDetails.abilities)
    console.log('pokemonDetails.abilities: ', pokemonDetails.abilities)

  };

  useEffect(() => {
    if (selected) {
      fetchPokemonDetails();
    }
  }, [selected]);

  return (
    <>
      <h1 style={{textAlign:'center'}}>Poke desk</h1>
      <div>
        <AutocompleteDropDown
          options={list}
          selected={(opt) => setSelected(opt)}
        />
      </div>
      {selectedPokemonDetails && (
        <div className="container">
          <div className="avatarContainer">
            <Avatar
              alt={selectedPokemonDetails.name}
              src={selectedPokemonDetails.sprites.front_default}
              sx={{ width: 300, height: 300 }}
            />
          </div>
          <div className="detailsContainer">
            <p>Basics:</p>
            <ul>
              <li>Name: {selectedPokemonDetails.name}</li>
              <li>Base experience: {selectedPokemonDetails.base_experience}</li>
              <li>Height: {selectedPokemonDetails.height}</li>
            </ul>
            <p>Abilities:</p>
            <ul>

            {abilities.map((item) => (
              <li key={item.ability.name}>{item.ability.name}</li>
            ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Pokemon;

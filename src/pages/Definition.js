import { useState, useEffect } from "react";
import { useNavigation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  console.log(useParams());
  let {search} = useParams();
  useEffect(() => {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
    fetch(url)
      .then((response) =>  {
        if(response.status === 404) {
            setNotFound(true);
        }

        if(!response.ok) {
            setError(true);
            throw new Error('Something went wrong');
        }
        return response.json();
        })
      .then((data) => {
        if(data[0]) {
            setWord(data[0].meanings);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);


  if(notFound === true) {
    return(
    <>
      <NotFound />
      <button
        className="bg-green-400 rounded mx-auto hover:bg-green-600 h-[50px] w-[300px]"
        onClick={() => navigate("/dictionary/")}
      >
        Search the definition of another word!
      </button>
    </>);
  }

  if(error === true) {
    return(
    <>
      <p>Something went wrong, try again?</p>
      <button
        className="bg-green-400 rounded mx-auto hover:bg-green-600 h-[50px] w-[300px]"
        onClick={() => navigate("/dictionary/")}
      >
        Search the definition of another word!
      </button>
    </>);
  }
  return (
    <>
    
      {word
        ? <>
        <h1> Here is a definition:</h1>
        {word.map((meaning) => {
            return (
              <p key={uuidv4()}>
                ({meaning.partOfSpeech}) : {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Again: </p>
          <DefinitionSearch/>
          </>
        : null}
     {/* <button className="bg-green-400 rounded mx-auto hover:bg-green-600 h-[50px] w-[300px]" >Search the definition of another word!</button> */}
    </>
  );
}

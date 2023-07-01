import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {
    const [word, setWord] = useState('');
    const navigate = useNavigate();
    return(
        <>
          <form
            className="rounded flex space-between space-x-2 max-w-300"
            id="findWord"
            onSubmit={() => {
                navigate('/definition/'+word);
            }}>
          <input
          placeholder="type a word..."
          className="shrink min-w-0 px-2 rounded py-1"
          form="findWord"
            type="text" onChange={(e) => {
                setWord(e.target.value);
            }}
            />
            <button className="bg-purple-600 text-white font-bold py-1 px-2 hover:bg-purple-700 rounded w-[100px]" form="findWord" onClick={() => {
                navigate('/dictionary/' + word);
            }}> Search  </button>
        </form>  
            
        </>
    );
}
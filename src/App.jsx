import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Center, ChakraProvider } from "@chakra-ui/react";
import Game from "./components/Game";
import { Spinner } from "@chakra-ui/react";

function App() {
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/capital")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCountryData(result.data);
      });

    return () => {};
  }, []);

  return (
    <ChakraProvider>
      <Center>
        {countryData.length > 0 ? (
          <Game countryList={countryData} />
        ) : (
          <Spinner />
        )}
      </Center>
    </ChakraProvider>
  );
}

export default App;

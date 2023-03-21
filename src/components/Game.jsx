import React, { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Button,
  ButtonGroup,
  Heading,
  Highlight,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const Game = ({ countryList }) => {
  const toast = useToast();
  const [answer, setAnswer] = useState("");
  const [chosenCountry, setChosenCountry] = useState({});

  const chooseRandomCountry = (e) => {
    const randomIndex = Math.floor(
      Math.random() * (countryList.length - 1 - 0 + 1) + 0
    );

    setChosenCountry({
      name: countryList[randomIndex]?.name,
      index: randomIndex,
    });
  };
  const handleChange = (e) => {
    setAnswer(e.target.value);
  };
  const showAnswer = () => {
    toast({
      title: `${countryList[chosenCountry.index].capital}`,
      description: `is the capital of ${chosenCountry.name}`,
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };
  const checkAnswer = () => {
    if (
      countryList[chosenCountry.index]?.capital?.toLowerCase() ===
      answer.toLowerCase()
    ) {
      toast({
        title: "Correct answer.",
        description: "You guessed it right !",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setAnswer("");
      chooseRandomCountry();
    } else {
      toast({
        title: "Try again",
        description: "Wrong guess!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    chooseRandomCountry();
  }, []);

  return (
    <>
      <VStack
        bg={"whitesmoke"}
        style={{
          border: "10px solid black",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Heading as="h1" size="2xl" noOfLines={1}>
          Guess the capital of:
        </Heading>
        <Heading as="h3" size="lg" color={"violet"}>
          {chosenCountry.name}
        </Heading>
        <InputGroup size="md">
          <Input
            type="text"
            placeholder="Type your answer"
            value={answer}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setAnswer("")}>
              {"Clear"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <ButtonGroup gap="4">
          <Button
            colorScheme="teal"
            size="lg"
            isDisabled={answer.length === 0}
            onClick={checkAnswer}
          >
            Check answer
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            size="lg"
            onClick={chooseRandomCountry}
          >
            Reset country
          </Button>
          <Button colorScheme="blue" size="lg" onClick={showAnswer}>
            Educate me
          </Button>
        </ButtonGroup>
      </VStack>
    </>
  );
};

export default Game;

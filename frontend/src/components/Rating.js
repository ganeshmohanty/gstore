import { Flex, Icon, Text, Box } from "@chakra-ui/react";
import { IoStar, IoStarOutline, IoStarHalf } from "react-icons/io5";

const Rating = ({ value, text, color = "red.500" }) => {
  return (
    <Flex alignItems="flex-start" direction="column">
      <Box>
        <Icon
          color={color}
          as={value >= 1 ? IoStar : value >= 0.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 2 ? IoStar : value >= 1.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 3 ? IoStar : value >= 2.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 4 ? IoStar : value >= 3.5 ? IoStarHalf : IoStarOutline}
        />
        <Icon
          color={color}
          as={value >= 5 ? IoStar : value >= 4.5 ? IoStarHalf : IoStarOutline}
        />
      </Box>
      <Text>{text && text}</Text>
    </Flex>
  );
};

export default Rating;

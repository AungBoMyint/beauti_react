import Messenger from "@/components/app/Messenger";
import { ColorModeButton } from "@/components/ui/color-mode";
import { InputGroup } from "@/components/ui/input-group";
import { Box, Card, Flex, Input, Image, Text, Grid } from "@chakra-ui/react";
import { FaFacebookMessenger } from "react-icons/fa";

const Search = () => {
  const searchResults: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ];
  return (
    <>
      <Flex
        position={"fixed"}
        top={0}
        zIndex={2000}
        width={"full"}
        bg={{ base: "white", _dark: "gray.900" }}
        paddingX={4}
        paddingY={2}
        alignItems={"center"}
        gap={4}
      >
        <InputGroup flex="1">
          <Input
            placeholder="Search"
            variant="flushed"
            border={"black"}
            autoFocus={true}
          />
        </InputGroup>
        <Messenger />
        <ColorModeButton />
      </Flex>
      {searchResults.length < 1 ? (
        <div className="flex items-center justify-center h-dvh w-full ">
          လိုချင်တဲ့ Product အမည်ကို ရှာဖွေနိုင်ပါသည်
        </div>
      ) : (
        <Box marginTop={"80px"} paddingX={4}>
          <Grid
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gapX={4}
            gapY={2}
          >
            {searchResults.map((item) => {
              return (
                <Card.Root
                  key={item}
                  overflow="hidden"
                  size={"lg"}
                  variant={"elevated"}
                  rounded={"xl"}
                >
                  <Image
                    className="pointer-events-none h-full"
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="Green double couch with wooden legs"
                  />
                  <Card.Body paddingX={2} paddingY={2}>
                    <Card.Title padding={0} margin={0}>
                      Living room Sofa
                    </Card.Title>
                    <Text>73500 Kyats</Text>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Search;

import ItemCard from "@/components/app/ItemCard";
import Messenger from "@/components/app/Messenger";
import { ColorModeButton } from "@/components/ui/color-mode";
import { InputGroup } from "@/components/ui/input-group";
import { useSearchItems } from "@/hooks/useItem";
import { Box, Flex, Input, Grid } from "@chakra-ui/react";
import { useState } from "react";

const Search = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const { data, isLoading } = useSearchItems(searchValue);
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
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
        </InputGroup>
        <Messenger />
        <ColorModeButton />
      </Flex>
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full">
          loading.....
        </div>
      ) : (data ?? []).length < 1 ? (
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
            {data?.map((item) => {
              return <ItemCard key={item.id} item={item} />;
            })}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Search;

import { InputGroup } from "@/components/ui/input-group";
import AppUser from "@/entity/AppUser";
import useUsers from "@/hooks/useUsers";
import { Box, Flex, Text, Image, Input } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { CSSProperties, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { LuSearch } from "react-icons/lu";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import ManagePoint from "./ManagePoint";

interface RenderProps {
  index: number;
  style: CSSProperties;
}

const ManageUser = () => {
  const { isLoading, data } = useUsers();
  const [searchItems, setSearchItems] = useState<AppUser[] | undefined>();

  const renderItem = ({ index, style }: RenderProps) => {
    var user = searchItems ? searchItems[index] : data![index];
    return (
      <ManagePoint
        trigger={
          <Box key={user?.id} style={style} px={4}>
            <Flex
              width={"full"}
              gap={4}
              shadow={"lg"}
              height={110}
              rounded={"md"}
              p={2}
              alignItems={"center"}
            >
              <Image
                rounded={"full"}
                width={20}
                height={20}
                bg={"gray.300"}
                src={user?.image}
                alt={``}
              />
              <Flex direction={"column"}>
                <Text fontWeight={"bold"}>{user?.userName}</Text>
                <Text fontWeight={"medium"}>{user?.emailAddress}</Text>
                <Flex alignItems={"center"} gap={1}>
                  <Text fontWeight={"bold"} color={"#FF9D23"}>
                    {user?.points}
                  </Text>
                  <GiTwoCoins color={"#FF9D23"} />
                </Flex>
              </Flex>
            </Flex>
          </Box>
        }
        user={user}
      />
    );
  };
  if (isLoading) {
    return <Text>Loading.....</Text>;
  }
  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchInput = event.target.value?.toLowerCase();
      const searchResult = data?.filter(
        (item) =>
          item.userName?.toLowerCase()?.includes(searchInput) ||
          item.emailAddress?.toLowerCase()?.includes(searchInput)
      );
      setSearchItems(searchResult);
    },
    500
  );
  return (
    <>
      <Flex
        zIndex={"2000"}
        bg={"white"}
        width={"full"}
        position={"fixed"}
        justifyContent={"space-between"}
        alignItems={"center"}
        shadow={"lg"}
        px={4}
        py={4}
        fontWeight={"bold"}
        bgColor={{ base: "white", _dark: "gray.800" }}
      >
        <Text>Manage Users</Text>
      </Flex>
      <Box spaceY={4} justifySelf={"center"} width={"full"}>
        <Box height={"55px"}></Box>
        <Box mx={4}>
          <InputGroup
            flex="1"
            width={"full"}
            mb={4}
            startElement={<LuSearch size={20} />}
            //endElement={<Kbd>⌘K</Kbd>}
          >
            <Input
              onChange={(e) => handleSearch(e)}
              focusRing={"none"}
              css={{
                "--error-color": "none",
                "--focus-color": "none",
              }}
              borderColor={"gray.500"}
              border={"solid"}
              placeholder="Search by name or email"
            />
          </InputGroup>
        </Box>
        <Box height={"100vh"}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className="List"
                height={height}
                itemCount={searchItems?.length ?? data?.length ?? 0}
                itemSize={120}
                width={width}
              >
                {renderItem}
              </List>
            )}
          </AutoSizer>
        </Box>
      </Box>
    </>
  );
};

export default ManageUser;

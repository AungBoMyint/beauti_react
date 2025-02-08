import { Box, Card, Flex, Text, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDivisions } from "@/hooks/useDivision";
import Division from "@/entity/Division";
import { InputGroup } from "@/components/ui/input-group";
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/field";
import AppDialog from "@/components/app/AppDialog";
import AddTownship from "./AddTownship";
import { DialogActionTrigger, DialogFooter } from "@/components/ui/dialog";

interface FormValues {
  name: string;
}

const ManageAddress = () => {
  const navigate = useNavigate();
  const { isLoading, data, isError } = useDivisions();
  const [items, setItems] = useState<Division[]>([]);

  const handleDelete = (id: string) => {
    setItems((pre) => pre.filter((i) => i.id !== id));
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {},
  });

  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      console.log(data);
    } else {
      console.log(`🔥🔥🔥Not Valid`);
    }
  });
  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <Box>
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
        <Text>Manage Divisions</Text>
      </Flex>

      <Box height={"75px"}></Box>
      <form onSubmit={onSubmit}>
        <Box mx={4}>
          <InputGroup flex="1" width={"full"} mb={4}>
            <Flex width={"full"} alignItems={"start"} gap={2}>
              <Field
                //label="Photo Link 1"
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                <Input
                  focusRing={"none"}
                  css={{
                    "--error-color": "none",
                    "--focus-color": "none",
                  }}
                  borderColor={"gray.500"}
                  border={"solid"}
                  placeholder="Name"
                  px={3}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </Field>
              <Button
                px={2}
                color={"white"}
                bg={"black"}
                size={"sm"}
                fontSize={12}
                variant={"solid"}
                type="submit"
              >
                Add
              </Button>
            </Flex>
          </InputGroup>
        </Box>
      </form>
      <Box mx={4}>
        {items?.map((item) => {
          return (
            <Card.Root
              key={item.id}
              width={"full"}
              height={"h-fit"}
              maxHeight={100}
              overflow="hidden"
              size={"lg"}
              variant={"elevated"}
              rounded={"xl"}
              my={2}
              px={1}
            >
              <Card.Body textAlign={"left"}>
                <Card.Description color={"black"} fontWeight={"medium"}>
                  <Flex alignItems={"start"} justifyContent={"space-between"}>
                    <Text lineClamp="2" fontWeight={"medium"}>
                      {item.name}
                    </Text>
                    <Flex gap={2}>
                      <AddTownship item={item} />
                      <AppDialog
                        title={item.name}
                        trigger={
                          <Button
                            px={2}
                            color={"white"}
                            bg={"blue.500"}
                            size={"sm"}
                            fontSize={12}
                            variant={"solid"}
                          >
                            View
                          </Button>
                        }
                      >
                        <Flex direction={"column"} gap={2}>
                          {item?.townships?.map((township) => (
                            <Flex key={township.name}>
                              <Text width={"60vw"} lineClamp={2}>
                                {township?.name}
                              </Text>
                              <Text>{township?.fee}Ks</Text>
                            </Flex>
                          ))}
                        </Flex>
                      </AppDialog>
                      <Button
                        px={2}
                        color={"white"}
                        bg={"red.500"}
                        size={"sm"}
                        fontSize={12}
                        variant={"solid"}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Flex>
                </Card.Description>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Box>
    </Box>
  );
};

export default ManageAddress;

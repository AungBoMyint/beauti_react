import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import AccordionItemEntity from "@/entity/AccordionItem";

interface Props {
  items: AccordionItemEntity[];
}
const SiteAccordion = ({ items }: Props) => {
  return (
    <AccordionRoot variant={"outline"} multiple defaultValue={[""]}>
      {items.map((item, index) => (
        <AccordionItem
          borderBottom={{ base: "solid 0.2px gray" }}
          paddingY={2}
          key={index}
          value={item.value}
        >
          <AccordionItemTrigger fontWeight={"medium"}>
            {item.title}
          </AccordionItemTrigger>
          <AccordionItemContent fontWeight={"light"}>
            {item.text}
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};

export default SiteAccordion;

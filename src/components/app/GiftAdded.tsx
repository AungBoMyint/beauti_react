import { ReactNode, useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";

interface GiftProps {
  trigger: ReactNode;
  content: ReactNode;
}

const GiftAdded = ({ trigger, content }: GiftProps) => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      role="alertdialog"
      /*   open={open}
      onOpenChange={(e) => setOpen(e.open)} */
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent height={"fit"}>
        <DialogBody>{content}</DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default GiftAdded;

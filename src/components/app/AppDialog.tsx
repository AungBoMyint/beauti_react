import { DialogRoot } from "@chakra-ui/react/dialog";
import React, { ReactNode } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  title: string;
  trigger: ReactNode;
  children: ReactNode;
  dialogFooter?: ReactNode | undefined;
}
const AppDialog = ({ title, trigger, children, dialogFooter }: Props) => {
  return (
    <DialogRoot lazyMount>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent mx={4}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        {dialogFooter}
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default AppDialog;

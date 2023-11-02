import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";

export function ConfirmationModal({
  title,
  children,
  confirmAction,
  open,
  setOpen,
}: {
  title: string;
  children: React.ReactNode;
  confirmAction: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const cancelRef = React.useRef(null);

  const onClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    setOpen(false);
  };

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmAction} ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>

    // <Modal isOpen={open} onClose={() => setOpen(false)}>
    //   <ModalOverlay />
    //   <ModalContent>
    //     <ModalCloseButton />
    //     <ModalBody>{children}</ModalBody>
    //     <ModalFooter>
    //       <Button onClick={onConfirm}>{"Confirm"}</Button>
    //       <Button onClick={() => setOpen(false)}>{"Return"}</Button>
    //     </ModalFooter>
    //   </ModalContent>
    // </Modal>
  );
}

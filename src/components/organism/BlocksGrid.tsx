import React, { useState } from "react";
import { Block } from "../../types/entities";
import { Button, IconButton } from "@chakra-ui/react";
import moment, { invalid } from "moment";
import { BiChevronLeft, BiChevronRight, BiPlus } from "react-icons/bi";
import { Jar } from "../molecule/Jar";
import { IoMdRemove } from "react-icons/io";
import { useApi } from "../../hooks/useApi";
import { useMutation, useQueryClient } from "react-query";
import { ConfirmationModal } from "../../modals/ConfirmationModal";

export function BlocksGrid({
  blocks,
  page,
  setPage,
  totalPages,
}: {
  blocks: Block[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  const [selectedBlocks, setSelectedBlocks] = useState<Block[]>([]);
  const { deleteBlocks } = useApi();
  const queryclient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: onDeleteBlocks } = useMutation({
    mutationKey: "deleteBlocks",
    mutationFn: () => deleteBlocks(selectedBlocks.map((b) => b.id)),
    onSuccess: () => {
      queryclient.invalidateQueries(["getFinishedBlocks"]);
      setSelectedBlocks([]);
      setDeleteModalOpen(false);
    },
  });

  const onClickBlock = (block: Block) => {
    if (selectedBlocks.includes(block)) {
      setSelectedBlocks(selectedBlocks.filter((b) => b.id !== block.id));
    } else {
      setSelectedBlocks([...selectedBlocks, block]);
    }
  };

  const onPrepareDelete = () => {
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Button
        leftIcon={<IoMdRemove />}
        isDisabled={selectedBlocks.length < 1}
        onClick={() => onPrepareDelete()}
      >
        Delete
      </Button>
      <div className="grid grid-cols-[repeat(auto-fill,88px)] gap-4 justify-between">
        {blocks.map((block) => (
          <Jar
            key={block.id}
            blockId={block.id}
            onClick={() => onClickBlock(block)}
            isSelected={selectedBlocks.includes(block)}
            size={80}
            time={block.targetMinutes}
            passedTime={moment(block.finishDate).diff(
              block.creationDate,
              "minutes"
            )}
            distractionMinutes={block.distractionMinutes}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-4 w-full justify-evenly">
        <IconButton
          aria-label="Previous page"
          icon={<BiChevronLeft />}
          onClick={() => setPage(page - 1)}
          isDisabled={page === 0}
        />
        <IconButton
          aria-label="Next page"
          icon={<BiChevronRight />}
          onClick={() => setPage(page + 1)}
          isDisabled={page + 1 >= totalPages}
        />
        <ConfirmationModal
          title="Delete blocks"
          open={deleteModalOpen}
          setOpen={() => setDeleteModalOpen(false)}
          confirmAction={onDeleteBlocks}
        >
          {"Are you sure you want to delete these blocks?"}
        </ConfirmationModal>
      </div>
    </>
  );
}

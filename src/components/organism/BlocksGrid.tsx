import React, { useEffect, useState } from "react";
import { Block } from "../../types/entities";
import { Button, IconButton, Spinner, useToast } from "@chakra-ui/react";
import moment, { invalid } from "moment";
import { BiChevronLeft, BiChevronRight, BiPlus } from "react-icons/bi";
import { Jar } from "../molecule/Jar";
import { IoMdRemove } from "react-icons/io";
import { useApi } from "../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import { useApiError } from "../../hooks/useApiError";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "../atom/DatePicker";
import { MdDelete } from "react-icons/md";
import { Typography } from "../atom/Typography";

export function BlocksGrid() {
  const today = moment().startOf("day").toDate();
  const [blocksDate, setBlocksDate] = useState(today);
  const [selectedBlocks, setSelectedBlocks] = useState<Block[]>([]);
  const { deleteBlocks, searchBlocks } = useApi();
  const queryclient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const toast = useToast();
  const [page, setPage] = useState(0);
  const navigation = useNavigate();
  const { setError } = useApiError(navigation);

  const { data: finishedBlocks, isLoading: isLoadingFinishedBlocks } = useQuery(
    {
      queryKey: ["getFinishedBlocks", page, blocksDate],
      queryFn: () =>
        searchBlocks({
          page,
          pageSize: 9,
          isActive: false,
          creationDate: blocksDate,
        }),

      onSuccess: (data) => {
        if (data.content.length < 1 && page > 0) {
          setPage(page - 1);
        }
      },
      onError: (err) => {
        toast({
          title: "Error obtaining your blocks",
          status: "error",
          duration: 5000,
        });
        setError(err as Error);
      },
    }
  );

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
      <div className="flex gap-4 mb-4 justify-between">
        <DatePicker date={blocksDate} setDate={setBlocksDate} />
        <Button
          leftIcon={<MdDelete />}
          isDisabled={selectedBlocks.length < 1}
          onClick={() => onPrepareDelete()}
        >
          Delete
        </Button>
      </div>

      {isLoadingFinishedBlocks ? (
        <div className="h-20 flex justify-center items-center w-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,88px)] gap-4 justify-between">
          {finishedBlocks?.content && finishedBlocks.content.length < 1 && (
            <div className="h-20 flex justify-center items-center col-span-4">
              <Typography>{'No elements found'}</Typography>
            </div>
          )}
          {finishedBlocks?.content.map((block) => (
            <Jar
              key={block.id}
              blockId={block.id}
              onClick={() => onClickBlock(block)}
              isSelected={selectedBlocks.includes(block)}
              size={80}
              time={block.targetMinutes}
              passedTime={moment(block.finishDate).diff(
                block.creationDate,
                "seconds"
              )}
              distractionMinutes={block.distractionMinutes}
              tag={block.tag}
            />
          ))}
        </div>
      )}
      <div className="flex gap-4 mt-4 w-full justify-evenly">
        <IconButton
          className="!text-2xl"
          aria-label="Previous page"
          icon={<BiChevronLeft />}
          onClick={() => setPage(page - 1)}
          isDisabled={page === 0}
        />
        <IconButton
          className="!text-2xl"
          aria-label="Next page"
          icon={<BiChevronRight />}
          onClick={() => setPage(page + 1)}
          isDisabled={page + 1 >= finishedBlocks?.totalPages!}
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

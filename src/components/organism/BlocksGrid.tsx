import React from "react";
import { Block } from "../../types/entities";
import { IconButton } from "@chakra-ui/react";
import moment from "moment";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Jar } from "../atom/Jar";

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
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4">
        {blocks.map((block) => (
          <Jar
            key={block.id}
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
      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/organism/Layout";
import { Select, useToast } from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import moment, { months } from "moment";
import { useQuery } from "react-query";
import { Section } from "../components/organism/Section";
import { BlocksGrid } from "../components/organism/BlocksGrid";
import { BlockControls } from "../components/organism/BlockControls";
import { useApiError } from "../hooks/useApiError";
import { DatePicker } from "../components/atom/DatePicker";

export function HomeScreen() {
  const { csrfToken } = useAuth();
  const { searchBlocks } = useApi();
  const today = moment().startOf("day").toDate();
  const toast = useToast();
  const [page, setPage] = useState(0);
  const navigation = useNavigate();
  const { setError } = useApiError(navigation);
  const [blocksDate, setBlocksDate] = useState(today);

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

  return (
    <Layout>
      <Section title="Start block">
        <BlockControls />
      </Section>
      <Section title="Finished blocks">
        <DatePicker date={blocksDate} setDate={setBlocksDate} />
        <BlocksGrid
          blocks={finishedBlocks?.content || []}
          page={page}
          setPage={setPage}
          totalPages={finishedBlocks?.totalPages || 0}
        />
      </Section>
    </Layout>
  );
}

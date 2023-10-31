import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/organism/Layout";
import { useToast } from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import moment from "moment";
import { Block } from "../types/entities";
import { useQuery } from "react-query";
import { Section } from "../components/organism/Section";
import { BlocksGrid } from "../components/organism/BlocksGrid";
import { BlockControls } from "../components/organism/BlockControls";
import { useApiError } from "../hooks/useApiError";

export function HomeScreen() {
  const { csrfToken } = useAuth();
  const { searchBlocks } = useApi();
  const today = moment().startOf("day").toDate();
  const [finishedBlocks, setFinishedBlocks] = useState<Block[]>([]);
  const toast = useToast();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigation = useNavigate();
  const { setError } = useApiError(navigation);
  const { isLoading: isLoadingFinishedBlocks } = useQuery({
    queryKey: ["getFinishedBlocks", page],
    queryFn: () =>
      searchBlocks({
        page,
        pageSize: 9,
        isActive: false,
        startDate: today,
      }),
    onSuccess: (data) => {
      setFinishedBlocks(data.content);
      setTotalPages(data.totalPages);
    },
    onError: (err) => {
      toast({
        title: "Error obtaining your blocks",
        status: "error",
        duration: 5000,
      });
      setError(err as Error);
    },
  });

  return (
    <Layout>
      <Section title="Start block">
        <BlockControls />
      </Section>
      <Section title="Finished blocks">
        <BlocksGrid
          blocks={finishedBlocks}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Section>
    </Layout>
  );
}

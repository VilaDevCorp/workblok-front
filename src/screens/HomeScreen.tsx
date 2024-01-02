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
  return (
    <Layout>
      <Section title="Start block">
        <BlockControls />
      </Section>
      <Section title="Finished blocks">
        <BlocksGrid />
      </Section>
    </Layout>
  );
}

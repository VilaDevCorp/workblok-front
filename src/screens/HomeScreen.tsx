import { Layout } from "../components/organism/Layout";
import { Section } from "../components/organism/Section";
import { BlocksGrid } from "../components/organism/BlocksGrid";
import { BlockControls } from "../components/organism/BlockControls";

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

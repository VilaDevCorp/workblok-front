import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/organism/Layout";
import { Section } from "../components/organism/Section";
import { UserConfig } from "../types/entities";
import { useAuth } from "../hooks/useAuth";
import { Button, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { useMutation, useQueryClient } from "react-query";
import { FormField } from "../components/atom/FormField";
import { TimeSlider } from "../components/atom/TimeSlider";
import { conf } from "../conf";

export function ConfigScreen() {
  const { user } = useAuth();
  const { updateConf } = useApi();
  const [config, setConfig] = useState<UserConfig>(
    user?.config || conf.defaultUserConfig
  );
  const queryClient = useQueryClient();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const firstRender = useRef(true);

  const { isLoading: isLoadingUpdateConfig, mutate: onUpdateConfig } =
    useMutation({
      mutationFn: () => updateConf({ conf: config }),
      onSuccess: () => {
        queryClient.invalidateQueries("getUserInfo");
      },
    });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabledButton(false);
  }, [config]);

  return (
    <Layout>
      <Section title="Configuration">
        <form className="flex flex-col gap-4" onSubmit={() => onUpdateConfig()}>
          <FormField
            label="Daily target"
            input={
              <TimeSlider
                value={config.dailyTarget!}
                setValue={(value) =>
                  setConfig({ ...config, dailyTarget: value })
                }
              ></TimeSlider>
            }
          />
          <FormField
            label="Allow exceeded time"
            input={
              <Switch
                isChecked={config.exceededTime!}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    exceededTime: value.currentTarget.checked,
                  })
                }
              />
            }
          />
          <FormField
            label="Time exceeded limit"
            input={
              <TimeSlider
                value={config.timeLimit!}
                setValue={(value) => setConfig({ ...config, timeLimit: value })}
              ></TimeSlider>
            }
          />
          <FormField
            label="Dark mode"
            input={
              <Switch
                isChecked={config.darkMode!}
                onChange={(value) =>
                  setConfig({
                    ...config,
                    darkMode: value.currentTarget.checked,
                  })
                }
              />
            }
          />
          <Button
            isDisabled={disabledButton}
            type="submit"
            isLoading={isLoadingUpdateConfig}
          >
            Save
          </Button>
        </form>
      </Section>
    </Layout>
  );
}

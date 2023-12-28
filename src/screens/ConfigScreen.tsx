import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/organism/Layout";
import { Section } from "../components/organism/Section";
import { UserConfig } from "../types/entities";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { useMutation, useQueryClient } from "react-query";
import { FormField } from "../components/atom/FormField";
import { TimeSlider } from "../components/atom/TimeSlider";
import { conf } from "../conf";
import { Typography } from "../components/atom/Typography";

export function ConfigScreen() {
  const { user } = useAuth();
  const { updateConf } = useApi();
  const [config, setConfig] = useState<UserConfig>(
    user?.config || conf.defaultUserConfig
  );
  const [newTag, setNewTag] = useState<string>("");
  const queryClient = useQueryClient();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const firstRender = useRef(true);
  const toast = useToast();

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

  const onAddNewTag = () => {
    if (newTag === "") return;
    if (config.tags?.includes(newTag)) {
      toast({
        title: "The tag already exists",
        status: "error",
        duration: 5000,
      });
      return;
    }
    const newTags = config.tags ? [...config.tags, newTag] : [newTag];
    setConfig({
      ...config,
      tags: newTags,
    });
    setNewTag("");
  };

  const onDeleteTag = (tag: string) => {
    const newTags = config.tags?.filter((t) => t !== tag);
    setConfig({
      ...config,
      tags: newTags,
    });
  };

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
            label="Tags"
            input={
              <div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onAddNewTag();
                      }
                    }}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <IconButton
                    className="bg-red"
                    aria-label="Creat new tag"
                    icon={<FaPlus />}
                    onClick={() => onAddNewTag()}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {config.tags?.map((tag) => (
                    <div
                      key={`tag_${tag}`}
                      className="px-2 py-1 mr-2 flex gap-2 items-center"
                    >
                      <IconButton
                        aria-label="Delete tag"
                        icon={<FaMinus />}
                        onClick={() => onDeleteTag(tag)}
                      />
                      <Typography mode="body">{tag}</Typography>
                    </div>
                  ))}
                </div>
              </div>
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

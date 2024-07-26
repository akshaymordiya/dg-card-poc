"use client";
import React, { useRef, useState } from "react";
import Template from "../template/page";
import styles from "./style.module.scss";
import elementData from "../../DataJSON/element.json";
import Preview from "@/app/component/Preview";
import Grid from "@/app/component/Grid";
import { Input, MenuItem, Select, Switch } from "@mui/material";
import settingData from "../../DataJSON/settings.json";

const EditorPage = () => {
  const initialDataValue = useRef({ ...elementData });
  const [currentElemenetsData, setCurrentElementsData] = useState(elementData);
  const initialSetting = useRef({ ...settingData });
  const [currentSetting, setCurrentSetting] = useState(settingData);

  const updateSettings = (cmpId, eleId, value) => {
    setCurrentElementsData((prev) => ({
      ...prev,
      [cmpId]: {
        ...prev[cmpId],
        [eleId]: {
          ...prev[cmpId][eleId],
          value,
        },
      },
    }));
  };

  const updateElementData = (setting, value) => {
    setCurrentElementsData((prev) => ({
      ...prev,
      [setting.componentId]: {
        ...prev[setting.componentId],
        [setting.bindingId]: {
          ...prev[setting.componentId][setting.bindingId],
          ...value,
        },
      },
    }));
  };

  const updateCurrentSettings = (
    setting,
    sectionKey,
    updatedSettingData = {},
    updatedElementData = {}
  ) => {
    setCurrentSetting((prevState) => ({
      ...prevState,
      elements: {
        ...prevState.elements,
        [sectionKey]: {
          ...prevState.elements[sectionKey],
          settings: (prevState.elements[sectionKey].settings || []).map(
            (settingItr) => {
              if (settingItr.id === setting.id) {
                const newSettingObj = {
                  ...settingItr,
                  props: {
                    ...settingItr.props,
                    ...updatedSettingData,
                  },
                };
                updateElementData(newSettingObj, updatedElementData);
                return newSettingObj;
              }

              return settingItr;
            }
          ),
        },
      },
    }));
  };

  const getSettingComponent = (
    setting,
    sectionKey,
    key,
    loopValueMapper = null
  ) => {
    const defaultValueOfCurrentSetting =
      initialDataValue.current?.[setting.componentId]?.[setting.bindingId]
        ?.value;
    switch (setting?.type) {
      case "input-file": {
        return (
          <Grid.Item sm={12} md={6} lg={6} xl={6}>
            <label htmlFor={key}>{setting.props.label} :</label> <br />
            <Input
              key={key}
              {...setting.props}
              value={setting.props.value}
              onChange={({ target: { files } }) => {
                const file = files?.[0];
                let mappingValue = null;
                if (loopValueMapper) {
                  mappingValue = loopValueMapper(
                    { data: file },
                    { value: URL.createObjectURL(file) }
                  );
                }
                if (file) {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    mappingValue
                      ? { value: mappingValue.settingsData }
                      : { data: file },
                    {
                      value: mappingValue
                        ? mappingValue.elementsData
                        : URL.createObjectURL(file),
                    }
                  );
                } else {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    { data: file },
                    {
                      value: mappingValue
                        ? mappingValue.elementsData
                        : URL.createObjectURL(file),
                    }
                  );
                }
              }}
            />
          </Grid.Item>
        );
      }

      case "loop": {
        return setting.props.value.map((loopSetting, index) => {
          return getSettingComponent(
            {
              ...loopSetting,
              id: setting.id,
              bindingId: setting.bindingId,
              componentId: setting.componentId,
            },
            sectionKey,
            `${index}-time_setting-${loopSetting.id}`,

            (updatedSettingValue, updatedElementvalue) => {
              if (!updatedSettingValue || !updatedElementvalue) {
                return null;
              }

              return {
                settingsData: setting.props.value.map((ls) => {
                  if (ls.id === loopSetting.id) {
                    return {
                      ...ls,
                      props: {
                        ...ls.props,
                        ...updatedSettingValue,
                      },
                    };
                  }

                  return ls;
                }),
                elementsData: currentElemenetsData[setting.componentId][
                  setting.bindingId
                ].value.map((element) => {
                  if (element.id === loopSetting.elementBindingId) {
                    return {
                      ...element,
                      ...updatedElementvalue,
                    };
                  }

                  return element;
                }),
              };
            }
          );
        });
      }

      case "time": {
        return setting.props.value.map((timeSetting, index) => {
          //           const timeObject = new Date();
          // timeObject.setHours(hours);
          // timeObject.setMinutes(minutes);
          return getSettingComponent(
            {
              ...timeSetting,
              id: setting.id,
              bindingId: setting.bindingId,
              componentId: setting.componentId,
            },
            sectionKey,
            `${index}-loop_setting-${timeSetting.id}`,
            (updatedSettingTimeValue, updatedElementTimeValue) => {
              return {
                settingsData: setting.props.value.map((ls) => {
                  if (ls.id === timeSetting.id) {
                    return {
                      ...ls,
                      props: {
                        ...ls.props,
                        ...updatedSettingTimeValue,
                      },
                    };
                  }
                }),

                elementsData: currentElemenetsData[setting.componentId][
                  setting.bindingId
                ].value.map((element) => {
                  if (element.id === timeSetting.elementBindingId) {
                    return {
                      ...element,
                      ...updatedElementTimeValue,
                    };
                  }
                }),
              };
            }
          );
        });
      }

      case "input": {
        return (
          <Grid.Item
            sm={12}
            md={6}
            lg={6}
            xl={6}
            itemClass={styles.editor_col_1_content_wrapper}
          >
            <label htmlFor={key}>{setting.props.label} :</label> <br />
            <Input
              key={key}
              {...setting.props}
              value={setting.props.value}
              onChange={({ target: { value } }) => {
                let timeSetValue = null;
                if (loopValueMapper) {
                  // loopValueMapper(value);
                  // return;
                  timeSetValue = loopValueMapper({ value }, { value });
                }

                if (!value) {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    timeSetValue ? timeSetValue.settingsData : { value },
                    {
                      value: timeSetValue
                        ? timeSetValue.elementsData
                        : defaultValueOfCurrentSetting,
                    }
                  );
                } else {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    { value },
                    { value }
                  );
                }
              }}
            />
          </Grid.Item>
        );
      }

      case "toggle": {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor={key}>{setting.props.label}</label>
            <Switch
              key={key}
              {...setting.props}
              onChange={({ target: { checked } }) => {
                if (loopValueMapper) {
                  loopValueMapper(checked);
                  return;
                }

                updateCurrentSettings(
                  setting,
                  sectionKey,
                  { checked },
                  { value: checked }
                );
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        );
      }

      default: {
        return <React.Fragment></React.Fragment>;
      }
    }
  };

  return (
    <Grid classNames={styles.editor}>
      <Grid.Item
        sm={12}
        xs={12}
        md={12}
        lg={6}
        xl={6}
        itemClass={styles.editor_col_1}
      >
        {Object.entries(currentSetting.elements).map(
          ([sectionKey, sectionSettingsValue], index) => {
            return (
              <div key={index}>
                <h2 className={styles.editor_col_1_title}>
                  {sectionSettingsValue.title}
                </h2>
                <Grid classNames={styles.editor_col_1_content}>
                  {sectionSettingsValue.settings.map((setting, index) =>
                    getSettingComponent(
                      setting,
                      sectionKey,
                      `${index}-setting-${setting.id}`
                    )
                  )}
                </Grid>
              </div>
            );
          }
        )}
      </Grid.Item>
      <Grid.Item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        itemClass={styles.editor_col_2}
      >
        <Preview classNames={styles.preview} data={currentElemenetsData}>
          <Template />
        </Preview>
      </Grid.Item>
    </Grid>
  );
};

export default EditorPage;

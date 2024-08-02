"use client";
import React, { useRef, useState } from "react";
import Template from "../template/page";
import styles from "./style.module.scss";
import elementData from "../../DataJSON/element.json";
import Preview from "@/app/component/Preview";
import Grid from "@/app/component/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Input, Switch } from "@mui/material";
import dayjs from "dayjs";
import settingData from "../../DataJSON/settings.json";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { v4 as uuidv4 } from "uuid";
import { Title } from "@mui/icons-material";

const EditorPage = () => {
  const initialDataValue = useRef({ ...elementData });
  const [currentElemenetsData, setCurrentElementsData] = useState(elementData);
  const initialSetting = useRef({ ...settingData });
  const [currentSetting, setCurrentSetting] = useState(settingData);
  const [currentIndex, setCurrentIndex] = useState(3);

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

  const handleHideShow = (index) => {
    if (index === currentIndex) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(index);
    }
  };

  const updateCurrentSettings = (
    setting,
    sectionKey,
    updatedSettingData = {},
    updatedElementData = {},
    mapSettingId = null
  ) => {
    console.log("setting", setting);
    console.log("mapSettingId", mapSettingId);
    console.log("updatedSettingData", updatedSettingData);
    setCurrentSetting((prevState) => ({
      ...prevState,
      elements: {
        ...prevState.elements,
        [sectionKey]: {
          ...prevState.elements[sectionKey],
          settings: (prevState.elements[sectionKey].settings || []).map(
            (settingItr) => {
              if (settingItr.id === (mapSettingId ?? setting.id)) {
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

  const UpdatedAddInput = (
    setting,
    sectionKey,
    updatedSettingsValue = [],
    updatedElementsValue = []
  ) => {
    const newSettingObj = {
      ...setting,
      props: {
        ...setting.props,
        value: updatedSettingsValue,
      },
    };
    const parentSetting = currentSetting.elements[sectionKey].settings.find(
      (st) => st.id === setting.parentId
    );
    updateCurrentSettings(
      parentSetting,
      sectionKey,
      {
        value: parentSetting.props.value.map((settingValue) => {
          if (settingValue.id === newSettingObj.id) {
            return newSettingObj;
          }
          return settingValue;
        }),
      },
      {
        value: currentElemenetsData[parentSetting.componentId][
          parentSetting.bindingId
        ].value.map((eleValue) => {
          if (eleValue.id === newSettingObj.elementBindingId) {
            return {
              ...eleValue,
              value: updatedElementsValue,
            };
          }

          return eleValue;
        }),
      }
    );
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
                    { data: file ?? null },
                    {
                      value: file
                        ? URL.createObjectURL(file)
                        : defaultValueOfCurrentSetting.find(
                            (v) => v.id === setting.elementBindingId
                          ).value,
                    }
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
                    },
                    setting?.parentId
                  );
                } else {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    mappingValue
                      ? {
                          value: mappingValue.settingsData,
                        }
                      : { data: null },
                    {
                      value: mappingValue
                        ? mappingValue.elementsData
                        : URL.createObjectURL(file),
                    },
                    setting?.parentId
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
              originId: loopSetting.id,
              bindingId: setting.bindingId,
              componentId: setting.componentId,
            },
            sectionKey,
            `${index}-loop_setting-${loopSetting.id}`,
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

      case "catelogItem": {
        return (
          <Grid.Item
            sm={12}
            md={12}
            lg={12}
            xl={12}
            itemClass={styles.catelog_content}
          >
            <label htmlFor={key}>{setting.props.label}</label>
            {setting?.props?.value.map((timeValue, index) => {
              return (
                <div key={index} className={styles.catelog_content_wrapper}>
                  <Input
                    type="file"
                    className={styles.catelog_content_wrapper}
                    key={key}
                    {...setting.props}
                    value={setting.props.value.image}
                    onChange={({ target: { files } }) => {
                      const file = files?.[0];
                      console.log("file ", file);
                      let mappingValue = null;
                      if (loopValueMapper) {
                        console.log("mappingValue", mappingValue);
                        mappingValue = loopValueMapper(
                          {
                            value: setting.props.value.map((items) => {
                              if (v.elementId === timeValue.elementId) {
                                return {
                                  ...items,
                                image: file ?? null,
                               }
                              };
                              return items
                            }),
                          },
                          {
                            value: file
                              ? URL.createObjectURL(file)
                              : defaultValueOfCurrentSetting.find(
                                  (v) => v.id === setting.elementBindingId
                                ).value,
                          }
                        );
                      }
                      if (file) {
                        console.log(
                          "updateCurrentSettings",
                          updateCurrentSettings
                        );
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
                          },
                          setting?.parentId
                        );
                      } else {
                        updateCurrentSettings(
                          setting,
                          sectionKey,
                          mappingValue
                            ? {
                                value: mappingValue.settingsData,
                              }
                            : { data: null },
                          {
                            value: mappingValue
                              ? mappingValue.elementsData
                              : URL.createObjectURL(file),
                          },
                          setting?.parentId
                        );
                      }
                    }}
                  />
                  <Input
                    key={key}
                    {...setting.props}
                    value={setting.props.value.title}
                    onChange={({ target: { value } }) => {
                      let textValue = null;
                      if (loopValueMapper) {
                        // const updatedElement = currentElemenetsData[
                        //   setting.componentId
                        // ][setting.bindingId].value.find(
                        //   (v) => v.id === setting.elementBindingId
                        // );
                        textValue = loopValueMapper(
                          {
                            value: setting.props.value.map((v) => {
                              if (v.elementId === timeValue.elementId) {
                                return { ...v, title: value ?? null };
                              }

                              return v;
                            }),
                          },
                          {
                            value: currentElemenetsData[setting.componentId][
                              setting.bindingId
                            ]?.value?.map((contentValue) => {
                              if (contentValue.id === timeValue.elementId) {
                                return {
                                  ...contentValue,
                                  title: value ? value : contentValue?.title,
                                };
                              }

                              return contentValue;
                            }),
                          }
                        );
                      }

                      if (value) {
                        updateCurrentSettings(
                          setting,
                          sectionKey,
                          textValue
                            ? { value: textValue.settingsData }
                            : { value },
                          {
                            value: textValue ? textValue.elementsData : value,
                          },
                          setting.parentId
                        );
                      } else {
                        updateCurrentSettings(
                          setting,
                          sectionKey,
                          textValue
                            ? { value: textValue.settingsData }
                            : { value: null },
                          {
                            value: textValue
                              ? textValue.elementsData
                              : defaultValueOfCurrentSetting,
                          }
                        );
                      }
                    }}
                  />
                </div>
              );
            })}
          </Grid.Item>
        );
      }

      case "timeValue": {
        return (
          <Grid.Item
            sm={12}
            md={6}
            lg={6}
            xl={6}
            itemClass={styles.time_content}
          >
            <label htmlFor={key}>{setting.props.label}:</label> <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <div className={styles.DemoContainer}>
                  {setting?.props?.value?.map((timeValue, index) => (
                    <div className={styles.timepicker_content} key={index}>
                      <span>
                        <TimePicker
                          key={key}
                          {...timeValue.props}
                          label="From"
                          value={timeValue.from}
                          onChange={(value) => {
                            let pickedUpValue = null;
                            if (loopValueMapper) {
                              const updatedElement = currentElemenetsData[
                                setting.componentId
                              ][setting.bindingId].value.find(
                                (v) => v.id === setting.elementBindingId
                              );

                              pickedUpValue = loopValueMapper(
                                {
                                  value: setting.props.value.map((v) => {
                                    if (v.elementId === timeValue.elementId) {
                                      return { ...v, from: value ?? null };
                                    }

                                    return v;
                                  }),
                                },
                                {
                                  value: updatedElement.value.map(
                                    (contentValue) => {
                                      if (
                                        contentValue.id === timeValue.elementId
                                      ) {
                                        return {
                                          ...contentValue,
                                          from: value
                                            ? dayjs(value).format("HH:mm a")
                                            : contentValue?.from,
                                        };
                                      }

                                      return contentValue;
                                    }
                                  ),
                                }
                              );
                            }

                            if (value) {
                              updateCurrentSettings(
                                setting,
                                sectionKey,
                                pickedUpValue
                                  ? { value: pickedUpValue.settingsData }
                                  : { value },
                                {
                                  value: pickedUpValue
                                    ? pickedUpValue.elementsData
                                    : value,
                                },
                                setting.parentId
                              );
                            } else {
                              updateCurrentSettings(
                                setting,
                                sectionKey,
                                pickedUpValue
                                  ? { value: pickedUpValue.settingsData }
                                  : { value: null },
                                {
                                  value: pickedUpValue
                                    ? pickedUpValue.elementsData
                                    : defaultValueOfCurrentSetting,
                                }
                              );
                            }
                          }}
                        />
                      </span>
                      <span>
                        <TimePicker
                          key={key}
                          {...timeValue.props}
                          label="To"
                          value={timeValue.to}
                          onChange={(value) => {
                            let pickedUpValue = null;
                            if (loopValueMapper) {
                              const updatedElement = currentElemenetsData[
                                setting.componentId
                              ][setting.bindingId].value.find(
                                (v) => v.id === setting.elementBindingId
                              );

                              pickedUpValue = loopValueMapper(
                                {
                                  value: setting.props.value.map((v) => {
                                    if (v.elementId === timeValue.elementId) {
                                      return { ...v, to: value ?? null };
                                    }

                                    return v;
                                  }),
                                },
                                {
                                  value: updatedElement.value.map(
                                    (contentValue) => {
                                      if (
                                        contentValue.id === timeValue.elementId
                                      ) {
                                        return {
                                          ...contentValue,
                                          to: value
                                            ? dayjs(value).format("HH:mm a")
                                            : contentValue?.to,
                                        };
                                      }

                                      return contentValue;
                                    }
                                  ),
                                }
                              );
                            }

                            if (value) {
                              updateCurrentSettings(
                                setting,
                                sectionKey,
                                pickedUpValue
                                  ? { value: pickedUpValue.settingsData }
                                  : { value },
                                {
                                  value: pickedUpValue
                                    ? pickedUpValue.elementsData
                                    : value,
                                },
                                setting.parentId
                              );
                            } else {
                              updateCurrentSettings(
                                setting,
                                sectionKey,
                                pickedUpValue
                                  ? { value: pickedUpValue.settingsData }
                                  : { value: null },
                                {
                                  value: pickedUpValue
                                    ? pickedUpValue.elementsData
                                    : defaultValueOfCurrentSetting,
                                }
                              );
                            }
                          }}
                        />
                      </span>
                      <span
                        className={styles.closebtn}
                        type="reset"
                        onClick={() => {
                          UpdatedAddInput(
                            setting,
                            sectionKey,
                            (setting.props.value ?? []).filter((sv) => {
                              return sv.elementId !== timeValue.elementId;
                            }),
                            currentElemenetsData[setting.componentId][
                              setting.bindingId
                            ].value
                              .find((cv) => cv.id === setting.elementBindingId)
                              .value.filter(
                                (cvTimeValue) =>
                                  cvTimeValue.id !== timeValue.elementId
                              )
                          );
                        }}
                      >
                        x
                      </span>
                    </div>
                  ))}
                </div>
              </DemoContainer>
            </LocalizationProvider>
            <button
              className={styles.Addbtn}
              onClick={() => {
                const publicId = uuidv4();
                UpdatedAddInput(
                  setting,
                  sectionKey,
                  [
                    ...setting.props.value,
                    {
                      from: null,
                      to: null,
                      elementId: publicId,
                    },
                  ],
                  [
                    ...currentElemenetsData[setting.componentId][
                      setting.bindingId
                    ].value.find((v) => v.id === setting.elementBindingId)
                      .value,
                    {
                      from: "",
                      to: "",
                      id: publicId,
                    },
                  ]
                );
              }}
            >
              Add
            </button>
          </Grid.Item>
        );
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
                // let timeSetValue = null;
                if (loopValueMapper) {
                  loopValueMapper(value);
                  return;
                  // timeSetValue = loopValueMapper({ value: value }, { value });
                }

                if (value) {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    { value: value },
                    { value }
                  );
                } else {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    { value: null },
                    { value: defaultValueOfCurrentSetting }
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
  console.log("currentSetting", currentSetting);
  console.log("currentElemenetsData", currentElemenetsData);

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
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h2 className={styles.editor_col_1_title}>
                    {sectionSettingsValue.title}
                  </h2>
                  <span
                    className={styles.DownArrow}
                    onClick={() => handleHideShow(index)}
                  >
                    <KeyboardArrowDownIcon />
                  </span>
                </div>
                {currentIndex === index && (
                  <Grid classNames={styles.editor_col_1_content}>
                    {sectionSettingsValue.settings.map((setting, index) =>
                      getSettingComponent(
                        setting,
                        sectionKey,
                        `${index}-setting-${setting.id}`
                      )
                    )}
                  </Grid>
                )}
              </div>
            );
          }
        )}
      </Grid.Item>
      <Grid.Item sm={12} md={12} lg={6} xl={6} itemClass={styles.editor_col_2}>
        <Preview classNames={styles.preview} data={currentElemenetsData}>
          <Template />
        </Preview>
      </Grid.Item>
    </Grid>
  );
};

export default EditorPage;

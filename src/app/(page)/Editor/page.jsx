"use client";
import React, { useRef, useState } from "react";
import Template from "../template/page";
import styles from "./style.module.scss";
import elementData from "../../DataJSON/element.json";
import Preview from "@/app/component/Preview";
import Grid from "@/app/component/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Input, Switch } from "@mui/material";
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
  const [currentIndex, setCurrentIndex] = useState(6);

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
    console.log("setting payload", setting);
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
    updatedElementsValue = [],
    replacedTheWholeSettingsValue = false,
    replacedTheWholeElementsValue = false
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
        value: replacedTheWholeSettingsValue
          ? updatedSettingsValue
          : parentSetting.props.value.map((settingValue) => {
              if (settingValue.id === newSettingObj.id) {
                return newSettingObj;
              }
              return settingValue;
            }),
      },
      {
        value: replacedTheWholeElementsValue
          ? updatedElementsValue
          : currentElemenetsData[parentSetting.componentId][
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
      },
      parentSetting?.id ?? newSettingObj?.parentId
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
          <div className={styles.child_setting}>
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
                          )[setting?.bindingKey ?? "value" ],
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
          </div>
        );
      }

      case "loop": {
        return (
          <React.Fragment>
            {setting.props.value.map((loopSetting, index) => {
              if (loopSetting?.hasMultipleSettings) {
                return (
                  <React.Fragment>
                    {currentSetting?.elements[sectionKey]?.title ===
                    "Footer" ? (
                      <label className={styles.child_label}>
                        {index === 0 ? (
                          <strong>{setting.props.lable} :</strong>
                        ) : null}
                      </label>
                    ) : null}
                    <div className={styles.childsetting}>
                      {loopSetting.hasMultipleSettings.map(
                        (childSetting, index) => {
                          return getSettingComponent(
                            {
                              ...loopSetting,
                              ...childSetting,
                              props: {
                                ...childSetting.props,
                                value:
                                  loopSetting.props.value[
                                    childSetting.bindingKey
                                  ],
                              },
                              originId: loopSetting.id,
                              bindingId: setting.bindingId,
                              componentId: setting.componentId,
                            },
                            sectionKey,
                            `${index}-loop_setting-${loopSetting.id}-${childSetting.type}`,
                            (updatedSettingValue, updatedElementvalue) => {
                              if (
                                !updatedSettingValue ||
                                !updatedElementvalue
                              ) {
                                return null;
                              }

                              return {
                                settingsData: setting.props.value.map((ls) => {
                                  if (ls.id === loopSetting.id) {
                                    return {
                                      ...ls,
                                      props: {
                                        ...ls.props,
                                        value: {
                                          ...ls.props.value,
                                          [childSetting.bindingKey]:
                                            updatedSettingValue?.value ?? null,
                                        },
                                        ...(updatedSettingValue?.data && {
                                          data: updatedSettingValue?.data,
                                        }),
                                      },
                                    };
                                  }

                                  return ls;
                                }),
                                elementsData: currentElemenetsData[
                                  setting.componentId
                                ][setting.bindingId].value.map((element) => {
                                  if (
                                    element.id === loopSetting.elementBindingId
                                  ) {
                                    return {
                                      ...element,
                                      [childSetting.bindingKey]:
                                        updatedElementvalue?.value,
                                    };
                                  }

                                  return element;
                                }),
                              };
                            }
                          );
                        }
                      )}
                      {currentSetting?.elements[sectionKey]?.title !==
                      "Footer" ? (
                        <span
                          className={styles.close_btn}
                          type="reset"
                          onClick={() => {
                            UpdatedAddInput(
                              loopSetting,
                              sectionKey,
                              (setting.props.value ?? []).filter((sv) => {
                                return sv.id !== loopSetting.id;
                              }),
                              currentElemenetsData[setting.componentId][
                                setting.bindingId
                              ].value.filter(
                                (cv) => cv.id !== loopSetting.elementBindingId
                              ),
                              true,
                              true
                            );
                          }}
                        >
                          x
                        </span>
                      ) : null}
                    </div>
                  </React.Fragment>
                );
              }

              return (
                <React.Fragment className={styles.childsetting}>
                  {getSettingComponent(
                    {
                      ...loopSetting,
                      ...setting.props.label,
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
                  )}
                </React.Fragment>
              );
            })}
            {currentSetting?.elements[sectionKey]?.title === "Catelog" ||
            currentSetting?.elements[sectionKey]?.title === "Trending" ||
            currentSetting?.elements[sectionKey]?.title === "Collection" ? (
              <button
                className={styles.Addbtn}
                onClick={() => {
                  const elementBindingId = uuidv4();
                  const publicId = uuidv4();
                  const parentId = setting?.id;

                  const newSettingObj = {
                    ...setting.props.mockValue,
                    id: publicId,
                    elementBindingId,
                    parentId,
                  };

                  const newElementObj = {
                    ...currentElemenetsData[setting.componentId][
                      setting.bindingId
                    ]?.mockValue,
                    id: elementBindingId,
                  };

                  UpdatedAddInput(
                    newSettingObj,
                    sectionKey,
                    [...setting.props.value, newSettingObj],
                    [
                      ...currentElemenetsData[setting.componentId][
                        setting.bindingId
                      ].value,
                      newElementObj,
                    ],
                    true,
                    true
                  );
                }}
              >
                Add
              </button>
            ) : null}
          </React.Fragment>
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
                        className={styles.close_btn}
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
          <div className={styles.child_setting}>
            <label htmlFor={key}>{setting.props.label} :</label> <br />
            <Input
              key={key}
              {...setting.props}
              value={setting.props.value}
              onChange={({ target: { value } }) => {
                let mappingValue = null;
                if (loopValueMapper) {
                  console.log("setting.bindingKEy", setting.bindingKey);

                  mappingValue = loopValueMapper(
                    { value },
                    {
                      value:
                        value ??
                        defaultValueOfCurrentSetting.find(
                          (contentValue) =>
                            contentValue.id === setting.elementBindingId
                        )[setting?.bindingKey ?? "value" ],
                    }
                  );

                  console.log("mappingValuer", mappingValue);
                }

                if (value) {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    { value: mappingValue ? mappingValue.settingsData : value },
                    {
                      value: mappingValue ? mappingValue.elementsData : value,
                    },
                    setting?.parentId
                  );
                } else {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    { value: mappingValue ? mappingValue.settingsData : null },
                    {
                      value: mappingValue
                        ? mappingValue.elementsData
                        : defaultValueOfCurrentSetting,
                    },
                    setting?.parentId
                  );
                }
              }}
            />
          </div>
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
                {currentIndex === index &&
                  sectionSettingsValue.settings.map((setting, index) =>
                    getSettingComponent(
                      setting,
                      sectionKey,
                      `${index}-setting-${setting.id}`
                    )
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

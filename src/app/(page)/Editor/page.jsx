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
import { v4 as uuidv4 } from 'uuid';

const EditorPage = () => {
  const initialDataValue = useRef({ ...elementData });
  const [currentElemenetsData, setCurrentElementsData] = useState(elementData);
  const initialSetting = useRef({ ...settingData });
  const [currentSetting, setCurrentSetting] = useState(settingData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numInputs, setNumInputs] = useState(1);
  const [bindingId, setBindingId] = useState("");
  const handleCloseBtn = (index) => {
    // Ensure at least one input field remains
    if (numInputs > 1) {
      setNumInputs((prevNumInputs) => prevNumInputs - 1);
    }
  };

  const handleAddInput = () => {
    setNumInputs((prevNumInputs) => prevNumInputs + 1);
  };

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

  const addInput = (
    setting,
    sectionKey,
    updatedSettingsValue = [],
    updatedElementsValue = []
  ) => {
    const newSettingObj = {
      ...setting,
      props: {
        ...setting.props,
        value: updatedSettingsValue
      }
    }

    const parentSetting = currentSetting.elements[sectionKey].settings.find(st => st.id === setting.parentId)

    updateCurrentSettings(
      parentSetting,
      sectionKey,
      {
        value: parentSetting.props.value.map(psv => {
          if (psv.id === newSettingObj?.originId || psv.id === newSettingObj?.id) {
            return newSettingObj
          }
          
          return psv
        })
      },
      {
        value: currentElemenetsData[parentSetting.componentId][parentSetting.bindingId].value.map(eleValue => {
          if (eleValue.id === newSettingObj.elementBindingId) {
            return {
              ...eleValue,
              value: updatedElementsValue
            }
          }

          return eleValue
        })
      }
    )
  }

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
                if (loopValueMapper && file) {
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
                    { data: null },
                    {
                      value: defaultValueOfCurrentSetting,
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

      case "timeValue": {
        return (
          <Grid.Item sm={12} md={6} lg={6} xl={6}>
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
                              ][setting.bindingId].value.find(v => v.id === setting.elementBindingId);

                              pickedUpValue = loopValueMapper(
                                {
                                  value: setting.props.value.map((v) => {
                                    if (v.elementId === timeValue.elementId) {
                                      return { ...v, from: value };
                                    }

                                    return v;
                                  }),
                                },
                                {
                                  value: updatedElement.value.map(contentValue => {
                                    if (contentValue.id === timeValue.elementId) {
                                      return { ...contentValue, from: dayjs(value).format('HH:mm a') };
                                    }
  
                                    return contentValue
                                  })
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
                                }
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
                      </span>
                      <span>
                        <TimePicker
                          key={key}
                          {...setting.props}
                          label="To"
                          value={setting.props.value.to}
                          onChange={(value) => {
                            let pickedUpValue = null;
                            if (loopValueMapper) {
                              const updatedElement = currentElemenetsData[
                                setting.componentId
                              ][setting.bindingId].value.find(v => v.id === setting.elementBindingId);

                              pickedUpValue = loopValueMapper(
                                {
                                  value: setting.props.value.map((v) => {
                                    if (v.elementId === timeValue.elementId) {
                                      return { ...v, to: value };
                                    }

                                    return v;
                                  }),
                                },
                                {
                                  value: updatedElement.value.map(contentValue => {
                                    if (contentValue.id === timeValue.elementId) {
                                      return { ...contentValue, to: dayjs(value).format('HH:mm a') };
                                    }
  
                                    return contentValue
                                  })
                                }
                              );
                            }

                            if (value) {
                              updateCurrentSettings(
                                setting,
                                sectionKey,
                                pickedUpValue
                                  ? { value: pickedUpValue.settingsData }
                                  : { value: value },
                                {
                                  value: pickedUpValue
                                    ? pickedUpValue.elementsData
                                    : value,
                                }
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
                      </span>
                      <span
                        className={styles.closebtn}
                        type="reset"
                        onClick={() => handleCloseBtn(index)}
                      >
                        x
                      </span>
                    </div>
                  ))}
                </div>
              </DemoContainer>
            </LocalizationProvider>
            <button className={styles.Addbtn} onClick={() => {
              const publicId = uuidv4();
              addInput(
                setting,
                sectionKey,
                [
                  ...setting.props.value,
                  {
                    from: null,
                    to: null,
                    elementId: publicId
                  }
                ],
                [
                  ...currentElemenetsData[setting.componentId][setting.bindingId].value.find(v => v.id === setting.elementBindingId).value,
                  {
                    from: "",
                    to: "",
                    id: publicId
                  }
                ]
              )
            }}>
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
                let timeSetValue = null;
                if (loopValueMapper) {
                  timeSetValue = loopValueMapper({ value: value }, { value });
                }

                if (value) {
                  updateCurrentSettings(
                    setting,
                    sectionKey,
                    { value: value },
                    { value: timeSetValue ? timeSetValue.elementsData : value }
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

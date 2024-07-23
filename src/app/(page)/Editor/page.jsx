"use client";
import React, { useRef, useState } from "react";
import Template from "../template/page";
import styles from "./style.module.scss";
import elementData from "../../DataJSON/element.json";
import Preview from "@/app/component/Preview";
import Grid from "@/app/component/Grid";
import { Input, Switch } from "@mui/material";
import settingData from "../../DataJSON/settings.json";

const EditorPage = () => {
  const initialDataValue = useRef({ ...elementData });
  const [currentElemenetsData, setCurrentElementsData] = useState(elementData);
  const initialSetting = useRef({ ...settingData });
  const [currentSetting, setCurrentSetting] = useState(settingData);

  // const [inputValue, setInputValue] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [selectedFileRight, setSelectedFileRight] = useState(null);

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

  // const handleInputbgChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  // const handleRightImage = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  //   updateSettings("headerview", "title", event.target.value);
  // };
  // const handleSave = async () => {
  //   if (!selectedFile) {
  //     return;
  //   }
  //   if (!selectedFileRight) {
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL(selectedFile);
  //   reader.onload = (e) => {
  //     const imageUrl = e.target.result;
  //     updateSettings("header", "img", imageUrl);
  //     setSelectedFile(null);
  //   };
  //   const reader1 = new FileReader();
  //   reader1.readAsDataURL(selectedFileRight);
  //   reader1.onload = (e) => {
  //     const imageUrl = e.target.result;
  //     updateSettings("headerview", "img", imageUrl);
  //     setSelectedFileRight(null);
  //   };
  // };

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
    updatedSettingData = {},
    updatedElementData = {}
  ) => {
    setCurrentSetting((prev) => ({
      ...prev,
      elements: prev.elements.map((ele) => {
        if (ele.id === setting.id) {
          const settingObj = {
            ...ele,
            props: {
              ...ele.props,
              ...updatedSettingData,
            },
          };
          updateElementData(settingObj, updatedElementData);
          return settingObj;
        }
        return ele;
      }),
    }));
  };

  const getSettingComponent = (setting, key) => {
    const defaultValueOfCurrentSetting =
      initialDataValue.current[setting.componentId][setting.bindingId]?.value;
    switch (setting.type) {
      case "input-file": {
        return (
          <>
          {/* {setting.componentId} */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor={key}>{setting.props.label} :</label> <br />
            <Input
              key={key}
              {...setting.props}
              value={setting.props.value}
              onChange={({ target: { files } }) => {
                const file = files[0];
                if (file) {
                  updateCurrentSettings(
                    setting,
                    { data: file },
                    { value: URL.createObjectURL(file) }
                  );
                } else {
                  console.log("initialDataValue", initialDataValue);
                  updateCurrentSettings(
                    setting,
                    { data: null },
                    {
                      value: defaultValueOfCurrentSetting,
                    }
                  );
                }
              }}
            />
          </div>
          </>
        );
      }

      case "input": {
        return (
          <>
          {/* {setting.componentId} */}
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor={key}>{setting.props.label} :</label> <br />
            <Input
              key={key}
              {...setting.props}
              value={setting.props.value}
              onChange={({ target: { value } }) => {
                if (!value) {
                  updateCurrentSettings(
                    setting,
                    { value: "" },
                    { value: defaultValueOfCurrentSetting }
                  );
                } else {
                  updateCurrentSettings(setting, { value }, { value });
                }
              }}
            />
          </div>
          </>
        );
      }
      case "toggle": {
        return (
          <>
            {/* {setting.componentId} */}
            <label htmlFor={key}>{setting.props.label} :</label> 
            <Switch
              key={key}
              {...setting.props}
              onChange={({ target: { checked } }) => {
                console.log("checked", checked);
                updateCurrentSettings(setting, { checked }, { value: checked });
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          </>
        );
      }

      default: {
        return <React.Fragment></React.Fragment>;
      }
    }
  };

  console.log("currentSetting.element", currentSetting.elements);
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
        {currentSetting.elements.map((setting, index) =>
          getSettingComponent(setting, `${index}-setting-${setting.id}`)
        )}


        {/* <button onClick={handleSave}>Save Changes</button> */}
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

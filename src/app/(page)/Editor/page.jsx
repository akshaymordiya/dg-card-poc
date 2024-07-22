"use client";
import React, { useRef, useState } from "react";
import Template from "../template/page";
import styles from "./style.module.scss";
import elementData from "../../DataJSON/element.json";
import Preview from "@/app/component/Preview";
import Grid from "@/app/component/Grid";
import { Input } from "@mui/material";
import settingData from "../../DataJSON/settings.json";

const EditorPage = () => {
  const initialDataValue = useRef({ ...elementData });
  const [currentElemenetsData, setCurrentElementsData] = useState(elementData);
  const initialSetting = useRef({ ...settingData });
  const [currentSetting, setCurrentSetting] = useState(settingData);

  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileRight, setSelectedFileRight] = useState(null);

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
  const handleInputbgChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRightImage = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    updateSettings("headerview", "title", event.target.value);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      return;
    }
    if (!selectedFileRight) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      updateSettings("header", "img", imageUrl);
      setSelectedFile(null);
    };
    const reader1 = new FileReader();
    reader1.readAsDataURL(selectedFileRight);
    reader1.onload = (e) => {
      const imageUrl = e.target.result;
      updateSettings("headerview", "img", imageUrl);
      setSelectedFileRight(null);
    };
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

  const updateCurrentSettings = (setting, targetValue = {}) => {
    let updateSettingsData = {};
    setCurrentSetting((prev) =>
      prev.elements.map((ele) => {
        if (ele.id === setting.id) {
          updateSettingsData = {
            ...ele,
            props: {
              ...ele.props,
              ...targetValue,
            },
          };
          return updateSettingsData;
        }

        return ele;
      })
    );

    updateElementData(updateSettingsData, targetValue);
  };

  console.log("currentElemenetsData", currentElemenetsData);
  console.log("currentElemenetsData", currentSetting);

  const getSettingComponent = (setting) => {
    switch (setting.id) {
      case "input": {
        return (
          <Input
            {...setting.props}
            value={elementData[setting.componentId][setting.bindingId]}
            onChange={({ target: { file } }) =>
              updateCurrentSettings(setting, { value: file[0] })
            }
            // onChange={(event) =>
            //   updateCurrentSettings(setting, { value: event.target.files[0] })
            // }
          />
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
        {currentSetting.elements.map((setting) => getSettingComponent(setting))}
        {/* <EditorSet />
        <div>
          <label htmlFor="headerImage">Header background (Image):</label>
          <Input type="file" onChange={handleInputbgChange} />
        </div>

        <div>
          <label htmlFor="">Header title</label>
          <Input type="text" value={inputValue} onChange={handleInputChange} />
        </div>
        <div>
          <div>
            <label htmlFor="headerImage">Header Right Image</label>
            <Input type="file" onChange={handleRightImage} />
          </div>
        </div>

        <button onClick={handleSave}>Save Changes</button> */}
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

"use client";
import React, { useRef, useState } from "react";
import Template from "../template/page";
import styles from "./style.module.scss";
import elementData from "../../DataJSON/element.json";
import Preview from "@/app/component/Preview";
import Grid from "@/app/component/Grid";

const EditorPage = () => {
  const initialDataValue = useRef({ ...elementData });
  const [currentElemenetsData, setCurrentElementsData] = useState(elementData);

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
        <button
          onClick={() =>
            updateSettings("header", "img", "/assets/imagesbg.png")
          }
        >
          Click Me
        </button>
      </Grid.Item>
      <Grid.Item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        itemClass={styles.editor_col_2}
      >
        <Preview data={currentElemenetsData}>
          <Template />
        </Preview>
      </Grid.Item>
    </Grid>
  );
};

export default EditorPage;

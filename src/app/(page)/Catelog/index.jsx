import Grid from "@/app/component/Grid";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import IMG from "@/app/component/Img";
import SectionTitle from "@/app/component/SectionTitle";
import { TemplateContext } from "@/app/context/TemplateContext";

const Catelog = () => {
  const data = useContext(TemplateContext);
  const { catelog } = data;
  return (
    <div className={styles.catelog_wrapper}>
      <SectionTitle title={catelog.title.value} />
      <Grid classNames={styles.catelog_wrapper_content}>
        {catelog?.content?.value?.map((item, index) => (
          <Grid.Item
            md={4}
            lg={4}
            xl={4}
            itemClass={styles.catelog_wrapper_content_item}
            key={index}
          >
            <IMG
              src={item?.image}
              imageClasses={styles.catelog_img}
              useRawImgTag
            />
            <h4>{item?.title}</h4>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
};

export default Catelog;

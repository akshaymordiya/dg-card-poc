import Grid from "@/app/component/Grid";
import styles from "./styles.module.scss";
import React, { useContext } from "react";
import IMG from "@/app/component/Img";
import Button from "@/app/component/Button";
import { TemplateContext } from "@/app/context/TemplateContext";

const Sheduled = () => {
  const data = useContext(TemplateContext);
  const { scheduled } = data;
  return (
    <Grid classNames={styles.sheduled_wrapper}>
      <Grid.Item
        sm={6}
        xs={6}
        md={6}
        lg={6}
        xl={6}
        itemClass={styles.sheduled_wrapper_col_1}
      >
        <div className={styles.sheduled_wrapper_col_1_content}>
          <IMG src="/assets/clock.png" useRawImgTag />
          <div className={styles.sheduled_wrapper_col_1_title}>
            <h3>{scheduled?.title?.value}</h3>
            <p>{scheduled?.paragraph?.value}</p>
            <p>{scheduled?.time?.value}</p>
          </div>
        </div>
      </Grid.Item>
      <Grid.Item
        sm={6}
        xs={6}
        md={6}
        lg={6}
        xl={6}
        itemClass={styles.sheduled_wrapper_col_2}
      >
        <div className={styles.sheduled_wrapper_col_2_show_btn}>
          <Button text={scheduled?.button?.value} itemclass={styles.Showless_btn} />
        </div>
      </Grid.Item>
      <Grid.Item
        sm={12}
        xs={12}
        md={12}
        lg={12}
        xl={12}
        itemClass={styles.sheduled_wrapper_col_3}
      >
        <div className={styles.sheduled_wrapper_col_3_content}>
          {scheduled?.content?.value.map((item, index) => (
            <div className={styles.content_box} key={index}>
              <div className={styles.content_box_title}>
                <h4>{item?.title}</h4>
                <IMG src={item?.img} useRawImgTag />
              </div>
              <div className={styles.content_box_time}>
                <span>{item?.value}</span> <br />
                <span>{item?.endtime}</span>
              </div>
            </div>
          ))}
        </div>
      </Grid.Item>
    </Grid>
  );
};

export default Sheduled;

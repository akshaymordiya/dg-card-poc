import Grid from "@/app/component/Grid";
import styles from "./styles.module.scss";
import React from "react";
import IMG from "@/app/component/Img";
import Button from "@/app/component/Button";
const data = [
  {
    id: 1,
    title: "Monday",
    starttime: "7:00am to 1:00pm",
    endtime: "2:00pm to 10:20pm",
  },
  {
    id: 2,
    title: "Tuesday",
    starttime: "7:00am to 1:00pm",
    endtime: "2:00pm to 10:20pm",
  },
  {
    id: 3,
    title: "Wednesday",
    starttime: "7:00am to 1:00pm",
    endtime: "2:00pm to 10:20pm",
  },
  {
    id: 4,
    title: "Thursday",
    starttime: "7:00am to 1:00pm",
    endtime: "2:00pm to 10:20pm",
  },
  {
    id: 5,
    title: "Friday",
    starttime: "7:00am to 1:00pm",
    endtime: "2:00pm to 10:20pm",
  },
  {
    id: 6,
    title: "Saturday",
    starttime: "7:00am to 1:00pm",
    endtime: "2:00pm to 10:20pm",
  },
  {
    id: 7,
    title: "Sunday",
    starttime: "7:00am to 1:00pm",
    endtime: "2:00pm to 10:20pm",
  },
];

const Sheduled = () => {
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
            <h3>Open Till - 10:20pm</h3>
            <p>
              Today’s business hours : <br /> 7:00am to 10:20pm
            </p>
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
          <Button text="Show Less" itemclass={styles.Showless_btn} />
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
          {data.map((item, index) => (
            <div className={styles.content_box} key={index}>
              <div className={styles.content_box_title}>
                <h4>{item.title}</h4>
                <IMG src="/assets/Vector.png" useRawImgTag />
              </div>
              <div className={styles.content_box_time}>
                <span>{item.starttime}</span> <br />
                <span>{item.endtime}</span>
              </div>
            </div>
          ))}
        </div>
      </Grid.Item>
    </Grid>
  );
};

export default Sheduled;

import Grid from "@/app/component/Grid";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import IMG from "@/app/component/Img";
import SocialIcon from "@/app/component/SocialIcon";
import ContactModule from "@/app/component/ContactModule";
import { TemplateContext } from "@/app/context/TemplateContext";

const HeaderView = () => {
  const data = useContext(TemplateContext);
  const { headerview } = data;
  return (
    <Grid classNames={styles.headerview_content}>
      <Grid.Item
        xs={12}
        sm={12}
        md={6}
        lg={7}
        xl={8}
        itemClass={styles.headerview_content_col_1}
      >
        <div className={styles.headerview_content_col_1_content}>
          <div className={styles.headerview_content_col_1_mobilecontent}>
            <div className={styles.title}>
              <h1>{headerview.title.value}</h1>
              <IMG src={headerview.img.value} useRawImgTag />
            </div>
            <span>
              {headerview?.subtitle?.value?.split("_").map((word, index) => (
                <span key={index}>
                  {word} <br />
                </span>
              ))}
            </span>
            <div className={styles.mobileshow_button}>
              <SocialIcon />
            </div>
          </div>
          <div className={styles.headerview_content_col_1_content_mobileshow}>
            <ContactModule/>
          </div>
        </div>
      </Grid.Item>
      <Grid.Item
        xs={12}
        sm={12}
        md={6}
        lg={5}
        xl={4}
        itemClass={styles.headerview_content_col_2}
      >
        <div className={styles.headerview_content_col_2_content}>
          <ContactModule />
        </div>

        <div className={styles.headerview_content_col_2_note_content}>
          <div className={styles.content_title}>
            <h5>{headerview.abouttitle.value}</h5>
            <p>{headerview.description.value}</p>
            <div className={styles.conclus}>
              <p>
                {headerview?.concluse?.value?.split("_").map((word, index) => (
                  <span key={index}>
                    {word} <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.headerview_content_col_2_mobileshow}>
          <SocialIcon />
        </div>
      </Grid.Item>
    </Grid>
  );
};

export default HeaderView;


import Grid from "@/app/component/Grid";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import IMG from "@/app/component/Img";
import SocialIcon from "@/app/component/SocialIcon";
import { TemplateContext } from "@/app/context/TemplateContext";
import Button from "@/app/component/Button";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

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
              {headerview.checkBadge.value && (
                <IMG src="/assets/check.png" useRawImgTag />
              )}
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
            <div
              className={`${styles.headerview_content_col_2_content_wrapper}`}
            >
              <Button
                textclass={styles.title_btn}
                text={headerview?.contactbtn?.value}
                Icon={<PhoneInTalkOutlinedIcon />}
                itemclass={styles.contact_btn}
              />
              <Button
                textclass={styles.title_btn}
                text={headerview?.mailbtn?.value}
                Icon={<EmailOutlinedIcon />}
                itemclass={styles.contact_btn}
              />
            </div>
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
          <div className={`${styles.headerview_content_col_2_content_wrapper}`}>
            <Button
              textclass={styles.title_btn}
              text={headerview?.contactbtn?.value}
              Icon={<PhoneInTalkOutlinedIcon />}
              itemclass={styles.contact_btn}
            />
            <Button
              textclass={styles.title_btn}
              text={headerview?.mailbtn?.value}
              Icon={<EmailOutlinedIcon />}
              itemclass={styles.contact_btn}
            />
          </div>
        </div>

        <div className={styles.headerview_content_col_2_note_content}>
          <div className={styles.content_title}>
            <h5>{headerview.abouttitle.value}</h5>
            <p>{headerview.description.value}</p>
            <div className={styles.conclus}>
              <p>{headerview?.concluse?.value}</p>
              <p>{headerview?.position?.value}</p>
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

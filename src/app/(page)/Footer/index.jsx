import Grid from "@/app/component/Grid";
import React, { useContext } from "react";
import styles from "./style.module.scss";
import { TemplateContext } from "@/app/context/TemplateContext";
import Link from "next/link";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import IMG from "@/app/component/Img";

const Footer = () => {
  const data = useContext(TemplateContext);
  const { footer } = data;
  return (
    <div className={styles.footer_wrapper}>
      <Grid>
        <Grid.Item
          sm={12}
          md={12}
          lg={6}
          xl={8}
          itemClass={styles.footer_wrapper_col_1}
        >
          <h1>{footer.title.value}</h1>
          <p>
            {footer?.paragraph?.value?.split("_").map((item, index) => (
              <span key={index}>
                {item} <br />
              </span>
            ))}
          </p>
          <div className={styles.footer_wrapper_col_1_content}>
          {footer?.content?.value.map((item, index) => (
              <div
                key={index}
                className={styles.footer_wrapper_col_1_content_icon}
              >
                <IMG
                  src={item?.value}
                  imageClasses={styles.imageclass}
                  useRawImgTag
                  containerClasses={styles.icon}
                  useContainer
                />
              </div>
          ))}
            </div>
        </Grid.Item>
        <Grid.Item
          sm={12}
          md={12}
          lg={6}
          xl={4}
          itemClass={styles.footer_wrapper_col_2}
        >
          <div className={styles.footer_wrapper_col_2_content}>
            {footer?.contact?.value.map((item, index) => (
              <div
                key={index}
                className={styles.footer_wrapper_col_2_content_icon}
              >
                <IMG
                  src={item?.image}
                  imageClasses={styles.imageclass}
                  useRawImgTag
                  containerClasses={styles.icon}
                  useContainer
                />
                <span>{item?.text}</span>
              </div>
            ))}
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default Footer;


import Grid from "@/app/component/Grid";
import React from "react";
import styles from "./style.module.scss";
import FooterInfo from "@/app/component/FooterInfo";

const Footer = () => {
  return (
    <div className={styles.footer_wrapper}>
      <Grid>
        <Grid.Item
          sm={12}
          md={12}
          lg={8}
          xl={8}
          itemClass={styles.footer_wrapper_col_1}
        >
          <h1>Wearable</h1>
          {/* {item.split("_").map((word, wordIndex) => (
                  <span key={wordIndex}>
                    {word}
                    {wordIndex < item.title.split("_").length - 1 ? (
                      <br />
                    ) : null}
                  </span>
                ))} */}
          <p>
            Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
            Maxime mollitia, molestiae quas vel
          </p>
        </Grid.Item>
        <Grid.Item
          sm={12}
          md={12}
          lg={4}
          xl={4}
          itemClass={styles.footer_wrapper_col_2}
              >
                  <FooterInfo />
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default Footer;

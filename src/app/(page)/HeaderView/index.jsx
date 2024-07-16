import Grid from "@/app/component/Grid";
import React from "react";
import styles from "./styles.module.scss";
import IMG from "@/app/component/Img";
import SocialIcon from "@/app/component/SocialIcon";
import Button from "@/app/component/Button";

const HeaderView = () => {
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
              <h1>Wearable</h1>
              <IMG src="/assets/check.png" useRawImgTag />
            </div>
            <span>
              Always ready to serve you <br /> Surat, Gujarat India
            </span>
            <SocialIcon />
          </div>
          <div
            className={`${styles.headerview_content_col_2_content} ${styles.mobileshow_button}`}
          >
            <Button href="#" text="Contact Us" itemclass={styles.contact_btn} />
            <Button href="#" text="Mail Us" itemclass={styles.mail_btn} />
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
          <Button href="#" text="Contact Us" itemclass={styles.contact_btn} />
          <Button href="#" text="Mail Us" itemclass={styles.mail_btn} />
        </div>

        <div className={styles.headerview_content_col_2_note_content}>
          <div className={styles.content_title}>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              officia ullam ipsam veritatis mollitia sunt aspernatur quidem
              sequi necessitatibus dicta quo reprehenderit, nesciunt eos
              excepturi ut iste, tenetur deserunt nam.
            </p>

            <div className={styles.conclus}>
              <p>
                - Akshay Moradiya <br /> Proprietor
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

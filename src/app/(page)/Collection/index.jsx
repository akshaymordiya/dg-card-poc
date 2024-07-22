import React, { useContext } from "react";
import styles from "./styles.module.scss";
import Grid from "@/app/component/Grid";
import IMG from "@/app/component/Img";
import Button from "@/app/component/Button";
import SectionTitle from "@/app/component/SectionTitle";
import { TemplateContext } from "@/app/context/TemplateContext";

function Collection() {
  const data = useContext(TemplateContext);
  const { collection } = data;
  return (
    <div className={styles.collection_wrapper}>
      <SectionTitle title={collection.title.value} />
      <Grid classNames={styles.collection_wrapper_content}>
        {collection?.content?.map((item) => (
          <Grid.Item
            lg={3}
            xl={3}
            itemClass={styles.collection_wrapper_content_item}
            key={item.id}
          >
            <IMG src={item?.image} useRawImgTag />
            <div className={styles.collection_wrapper_content_item_info}>
              <h2>
                {item?.title.split("_").map((word, index) => (
                  <span key={index}>
                    {word} <br />
                  </span>
                ))}
              </h2>
              <span className={styles.price}>₹ {item?.price}.00 /-</span>
              <div className={styles.Quotenow}>
                <Button text={item?.btn} itemclass={styles.Quotenow_text} />
              </div>
            </div>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
}

export default Collection;

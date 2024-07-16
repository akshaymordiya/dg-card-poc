import React from "react";
import styles from "./styles.module.scss";
import Grid from "@/app/component/Grid";
import IMG from "@/app/component/Img";
import Button from "@/app/component/Button";
import SectionTitle from "@/app/component/SectionTitle";

const data = [
  {
    id: 1,
    image: "/assets/image-1.png",
    title: "Wearable Men's_Black T-shirt",
    price: 899,
  },
  {
    id: 2,
    image: "/assets/image-1.png",
    title: "Wearable Men's_Black T-shirt",
    price: 899,
  },
  {
    id: 3,
    image: "/assets/image-1.png",
    title: "Wearable Men's_Black T-shirt",
    price: 899,
  },
  {
    id: 4,
    image: "/assets/image-1.png",
    title: "Wearable Men's_Black T-shirt",
    price: 899,
  },
];

function Collection() {
  return (
    <div className={styles.collection_wrapper}>
      <SectionTitle title="Popular Collection" />
      <Grid classNames={styles.collection_wrapper_content}>
        {data.map((item) => (
          <Grid.Item
            lg={3}
            xl={3}
            itemClass={styles.collection_wrapper_content_item}
            key={item.id} // Use unique ID for key
          >
            <IMG src={item.image} useRawImgTag />
            <div className={styles.collection_wrapper_content_item_info}>
              <h2>
                {item?.title.split("_").map((word, wordIndex) => (
                  <span key={wordIndex}>
                    {word}
                    {wordIndex < item.title.split("_").length - 1 ? (
                      <br />
                    ) : null}
                  </span>
                ))}
              </h2>
              <span className={styles.price}>₹ {item.price}.00 /-</span>
              <div className={styles.Quotenow}>
                <Button text="Quote Now" itemclass={styles.Quotenow_text} />
              </div>
            </div>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
}

export default Collection;

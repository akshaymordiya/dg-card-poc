import SectionTitle from "@/app/component/SectionTitle";
import React from "react";
import styles from "./styles.module.scss";
import Grid from "@/app/component/Grid";
import IMG from "@/app/component/Img";
import Button from "@/app/component/Button";

const data = [
  {
    id: 1,
    title: "Wearable Black Jacket",
    description: "Premium quality jacket with_unique coincept",
    interest: "28 People shown interest",
    price: "899",
    discount: "28",
    image: "/assets/trendingimage-1.png",
  },
  {
    id: 2,
    title: "Wearable Black Jacket",
    description: "Premium quality jacket with_unique coincept",
    interest: "28 People shown interest",
    price: "899",
    discount: "28",
    image: "/assets/trendingimage-1.png",
  },
  {
    id: 3,
    title: "Wearable Black Jacket",
    description: "Premium quality jacket with_unique coincept",
    interest: "28 People shown interest",
    price: "899",
    discount: "28",
    image: "/assets/trendingimage-1.png",
  },
  {
    id: 4,
    title: "Wearable Black Jacket",
    description: "Premium quality jacket with_unique coincept",
    interest: "28 People shown interest",
    price: "899",
    discount: "28",
    image: "/assets/trendingimage-1.png",
  },
  {
    id: 5,
    title: "Wearable Black Jacket",
    description: "Premium quality jacket with_unique coincept",
    interest: "28 People shown interest",
    price: "899",
    discount: "28",
    image: "/assets/trendingimage-1.png",
  },
  {
    id: 6,
    title: "Wearable Black Jacket",
    description: "Premium quality jacket with_unique coincept",
    interest: "28 People shown interest",
    price: "899",
    discount: "28",
    image: "/assets/trendingimage-1.png",
  },
];

const Trending = () => {
  return (
    <div className={styles.trending_wrapper}>
      <SectionTitle title="Trending of the week" />
      <Grid classNames={styles.trending_wrapper_content}>
        {data.map((item, index) => {
          const count = String(index + 1).padStart(2, "0");
          return index % 2 == 0 ? (
            <Grid.Item
              key={index}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              itemClass={styles.trending_wrapper_content_item}
            >
              <div className={styles.trending_wrapper_content_item_col_1}>
                <div className={styles.ribbon_left}>{count}</div>
                <div className={styles.content_text}>
                  <h5>{item.title}</h5>
                  {/* <p>{item.description}</p> */}
                  <p>
                    {item?.description.split("_").map((word, wordIndex) => (
                      <span key={wordIndex}>
                        {word}
                        {wordIndex < item?.description.split("_").length - 1 ? (
                          <br />
                        ) : null}
                      </span>
                    ))}
                  </p>
                  <span>{item.interest}</span>
                  <div className={styles.item_price}>
                    <span className={styles.price}>₹ {item.price}.00 /-</span>
                    <span className={styles.discount}>
                      ( {item.discount}% off )
                    </span>
                  </div>
                  <Button text="Quote Now" textclass={styles.Quote} itemclass={styles.Quotenow} />
                </div>
              </div>
              <div className={styles.trending_wrapper_content_item_col_2}>
                <IMG src={item.image} useRawImgTag />
              </div>
            </Grid.Item>
          ) : (
            <Grid.Item
              key={index}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              itemClass={styles.trending_wrapper_content_item}
            >
              <div className={styles.trending_wrapper_content_item_col_2}>
                <IMG src={item.image} useRawImgTag />
              </div>
              <div className={styles.trending_wrapper_content_item_col_1}>
                <div className={styles.ribbon_right}>{count}</div>
                <div className={styles.content_text}>
                  <h5>{item.title}</h5>
                  <p>
                    {item?.description.split("_").map((word, wordIndex) => (
                      <span key={wordIndex}>
                        {word}
                        {wordIndex < item?.description.split("_").length - 1 ? (
                          <br />
                        ) : null}
                      </span>
                    ))}
                  </p>
                  <span>{item.interest}</span>
                  <div className={styles.item_price}>
                    <span className={styles.price}>₹ {item.price}.00 /-</span>
                    <span className={styles.discount}>
                      ( {item.discount}% off )
                    </span>
                  </div>
                  <Button text="Quote Now" textclass={styles.Quote} itemclass={styles.Quotenow} />
                </div>
              </div>
            </Grid.Item>
          );
        })}
      </Grid>
    </div>
  );
};

export default Trending;

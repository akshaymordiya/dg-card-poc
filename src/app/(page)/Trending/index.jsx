import SectionTitle from "@/app/component/SectionTitle";
import React, { useContext } from "react";
import styles from "./styles.module.scss";
import Grid from "@/app/component/Grid";
import IMG from "@/app/component/Img";
import Button from "@/app/component/Button";
import { TemplateContext } from "@/app/context/TemplateContext";

const Trending = () => {
  const data = useContext(TemplateContext);
  const { trending } = data;
  return (
    <div className={styles.trending_wrapper}>
      <SectionTitle title={trending?.title?.value} />
      <Grid classNames={styles.trending_wrapper_content}>
        {trending?.content?.value?.map((item, index) => {
          const count = String(index + 1).padStart(2, "0");
          return index % 2 == 0 ? (
            item?.price ||
            item.title ||
            item.description ||
            item.interest ||
            item.discount ||
            item?.btn ||
            item?.image ? (
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
                    <p>{item.description}</p>
                    <span>{item.interest}</span>
                    <div className={styles.item_price}>
                      <span className={styles.price}>
                        {item.price ? `₹ ${item.price}.00 /-` : null}
                      </span>
                      <span className={styles.discount}>
                        {item.discount ? `( ${item.discount}% off )` : null}
                      </span>
                    </div>
                    {item?.btn ? (
                      <Button
                        text={item?.btn}
                        textclass={styles.Quote}
                        itemclass={styles.Quotenow}
                      />
                    ) : null}
                  </div>
                </div>
                {item?.image ? (
                  <div className={styles.trending_wrapper_content_item_col_2}>
                    <IMG src={item?.image} useRawImgTag />
                  </div>
                ) : null}
              </Grid.Item>
            ) : null
          ) : (
            item?.price ||
            item.title ||
            item.description ||
            item.interest ||
            item.discount ||
            item?.btn ||
            item?.image ? <Grid.Item
              key={index}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              itemClass={styles.trending_wrapper_content_item}
            >
              {item?.image ? (
                <div className={styles.trending_wrapper_content_item_col_2}>
                  <IMG src={item?.image} useRawImgTag />
                </div>
              ) : null}
              <div className={styles.trending_wrapper_content_item_col_1}>
                <div className={styles.ribbon_right}>{count}</div>
                <div className={styles.content_text}>
                  <h5>{item?.title}</h5>
                  <p>{item?.description}</p>
                  <span>{item.interest}</span>
                  <div className={styles.item_price}>
                    <span className={styles.price}>
                      {item.price ? `₹ ${item.price}.00 /-` : null}
                    </span>
                    <span className={styles.discount}>
                      {item.discount ? `( ${item.discount}% off )` : null}
                    </span>
                  </div>
                  {item?.btn ? (
                    <Button
                      text={item?.btn}
                      textclass={styles.Quote}
                      itemclass={styles.Quotenow}
                    />
                  ) : null}
                </div>
              </div>
            </Grid.Item> :null
          );
        })}
      </Grid>
    </div>
  );
};

export default Trending;

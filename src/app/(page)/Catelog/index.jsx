import Grid from "@/app/component/Grid";
import React from "react";
import styles from "./styles.module.scss";
import IMG from "@/app/component/Img";
import SectionTitle from "@/app/component/SectionTitle";

const data = [
  {
    id: 1,
    image: "/assets/catelog-1.png",
    title: "Indian Saree",
  },
  {
    id: 2,
    image: "/assets/catelog-2.png",
    title: "Indian Kurti",
  },
  {
    id: 3,
    image: "/assets/catelog-3.png",
    title: "Skirts & Jacket",
  },
  {
    id: 4,
    image: "/assets/catelog-4.png",
    title: "Traditional Dress",
  },
  {
    id: 5,
    image: "/assets/catelog-5.png",
    title: "Women’s T-shirts",
  },
  {
    id: 6,
    image: "/assets/catelog-6.png",
    title: "T-shirts & Jeans",
  },
];

const Catelog = () => {
  return (
    <div className={styles.catelog_wrapper}>
      <SectionTitle title="Catelog" />
      <Grid classNames={styles.catelog_wrapper_content}>
          {data.map((item, index) => (
            <Grid.Item
              md={4}
              lg={4}
              xl={4}
              itemClass={styles.catelog_wrapper_content_item}
              key={index}
            >
              <IMG src={item.image} imageClasses={styles.catelog_img} useRawImgTag />
              <h4>{item.title}</h4>
            </Grid.Item>
          ))}
      </Grid>
    </div>
  );
};

export default Catelog;

import { Container } from "@mui/material";
import React from "react";
import Head from "../Head/Head";
import Developer from "../Developer/Developer";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";
import amrImg from "../../../public/images/amr.jpg";
import webGhoulImg from "../../../public/images/webGhoul.jpg";
import node from "../../../public/images/node.svg";
import next from "../../../public/images/next.svg";
const About = () => {
  const developers = [
    {
      name: "Mahmoud Salama",
      nickName: "webGhoul",
      role: "Frontend Developer",
      links: {
        gmail: "",
        whatsapp:
          "https://api.whatsapp.com/send/?phone=%2B201009344881&text&type=phone_number&app_absent=0",
        github: "https://github.com/web-ghoul",
        resume: "",
        linkedin: "https://www.linkedin.com/in/mahmoud-salama-23b627211/",
        facebook: "https://www.facebook.com/mahmoud.gogoo.5/",
      },
      img: webGhoulImg,
      img1: next,
    },
    {
      name: "Amr Khaled",
      nickName: "Amr006",
      role: "Backend Developer",
      links: {
        gmail: "",
        whatsapp:
          "https://api.whatsapp.com/send/?phone=%2B201013714763&text&type=phone_number&app_absent=0",
        github: "https://github.com/amr006",
        resume: "",
        linkedin: "https://www.linkedin.com/in/amr-khaled-mohamed/",
        facebook: "https://www.facebook.com/profile.php?id=100006620191591",
      },
      img: amrImg,
      img1: node,
    },
  ];
  return (
    <MyBox>
      <Container className={`grid jcs aic g30`}>
        <Head special={true} align={"center"} title={"About Us"} h={"h3"} />
        {developers.reverse().map((dev, i) => (
          <Developer dev={dev} key={i} />
        ))}
      </Container>
    </MyBox>
  );
};

export default About;

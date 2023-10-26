import { Box, TextField } from "@mui/material";
import React from "react";
import "../Form.css";
import forgotPasswordImg from "../../../../public/images/forgotPassword.jpg";
import Logo from "@/components/Logo/Logo";
import Head from "@/components/Head/Head";
import { SecondaryButton } from "@/MUIComponents/SecondaryButton/SecondaryButton";
import Link from "next/link";
import LoadingButton from "@/components/LoadingButton/LoadingButton";

const ForgotPassword = ({ formik }) => {
  return (
    <>
      <Box
        className={`flex jcc aic form_image`}
        sx={{
          backgroundImage: `url(${forgotPasswordImg.src})`,
          position: "relative",
        }}
      >
        <Box className={"overlay"}></Box>
        <Head
          align={"center"}
          h={"h2"}
          title={"Forgot Your Key"}
          color={"#fff"}
          nowrap={true}
        />
      </Box>
      <Box className={`grid aic jcs g20 form_contain`}>
        <Logo title={true} color={"#333"} />
        <Box className={`grid jcs ass aic g20`}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <LoadingButton text={"Forgot Password"} />
          <SecondaryButton fullWidth>
            <Link href={process.env.NEXT_PUBLIC_LOGIN_PAGE}>
              Back to Log in
            </Link>
          </SecondaryButton>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;

import { MainButton } from "@/MUIComponents/MainButton/MainButton";
import { Box, TextField } from "@mui/material";
import React from "react";
import "../Form.css";
import resetPassword from "../../../../public/images/ResetPassword.jpg";
import Logo from "@/components/Logo/Logo";
import Head from "@/components/Head/Head";
import { SecondaryButton } from "@/MUIComponents/SecondaryButton/SecondaryButton";
import Link from "next/link";
import LoadingButton from "@/components/LoadingButton/LoadingButton";

const ResetPassword = ({ formik }) => {
  return (
    <>
    <Box
        className={`flex jcc aic form_image`}
        sx={{
          backgroundImage: `url(${resetPassword.src})`,
          position: "relative",
        }}
      >
        <Box className={"overlay"}></Box>
        <Head
          align={"center"}
          h={"h2"}
          title={"Reset Your Key"}
          color={"#fff"}
          nowrap={true}
        />
      </Box>
      <Box className={`grid aifs jcs g20 form_contain`}>
        <Logo title={true} color={"#333"} />
        <Box className={`grid jcs ass aic g10`}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="New Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
          />
          <LoadingButton text={"Reset Password"} />
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

export default ResetPassword;

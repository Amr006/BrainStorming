import { Box, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import "../Form.css";
import loginImg from "../../../../public/images/login.jpeg";
import Logo from "@/components/Logo/Logo";
import Head from "@/components/Head/Head";
import { SecondaryButton } from "@/MUIComponents/SecondaryButton/SecondaryButton";
import Link from "next/link";
import { FacebookRounded, LinkedIn } from "@mui/icons-material";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { FcGoogle } from "react-icons/fc";
import { SpecialIconButton } from "@/MUIComponents/SpecialIconButton/SpecialIconButton";
import Or from "@/components/Or/Or";
import { AuthButton } from "@/MUIComponents/AuthButton/AuthButton";
const Login = ({
  handleGoogleAuth,
  handleLinkedinAuth,
  handleFacebookAuth,
  formik,
}) => {
  return (
    <>
      <Box
        className={`flex jcc aic form_image`}
        sx={{ backgroundImage: `url(${loginImg.src})`, position: "relative" }}
      >
        <Box className={"overlay"}></Box>
        <Head
          align={"center"}
          h={"h3"}
          title={"Welcome Back"}
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
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Link
            href={process.env.NEXT_PUBLIC_FORGOTPASSWORD_PAGE}
            className={`forgot_password`}
          >
            <Typography variant="h6">Forgot Password ?</Typography>
          </Link>
          <LoadingButton text={"Login"} />
          <SecondaryButton fullWidth>
            <Link href={process.env.NEXT_PUBLIC_REGISTER_PAGE}>
              Create an Account ?
            </Link>
          </SecondaryButton>
        </Box>
        <Box className={`grid jcs aic`}>
          <Or />
          <Typography variant="h6" className="tac">
            Log In with
          </Typography>
        </Box>
        <Box className={`grid jcs aic g20`}>
          <AuthButton
            className={`flex jcfs aic g10`}
            onClick={handleGoogleAuth}
          >
            <FcGoogle />
            <Typography variant="h6">Log in with Google</Typography>
          </AuthButton>
          <AuthButton
            onClick={handleFacebookAuth}
            className={`flex jcfs aic g10`}
            sx={{ color: (theme) => theme.palette.facebook }}
          >
            <FacebookRounded />
            <Typography variant="h6">Log in with Facebook</Typography>
          </AuthButton>
          <AuthButton
            onClick={handleLinkedinAuth}
            className={`flex jcfs aic g10`}
            sx={{ color: (theme) => theme.palette.linkedin }}
          >
            <LinkedIn />
            <Typography variant="h6">Log in with Linkedin</Typography>
          </AuthButton>
        </Box>
      </Box>
    </>
  );
};

export default Login;

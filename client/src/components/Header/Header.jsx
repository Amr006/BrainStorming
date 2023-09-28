import React, { useContext } from "react";
import {
  AppBar,
  Container,
  useMediaQuery,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { AccountCircle, Menu, SearchOutlined } from "@mui/icons-material";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import Link from "next/link";
import { DrawerContext } from "@/context/DrawerContext";
import { SecondaryButton } from "@/MUIComponents/SecondaryButton/SecondaryButton";
import { SpecialIconButton } from "@/MUIComponents/SpecialIconButton/SpecialIconButton";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Header = () => {
  const smallSize = useMediaQuery("(max-width:768px)");
  const {toggleDrawer} = useContext(DrawerContext);
  const { signed, user_id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = () => {
    router.push("/");
    dispatch(logOut());
  };
  return (
    <AppBar
      className={`${styles.header}`}
    >
      <Container
        sx={{ height: { lg: "70px", md: "60px", sm: "50px", xs: "40px" } }}
        className={`flex jcsb aic g30 ${styles.header_contain} header_wrapped`}
      >
        <Logo title={true} color={"#fff"} />
        {smallSize ? (
          <SpecialIconButton
            onClick={toggleDrawer}
            sx={{ color: (theme) => theme.palette.primary.main }}
            data-testid={"menu_button"}
          >
            <Menu />
          </SpecialIconButton>
        ) : (
          <Box className={`flex jcfe aic g30`}>
            <List
              sx={{ padding: 0 }}
              className={`flex jcfe aic g30 ${styles.list}`}
            >
              <ListItem sx={{ padding: 0 }}>
                <Link href={`${process.env.NEXT_PUBLIC_HOME_PAGE}`}>
                  <ListItemButton>
                    <ListItemText primary={"Home"} />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem sx={{ padding: 0 }}>
                <Link href={`${process.env.NEXT_PUBLIC_TEAMS_PAGE}`}>
                  <ListItemButton>
                    <ListItemText primary={"Teams"} />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <Link href={`${process.env.NEXT_PUBLIC_ABOUT_PAGE}`}>
                  <ListItemButton>
                    <ListItemText primary={"About"} />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
            {signed ? (
              <>
                <Link
                  href={`${process.env.NEXT_PUBLIC_PROFILE_PAGE}/${user_id}`}
                >
                  <SpecialIconButton
                    data-testid={"user_button"}
                    sx={{ color: (theme) => theme.palette.primary.main }}
                    component={motion.button}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AccountCircle />
                  </SpecialIconButton>
                </Link>
                <SecondaryButton
                  onClick={handleLogOut}
                  data-testid={"auth_button"}
                  component={motion.button}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  Log Out
                </SecondaryButton>
              </>
            ) : (
              <>
                <SecondaryButton
                  component={motion.button}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={"auth_button"}
                >
                  <Link href={`${process.env.NEXT_PUBLIC_LOGIN_PAGE}`}>
                    Login
                  </Link>
                </SecondaryButton>

                <SecondaryButton
                  component={motion.button}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={"auth_button"}
                >
                  <Link href={`${process.env.NEXT_PUBLIC_REGISTER_PAGE}`}>
                    Register
                  </Link>
                </SecondaryButton>
              </>
            )}
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;

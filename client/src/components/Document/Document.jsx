import React from "react";
import Image from "next/image";
import pdfImg from "../../../public/images/pdf.png";
import powerPointImg from "../../../public/images/pptx.png";
import excelImg from "../../../public/images/xlsx.png";
import wordImg from "../../../public/images/doc.png";
import { Box, IconButton, Typography } from "@mui/material";
import { ChosenDataViewContext } from "@/context/ChosenDataViewContext";
import { useContext } from "react";
import styles from "./Document.module.css";
import { DeleteRounded, Preview } from "@mui/icons-material";
import { RedIconButton } from "@/MUIComponents/RedIconButton/RedIconButton";
import { SparkModalContext } from "@/context/SparkModalContext";

const Document = ({
  posting,
  i,
  overlay,
  str,
  handleDataShow,
  fileType,
  doc,
  isShow,
  modal,
}) => {
  const { setDataType, toggleDataViewer } = useContext(ChosenDataViewContext);
  const { handleRemoveDocFile } = useContext(SparkModalContext);
  const handleDataView = () => {
    toggleDataViewer();
    setDataType("docs");
  };
  return posting ? (
    <Box
      sx={{
        "&:after": overlay && { content: str },
      }}
      className={`grid aic jcs g10 ${styles.image_box}`}
    >
      <Box
        sx={{
          borderColor: (theme) =>
            fileType === "pdf"
              ? theme.palette.pdf
              : fileType === "xlsx"
              ? theme.palette.excel
              : fileType === "pptx"
              ? theme.palette.power_point
              : theme.palette.word,
          borderWidth: "2px",
          borderStyle: "solid",
          position: "relative",
        }}
        className={`flex jcfs aic g5 ${styles.file}`}
        onClick={
          !modal ? handleDataView : () => window.open(URL.createObjectURL(doc))
        }
      >
        <Box
          className={`${overlay && "overlay"} ${overlay && styles.overlay}`}
        />
        {fileType === "pdf" ? (
          <Image src={pdfImg} width={100} height={100} alt={"document"} />
        ) : fileType === "xlsx" ? (
          <Image src={excelImg} width={100} height={100} alt={"document"} />
        ) : fileType === "pptx" ? (
          <Image
            src={powerPointImg}
            width={100}
            height={100}
            alt={"document"}
          />
        ) : (
          <Image src={wordImg} width={100} height={100} alt={"document"} />
        )}
        <Typography variant="h6">
          {doc.name.length > 10
            ? doc.name.slice(0, 10) + "." + fileType
            : doc.name}
        </Typography>
        {isShow ||
          (modal && (
            <IconButton onClick={() => window.open(URL.createObjectURL(doc))}>
              <Preview
                sx={{
                  "&:hover": {
                    color: (theme) => theme.palette.primary.main,
                    cursor: "pointer",
                  },
                }}
              />
            </IconButton>
          ))}
      </Box>
      {modal && (
        <RedIconButton
          onClick={() => {
            handleRemoveDocFile(i);
            toggleDataViewer();
          }}
        >
          <DeleteRounded />
          <Typography variant="h6">Remove</Typography>
        </RedIconButton>
      )}
    </Box>
  ) : (
    <Box
      sx={{
        "&:after": overlay && { content: str },
      }}
      className={`grid aic jcs ${styles.image_box}`}
    >
      <Box
        sx={{
          borderColor: (theme) =>
            fileType === "pdf"
              ? theme.palette.pdf
              : fileType === "xlsx"
              ? theme.palette.excel
              : fileType === "pptx"
              ? theme.palette.power_point
              : theme.palette.word,
          borderWidth: "2px",
          borderStyle: "solid",
          position: "relative",
        }}
        className={`flex jcfs aic g5 ${styles.file}`}
        onClick={handleDataShow}
      >
        <Box
          className={`${overlay && "overlay"} ${overlay && styles.overlay}`}
        />
        {fileType === "pdf" ? (
          <Image src={pdfImg} width={100} height={100} alt={"document"} />
        ) : fileType === "xlsx" ? (
          <Image src={excelImg} width={100} height={100} alt={"document"} />
        ) : fileType === "pptx" ? (
          <Image
            src={powerPointImg}
            width={100}
            height={100}
            alt={"document"}
          />
        ) : (
          <Image src={wordImg} width={100} height={100} alt={"document"} />
        )}
        <Typography variant="h6">
          File-{i}.{fileType}
        </Typography>
        {isShow && (
          <IconButton onClick={() => window.open(doc)}>
            <Preview
              sx={{
                "&:hover": {
                  color: (theme) => theme.palette.primary.main,
                  cursor: "pointer",
                },
              }}
            />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Document;
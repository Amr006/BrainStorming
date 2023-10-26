import React from "react";
import { SparkModalContext } from "@/context/SparkModalContext";
import { useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import Head from "../Head/Head";
import styles from "./Models.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ExtensionsContext } from "@/context/ExtensionsContext";
import { MainButton } from "@/MUIComponents/MainButton/MainButton";
import Form from "../Form/Form";
import { ChosenDataViewContext } from "@/context/ChosenDataViewContext";
import { Box, Modal, Typography } from "@mui/material";
import { RedIconButton } from "@/MUIComponents/RedIconButton/RedIconButton";
import { Close, DeleteRounded } from "@mui/icons-material";
import SpecialImage from "../SpecialImage/SpecialImage";
import { MainIconButton } from "@/MUIComponents/MainIconButton/MainIconButton";
import { Carousel } from "react-responsive-carousel";
import Document from "../Document/Document";

const SparkModal = ({ type }) => {
  const {
    chooseFiles,
    handleToggleChooseFiles,
    handleFiles,
    handleToggleDeleteSparkModal,
    handleToggleUpdateSparkModal,
    showDeleteSparkModal,
    imageFiles,
    docFiles,
    audioFiles,
    handleRemoveImageFile,
    handleRemoveAudioFile,
    showUpdateSparkModal,
  } = useContext(SparkModalContext);
  const {
    dataType,
    openDataViewer,
    toggleDataViewer,
    openDataShow,
    showAudioFiles,
    showDocFiles,
    toggleDataShow,
    showImageFiles,
  } = useContext(ChosenDataViewContext);
  const { audios, images, docs } = useContext(ExtensionsContext);
  return type === "upload_file" ? (
    <Modal
      open={chooseFiles}
      onClose={handleToggleChooseFiles}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={`flex jcc aic`}
    >
      <Box
        className={`grid jcs aic g10 ${styles.modal_box} ${styles.avatar_box}`}
      >
        <Head
          color={"#000"}
          align={"center"}
          h={"h4"}
          title={"Choose Files And Images"}
          nowrap={true}
        />
        <FileUploader
          multiple={true}
          types={[...audios, ...images, ...docs]}
          hoverTitle={"Drop here"}
          onSelect={handleToggleChooseFiles}
          handleChange={handleFiles}
        />
        <MainButton onClick={handleToggleChooseFiles}>Done</MainButton>
      </Box>
    </Modal>
  ) : type === "delete_spark" ? (
    <Modal
      open={showDeleteSparkModal}
      onClose={handleToggleDeleteSparkModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`grid jcs aic g10 ${styles.modal_box}`}>
        <Form type={type} />
      </Box>
    </Modal>
  ) : type === "view_data" ? (
    <Modal
      onClose={toggleDataViewer}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={openDataViewer}
      className={`flex jcc aic`}
    >
      <Box className={`grid jcs aifs g30 ${styles.chosen_data_viewer_box}`}>
        {dataType === "images" ? (
          <>
            <Head
              align={"center"}
              color={"#000"}
              h={"h3"}
              title={"Chosen Images"}
              nowrap={true}
            />
            <Box className={`grid jcs aifs g20 ${styles.data_viewer}`}>
              {imageFiles.map((d, i) => (
                <Box key={i} className={`grid jcs aic g10`}>
                  <SpecialImage img={URL.createObjectURL(d)} posting={true} />
                  <RedIconButton
                    onClick={() => {
                      handleRemoveImageFile(i);
                      toggleDataViewer();
                    }}
                  >
                    <DeleteRounded />
                    <Typography variant="h6">Remove</Typography>
                  </RedIconButton>
                </Box>
              ))}
            </Box>
          </>
        ) : dataType === "docs" ? (
          <>
            <Head
              align={"center"}
              h={"h4"}
              color={"#000"}
              title={"Chosen Documents"}
              nowrap={true}
            />
            <Box className={`grid jcs aifs g20 ${styles.data_viewer}`}>
              {docFiles.map((doc, i) => {
                const fileType = doc.name.split(".")[
                  doc.name.split(".").length - 1
                ];
                return (
                  <Document
                    posting={true}
                    doc={doc}
                    fileType={fileType}
                    i={i}
                    isShow={false}
                    modal={true}
                  />
                );
              })}
            </Box>
          </>
        ) : (
          <>
            <Head
              color={"#000"}
              align={"center"}
              h={"h3"}
              title={"Chosen Audios"}
              nowrap={true}
            />
            <Box className={`grid jcs aifs g20 ${styles.data_viewer}`}>
              {audioFiles.map((d, i) => (
                <Box
                  key={i}
                  className={`grid jcs aife g10`}
                  sx={{ height: "100%" }}
                >
                  <audio src={URL.createObjectURL(d)} loading="lazy" controls />
                  <RedIconButton
                    onClick={() => {
                      handleRemoveAudioFile(i);
                      toggleDataViewer();
                    }}
                  >
                    <DeleteRounded />
                    <Typography variant="h6">Remove</Typography>
                  </RedIconButton>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  ) : type === "show_data" ? (
    <Modal
      onClose={toggleDataShow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={openDataShow}
      className={`flex jcc aic`}
    >
      <Box
        className={`grid jcs aifs g30 ${
          dataType === "images"
            ? styles.modal_carousel
            : styles.chosen_data_viewer_box
        }`}
      >
        {dataType === "docs" ? (
          <>
            <Head
              color={"#000"}
              align={"center"}
              h={"h4"}
              title={"Documents"}
              nowrap={true}
            />
            <Box className={`grid jcs aifs g20 ${styles.data_viewer}`}>
              {showDocFiles.map((doc, i) => {
                const fileType = doc.split(".")[doc.split(".").length - 1];
                return (
                  <Document
                    doc={doc}
                    key={i}
                    fileType={fileType}
                    i={i}
                    isShow={true}
                    modal={true}
                  />
                );
              })}
            </Box>
          </>
        ) : dataType === "audios" ? (
          <>
            <Head
              color={"#000"}
              align={"center"}
              h={"h3"}
              title={"Chosen Audios"}
              nowrap={true}
            />
            <Box className={`grid jcs aifs g20 ${styles.data_viewer}`}>
              {showAudioFiles.map((d, i) => (
                <Box
                  key={i}
                  className={`grid jcs aife g10`}
                  sx={{ height: "100%" }}
                >
                  <audio src={d} loading="lazy" controls />
                </Box>
              ))}
            </Box>
          </>
        ) : (
          dataType === "images" && (
            <>
              <MainIconButton onClick={toggleDataShow}>
                <Close />
              </MainIconButton>
              <Carousel
                showThumbs={false}
                selectedItem={true}
                infiniteLoop={true}
              >
                {showImageFiles.map((img, i) => (
                  <SpecialImage key={i} img={img} slider={true} />
                ))}
              </Carousel>
            </>
          )
        )}
      </Box>
    </Modal>
  ) : (
    type === "update_spark" && (
      <Modal
        open={showUpdateSparkModal}
        onClose={handleToggleUpdateSparkModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`flex jcc aic`}
      >
        <Box className={`grid jcs aic g10 `}>
          <Form type={type} />
        </Box>
      </Modal>
    )
  );
};

export default SparkModal;

"use client";

import { useContext } from "react";
import { createContext, useState } from "react";
import { ExtensionsContext } from "./ExtensionsContext";

export const SparkModalContext = createContext();

export const SparkModalProvider = ({ children }) => {
  const [chooseFiles, setChooseFiles] = useState(false);
  const [showDeleteSparkModal, setShowDeleteSparkModal] = useState(false);
  const [showUpdateSparkModal, setShowUpdateSparkModal] = useState(false);
  const { audios, images, docs } = useContext(ExtensionsContext);
  const [audioFiles, setAudioFiles] = useState([]);
  const [docFiles, setDocFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [record, setRecord] = useState(null);
  const [sparkId, setSparkId] = useState(null);
  const [sparkIndex, setSparkIndex] = useState(null);
  const [updateIdea, setUpdateIdea] = useState(null);
  const [updateDescription, setUpdateDescription] = useState(null);

  const handleToggleChooseFiles = () => {
    setChooseFiles(!chooseFiles);
  };

  const handleFiles = (files) => {
    Object.keys(files).map((key) => {
      let fileType;
      fileType = files[key].name.split(".")[
        files[key].name.split(".").length - 1
      ];
      if (audios.includes(fileType)) {
        setAudioFiles((prev) => [...prev, files[key]]);
      } else if (images.includes(fileType)) {
        setImageFiles((prev) => [...prev, files[key]]);
      } else if (docs.includes(fileType)) {
        setDocFiles((prev) => [...prev, files[key]]);
      }
    });
  };

  const handleRemoveImageFile = (index) => {
    imageFiles.splice(index, 1);
    setImageFiles(imageFiles);
  };

  const handleRemoveDocFile = (index) => {
    docFiles.splice(index, 1);
    setDocFiles(docFiles);
  };

  const handleRemoveAudioFile = (index) => {
    audioFiles.splice(index, 1);
    setAudioFiles(audioFiles);
  };

  const handleToggleDeleteSparkModal = () => {
    setShowDeleteSparkModal(!showDeleteSparkModal);
  };
  const handleToggleUpdateSparkModal = () => {
    setShowUpdateSparkModal(!showUpdateSparkModal);
  };
  const handleResetData = () => {
    setImageFiles([]);
    setDocFiles([]);
    setAudioFiles([]);
    setRecord(null);
  };
  return (
    <SparkModalContext.Provider
      value={{
        chooseFiles,
        handleToggleChooseFiles,
        handleFiles,
        handleRemoveImageFile,
        handleRemoveDocFile,
        handleRemoveAudioFile,
        handleToggleDeleteSparkModal,
        handleToggleUpdateSparkModal,
        handleResetData,
        showUpdateSparkModal,
        showDeleteSparkModal,
        setUpdateIdea,
        updateIdea,
        setUpdateDescription,
        updateDescription,
        audioFiles,
        docFiles,
        imageFiles,
        sparkId,
        sparkIndex,
        setSparkId,
        setSparkIndex,
        record,
        setAudioFiles,
        setDocFiles,
        setImageFiles,
        setRecord,
      }}
    >
      {children}
    </SparkModalContext.Provider>
  );
};

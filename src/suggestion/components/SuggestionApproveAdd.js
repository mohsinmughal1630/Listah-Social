import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Touchable } from "../../common";
import CheckIcon from "../../assets/icons/edit-check-icon.svg";
import CloseIcon from "../../assets/icons/edit-close-icon.svg";
import * as Colors from "../../config/colors";
import LoadingImage from "../../common/LoadingImage";
import { AppColors, AppImages, normalized } from "../../util/AppConstant";
import VideoPlayerModal from "../../common/VideoPlayerModal";
import UploadIcon from "../../assets/icons/edit-upload-icon.svg";

/* =============================================================================
<SuggestionApproveAdd />
============================================================================= */
const SuggestionApproveAdd = ({ change, postTitle, loading, onSubmit }) => {
  const navigation = useNavigation();
  const item = change?.item;
  const [openVideoModal, setOpenVideoModal] = useState("");

  const _handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <View horizontal style={styles.infoContainer}>
        <Text bold>Suggestion Type: {change?.type}</Text>
        <Text bold>List Title: {postTitle}</Text>
      </View>
      <View horizontal style={styles.item}>
        {item?.image || item?.videoObj?.thumbnail ? (
          <View
            style={{
              height: normalized(70),
              width: normalized(60),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item?.videoObj?.thumbnail ? (
              <TouchableOpacity
                onPress={() => {
                  setOpenVideoModal(item?.videoObj?.video);
                }}
                activeOpacity={1}
              >
                <LoadingImage
                  isDisable={true}
                  source={{
                    uri: item?.videoObj?.thumbnail,
                  }}
                  style={styles.img}
                />

                <Image source={AppImages.playbutton} style={styles.playIcon} />
              </TouchableOpacity>
            ) : (
              <LoadingImage
                isDisable={true}
                source={{ uri: item?.image }}
                style={styles.img}
              />
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.unSelectedPic}
            onPress={() => {}}
            activeOpacity={1}
          >
            <UploadIcon />
          </TouchableOpacity>
        )}

        <Text sm medium>
          {item?.name}
        </Text>
        <Text sm light>
          {item?.description}
        </Text>
      </View>
      <View horizontal center>
        {loading ? (
          <ActivityIndicator color={Colors.primary} size="small" />
        ) : (
          <Touchable style={styles.actionBtn} onPress={onSubmit}>
            <CheckIcon stroke="#6d14c4" />
          </Touchable>
        )}
        <Touchable style={styles.actionBtn} onPress={_handleGoBack}>
          <CloseIcon stroke="#6d14c4" />
        </Touchable>
      </View>
      {openVideoModal ? (
        <VideoPlayerModal
          item={{ url: openVideoModal }}
          onClose={() => {
            setOpenVideoModal("");
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "space-between",
  },
  item: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#999",
    justifyContent: "space-between",
  },
  img: {
    width: normalized(50),
    height: normalized(50),
    borderRadius: normalized(50 / 2),
    marginVertical: 0,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalized(3),
  },
  actionBtn: {
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  playIcon: {
    height: normalized(15),
    width: normalized(15),
    position: "absolute",
    alignSelf: "center",
    top: normalized(20),
  },
  unSelectedPic: {
    borderColor: AppColors.blue.navy,
    borderWidth: 1,
    borderRadius: normalized(50 / 2),
    height: normalized(50),
    width: normalized(50),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SuggestionApproveAdd;

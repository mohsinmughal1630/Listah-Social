import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import ImageResizer from "react-native-image-resizer";
import FireStore from "@react-native-firebase/storage";

import {
  View,
  Button,
  Container,
  Content,
  TextInput,
  ImagePickerButton,
} from "../../common";
import EditProfileHeader from "../components/EditProfileHeader";
import * as Colors from "../../config/colors";

import { getProfile, getLoading } from "../redux/selectors";
import { updateProfile as updateProfileAction } from "../redux/actions";
import { Theme_Mode } from "../../util/Strings";
import { darkModeColors, lightModeColors } from "../../util/AppConstant";

/* =============================================================================
<EditProfileScreen />
============================================================================= */
const EditProfileScreen = ({ profile, updateProfile }) => {
  const themeType = useSelector((AppState) => AppState.sliceReducer.themeType);

  const photoUrl = profile?.profileImage;
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState(profile?.username);
  const [loading, setLoading] = useState(false);

  const _handleSubmit = async () => {
    if (profileImage) {
      setLoading(true);
      const compressedImage = await ImageResizer.createResizedImage(
        profileImage.uri,
        1000,
        1000,
        "PNG",
        100,
        0
      );
      const storageRef = await FireStore()
        .ref("profile_pics")
        .child(profileImage.fileName);

      await storageRef.putFile(compressedImage.uri);
      const uploadImgUrl = await storageRef.getDownloadURL();

      await updateProfile({
        username,
        profileImage: uploadImgUrl,
      });
      setLoading(false);
    } else {
      setLoading(true);
      await updateProfile({
        username,
        profileImage: photoUrl,
      });
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        backgroundColor:
          themeType == Theme_Mode.isDark
            ? darkModeColors.background
            : lightModeColors.background,
      }}
    >
      <EditProfileHeader photoUrl={photoUrl} photoUrlLocalUrl={profileImage} />
      <Content
        contentContainerStyle={{
          ...styles.content,
          backgroundColor:
            themeType == Theme_Mode.isDark
              ? darkModeColors.background
              : lightModeColors.background,
        }}
        containerStyle={{
          backgroundColor:
            themeType == Theme_Mode.isDark
              ? darkModeColors.background
              : lightModeColors.background,
        }}
      >
        <TextInput
          value={username}
          label="User Name"
          onChange={setUsername}
          contentContainerStyle={{
            backgroundColor:
              themeType == Theme_Mode.isDark
                ? darkModeColors.background
                : lightModeColors.background,
          }}
          inputStyle={{
            ...styles.input,
            color:
              themeType == Theme_Mode.isDark
                ? darkModeColors.text
                : lightModeColors.text,
          }}
          labelStyle={{
            color:
              themeType == Theme_Mode.isDark
                ? darkModeColors.text
                : lightModeColors.text,
          }}
        />
        <ImagePickerButton onImageSelect={setProfileImage} />
      </Content>
      <View center style={styles.btnContainer}>
        <Button
          loading={loading}
          title="Update Profile"
          onPress={_handleSubmit}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 30,
  },
  itemInfoContainer: {
    marginLeft: 25,
  },
  btnContainer: {
    marginBottom: 20,
  },
  imgBtnContainer: {
    marginVertical: 20,
  },
  imgBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "#fff",
  },
  imgBtnTxt: {
    color: Colors.primary,
  },
});

const mapStateToProps = (state) => ({
  profile: getProfile(state),
  loading: getLoading(state),
});

const mapDispatchToProps = {
  updateProfile: updateProfileAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);

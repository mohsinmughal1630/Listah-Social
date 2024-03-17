import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Alert, StyleSheet } from "react-native";

import {
  View,
  Text,
  Button,
  Content,
  Container,
  StackHeader,
  Touchable,
} from "../../common";
import * as Colors from "../../config/colors";

import { getPostsById as getHomePostById } from "../../home/redux/selectors";
import { getPostsById as getDiscoverPostById } from "../../discover/redux/selectors";
import { Theme_Mode } from "../../util/Strings";
import {
  AppColors,
  darkModeColors,
  lightModeColors,
} from "../../util/AppConstant";
import { setIsAlertShow } from "../../redux/action/AppLogics";

/* =============================================================================
<SelectSuggestionScreen />
============================================================================= */
const SelectSuggestionScreen = ({ mpost, navigation, route }) => {
  const dispatch = useDispatch();
  const themeType = useSelector((AppState) => AppState.sliceReducer.themeType);
  const post = route?.params?.post;
  const [selected, setSelected] = useState();
  const items = post?.items;
  const authorId = post?.author?.userId;
  const postId = post?.id;
  const postTitle = post?.title;
  useEffect(() => {
    // console.log("printPost999 - > ", post, authorId);
  }, []);

  const _handleSelect = (id) => setSelected(id);

  const _handleChangePress = () => {
    if (selected === 0 || selected) {
      const item = items.filter((i) => i?.id === selected)[0];
      navigation.navigate("SuggestionChange", {
        postId,
        postTitle,
        item,
        authorId,
      });
    } else {
      dispatch(
        setIsAlertShow({ value: true, message: "Please Select an Item" })
      );
    }
  };

  const _handleChallengeClicked = () => {
    navigation.navigate("AddChalleenge", { post: post });
  };

  const _handleAddPress = () =>
    navigation.navigate("SuggestionAdd", { postId, postTitle, authorId });

  const _handleDeletePress = () => {
    if (selected === 0 || selected) {
      const item = items.filter((i) => i?.id === selected)[0];
      navigation.navigate("SuggestionDelete", {
        postId,
        postTitle,
        item,
        authorId,
      });
    } else {
      Alert.alert("Please Select an Item");
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
      <StackHeader title={`What would you like to${"\n"}suggest?`} />
      <Content
        containerStyle={{
          backgroundColor:
            themeType == Theme_Mode.isDark
              ? darkModeColors.background
              : lightModeColors.background,
        }}
        contentContainerStyle={{
          backgroundColor:
            themeType == Theme_Mode.isDark
              ? darkModeColors.background
              : lightModeColors.background,
        }}
      >
        <View horizontal style={styles.header}>
          <Button
            style={{ flex: 0.3, marginEnd: 5, paddingHorizontal: 2 }}
            btnTxtStyles={{ fontSize: 11 }}
            title="Change"
            onPress={_handleChangePress}
          />
          <Button
            style={{ flex: 0.3, marginHorizontal: 5, paddingHorizontal: 2 }}
            btnTxtStyles={{ fontSize: 11 }}
            title="Add"
            onPress={_handleAddPress}
          />
          <Button
            style={{ flex: 0.3, marginStart: 5, paddingHorizontal: 2 }}
            btnTxtStyles={{ fontSize: 11 }}
            title="Delete"
            onPress={_handleDeletePress}
          />
        </View>
        <Button
          style={{
            width: 120,
            height: 50,
            marginEnd: 5,
            paddingHorizontal: 2,
            alignSelf: "center",
            marginVertical: 40,
          }}
          btnTxtStyles={{ fontSize: 11 }}
          title="Challenge"
          onPress={_handleChallengeClicked}
        />

        <View horizontal style={styles.itemsContainer}>
          {items?.length
            ? items.map((item) => {
                return (
                  <Touchable
                    key={item?.id}
                    style={[
                      styles.indexCounter,
                      selected === item?.id && styles.itemCounterSelected,
                    ]}
                    onPress={() => _handleSelect(item?.id)}
                  >
                    <View
                      style={{
                        ...styles.indexCounter,
                        borderColor:
                          selected === item?.id
                            ? AppColors.blue.navy
                            : themeType == Theme_Mode.isDark
                            ? darkModeColors.text
                            : lightModeColors.text,
                      }}
                    >
                      <Text sm bold primary>
                        {item?.id === 0 ? 1 : item?.id + 1}
                      </Text>
                    </View>
                  </Touchable>
                );
              })
            : null}
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 40,
    justifyContent: "space-around",
  },
  itemsContainer: {
    justifyContent: "space-around",
  },
  indexCounter: {
    width: 30,
    height: 30,
    borderWidth: 1,
    paddingTop: 2,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  itemCounterSelected: {
    marginBottom: 10,
    borderColor: Colors.primary,
  },
});

const mapStateToProps = (state, { route }) => {
  const { type, id } = route?.params;
  const mpost =
    type === "home"
      ? getHomePostById(state, { id })
      : type === "discovery"
      ? getDiscoverPostById(state, { id })
      : {};

  return { mpost };
};

export default connect(mapStateToProps)(SelectSuggestionScreen);

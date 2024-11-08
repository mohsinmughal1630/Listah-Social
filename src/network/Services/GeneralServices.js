import { Platform } from "react-native";
import ThreadManager from "../../ChatModule/ThreadManger";
import storage from "@react-native-firebase/storage";

export const uploadMedia = async (uri, storageRef, onComplete) => {
  const filename = generateFilename(uri);
  const uploadUri = normalizeUri(uri);
  const ref = storage().ref(storageRef).child(filename);
  const task = ref.putFile(uploadUri);
  task.on("state_changed", (snapshot) => {});
  try {
    await task
      .then((item) => {
        ref.getDownloadURL().then((url) => {
          onComplete(url);
        });
      })
      .catch((error) => {
        onComplete(null);
      });
  } catch (e) {
    onComplete(null);
  }
};

const generateFilename = (uri) => {
  const suffix = uri.substring(uri.lastIndexOf("/") + 1);
  return `${ThreadManager.instance.makeid(6)}${suffix}`;
};
const normalizeUri = (uri) =>
  Platform.OS === "ios" ? uri.replace("file://", "") : uri;

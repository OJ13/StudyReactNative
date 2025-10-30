import notifee from "@notifee/react-native";
import { ExpoConfig } from "expo/config";

module.exports = ({config}: { config: ExpoConfig}) => {
  {
    plugins: [
       "@notifee/react-native"
    ]
  }
}
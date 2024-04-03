import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window')
const Metrics={
  ScreenWidth:width,
  ScreenHeight:height,  
}
export default Metrics


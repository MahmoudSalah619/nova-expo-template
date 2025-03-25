import { StyleSheet } from "react-native";
import METRICS from "@/constants/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: METRICS.screenWidth,
  },
  backgroundImage: {
    flex: 1,
    zIndex: -1,
  },
  logo: {
    width: METRICS.screenWidth * 0.3 /* 30% of the viewport width */,
    height: METRICS.screenHeight * 0.135 /* 13.5% of the viewport height */,
    alignSelf: "center",
    borderRadius: 24,
    marginBottom: 60,
  },
  iconContainer: {
    padding: 24,
    alignSelf: "flex-end",
  },
  bgImgContainer: {
    width: "70%",
    height: "100%",
    position: "absolute",
    right: 0,
  },
  bgImg: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    // paddingTop: 44,
    alignItems: "center",
    gap: 4,
  },
  paddingHorizontal0: {
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  goBackBtn: {
    zIndex: 2,
  },
});

export default styles;

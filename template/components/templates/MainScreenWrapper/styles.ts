import { StyleSheet } from "react-native";
import METRICS from "@/constants/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: METRICS.screenWidth,
    // marginTop: 16,
  },
  hasLogo: {
    // paddingTop: 40,
  },
  logoImg: {
    width: 120,
    height: 40,
    objectFit: "contain",
    marginHorizontal: 8,
  },

  innerConatiner: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
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
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    position: "absolute",
    top: 20,
    height: 32,
    zIndex: 1,
    width: "100%",
  },

  scrollContainer: {
    flexGrow: 1,
  },
  goBackBtn: {
    zIndex: 2,
  },
  extraSpace: {
    height: 50,
  },
});

export default styles;

export default function getShadowStyle({
  radius = 5,
  opacity = 0.2,
  offsetY = 2,
} = {}) {
  return {
    shadowColor: "#000",
    shadowOpacity: opacity,
    shadowOffset: {
      width: 0,
      height: offsetY,
    },
    shadowRadius: radius,
    elevation: radius * 0.5,
  };
}

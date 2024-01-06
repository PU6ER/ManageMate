import Lottie from "lottie-react";
import loader from "../../loaderLottie.json";

const Loader = ({ style }: { style: React.CSSProperties | undefined }) => {
  return <Lottie loop={true} animationData={loader} style={style} />;
};

export default Loader;

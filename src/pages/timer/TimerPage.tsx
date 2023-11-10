import { useTimer } from "react-timer-hook";
import Timer from "../../components/timer/Timer";
import { useSidebar } from "../../hooks/useSidebar";

const TimerPage = () => {
  const { sidebar } = useSidebar();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <div className="">
      {sidebar[0] === "timer" && <Timer expiryTimestamp={time} />}
    </div>
  );
};

export default TimerPage;

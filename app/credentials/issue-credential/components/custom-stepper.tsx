import { Stepper } from "react-form-stepper";
import { usePathname } from "next/navigation";

const StepStyleDTO = {
  activeBgColor: "#1d70b8", // Green background for active step
  activeTextColor: "#FFFFFF", // White text for active step
  completedBgColor: "#1d70b8a6", // Blue background for completed steps
  completedTextColor: "#FFFFFF", // White text for completed steps
  inactiveBgColor: "#DDDDDD", // Gray background for inactive steps
  inactiveTextColor: "#666666", // Dark gray text for inactive steps
  size: "2em", // Adjust step circle size
  circleFontSize: "1em", // Font size inside step circle
  labelFontSize: "1em", // Font size of step labels
  borderRadius: "50%", // Make step circles round
  fontWeight: "",
};

const CustomStepper = () => {
  const pathname = usePathname();
  return (
    <Stepper
      styleConfig={StepStyleDTO}
      steps={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]}
      activeStep={
        pathname === "/credentials/issue-credential/details"
          ? 1
          : pathname === "/credentials/issue-credential/preview"
          ? 2
          : 0
      }
    />
  );
};

export default CustomStepper;

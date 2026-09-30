import { cn } from "@/src/lib/utils";
import { Check } from "lucide-react";

// interface ProgressStepperProps {
//   steps: Array<{
//     id: string,
//     label: string,
//   }>;
//   currentStep: number;
//   onStepClick?: (index: number) => void;
// }

const ProgressStepper = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="hidden sm:block">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => onStepClick && onStepClick(index)}
              >
                <div
                  className={cn(
                    "rounded-full h-8 w-8 flex items-center justify-center z-10 transition-all",
                    isCompleted
                      ? "bg-green-600"
                      : isCurrent
                      ? "bg-green-500 ring-4 ring-green-100"
                      : "bg-gray-200"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isCurrent ? "text-white" : "text-gray-600"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isCompleted
                      ? "text-green-600"
                      : isCurrent
                      ? "text-green-700"
                      : "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;

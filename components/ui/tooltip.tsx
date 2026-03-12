import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>>((props, ref) => (
  <TooltipPrimitive.Content ref={ref} sideOffset={4} className="z-50 overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-100" {...props} />
));
TooltipContent.displayName = "TooltipContent";

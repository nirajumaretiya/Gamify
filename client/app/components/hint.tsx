"use client";


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import React from "react";
  

  interface HintProps{
    label:string;
    children:React.ReactNode;
    side?:"top" | "right" | "bottom" |"left";
    align?:"start"|"center"|"end";
  }

  export const Hint = ({label,children,side,align}:HintProps)  =>{
     return(
    <TooltipProvider>
        <Tooltip delayDuration={50}>
    <TooltipTrigger asChild>
            {children}
    </TooltipTrigger>
<TooltipContent side={side} align={align} className="bg-[#00021c44] text-white border border-white/5">
<p className="font-medium text-xs">
    {label} 
</p>

      </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    )
  }
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
type AccordionFaqsType = {
  id: number;
  name: string;
  text: string;
};
export default function AccordionFaqs(data: AccordionFaqsType) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className="text-sm lg:text-base text-gray-800 dark:text-p-dark">
            {data?.name}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <p className="text-xs lg:text-base text-gray-700 dark:text-s-dark">
            {data?.text}
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

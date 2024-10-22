import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  AccordionActions,
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
          {data?.name}
        </AccordionSummary>
        <AccordionDetails>{data?.text}</AccordionDetails>
        {/* <AccordionActions>gooz</AccordionActions> */}
      </Accordion>
    </div>
  );
}

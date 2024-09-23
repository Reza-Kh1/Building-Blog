import { AccordionDetails, AccordionSummary, Accordion, AccordionActions } from "@mui/material";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function AccordionFaqs() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          gooz
        </AccordionActions>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdDataSaverOn } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import { useState } from "react";

export default function Faqs() {
  const { register, handleSubmit } = useForm();
  const [accordion, setAccrodion] = useState([
    { name: "", id: 1, arry: [{ name: "", text: "", id: 1 }] },
  ]);
  const deleteAccordion = (id: number) => {
    const newAc = accordion.map((i) => {
      const test = i.arry.filter((filter) => filter.id !== id);
      i.arry = test;
      return i;
    });
    setAccrodion(newAc);
  };
  const addAccordion = (id: number) => {
    const number = Math.floor(Math.random() * 1000);
    const newAccordion = accordion.map((i) => {
      if (i.id === id) {
        i.arry.push({
          id: number,
          name: "",
          text: "",
        });
      }
      return i;
    });
    setAccrodion(newAccordion);
  };
  const insertAccordion = () => {
    const number = Math.floor(Math.random() * 1000);
    const newAc = [
      ...accordion,
      { name: "", id: number, arry: [{ name: "", text: "", id: 1 }] },
    ];
    setAccrodion(newAc);
  };
  const dropAccordion = (id: number) => {
    const newAc = accordion.filter((filter) => filter.id !== id);
    setAccrodion(newAc);
  };
  const submitHandler = (form: any) => {
    console.log(form, accordion);
  };
  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-3">
        <TextField
          fullWidth
          autoComplete="off"
          className="shadow-md"
          label={"متن همراه عنوان"}
          {...register("title")}
        />
        <TextField
          fullWidth
          autoComplete="off"
          className="shadow-md"
          label={"توضیحات بخش درباره ما"}
          rows={6}
          multiline
          {...register("description")}
        />
      </div>
      <span className="my-5 block font-semibold">سوالات متداول :</span>
      <div className="mb-5">
        {accordion.map((item, index) => (
          <Accordion key={index} className="">
            <AccordionSummary
              expandIcon={<IoIosArrowDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <div className="w-1/2">
                <TextField
                  fullWidth
                  autoComplete="off"
                  className="shadow-md"
                  label={"عنوان اصلی"}
                  value={item.name}
                  onChange={({ target }) => {
                    const newText = accordion.map((num) => {
                      if (num.id === item.id) {
                        num.name = target.value;
                      }
                      return num;
                    });
                    setAccrodion(newText);
                  }}
                />
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-5">
                {item.arry.map((i, indexs) => (
                  <div className="flex flex-col gap-2" key={indexs}>
                    <div className="flex items-center gap-3">
                      {item.arry.length === 1 ? null : (
                        <IconButton
                          onClick={() => deleteAccordion(i.id)}
                          className="text-xl !bg-red-700 !shadow-md hover:!text-gray-700 hover:!bg-gray-400 transition-all p-3 !text-white"
                        >
                          <i>
                            <MdClose />
                          </i>
                        </IconButton>
                      )}
                      <TextField
                        fullWidth
                        autoComplete="off"
                        className="shadow-md"
                        label={"عنوان"}
                        value={i.name}
                        onChange={({ target }) => {
                          const newText = accordion.map((num) => {
                            if (num.id === item.id) {
                              num.arry.map((ac) => {
                                if (ac.id === i.id) {
                                  ac.name = target.value;
                                }
                                return ac;
                              });
                            }
                            return num;
                          });
                          setAccrodion(newText);
                        }}
                      />
                    </div>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      className="shadow-md"
                      label={"توضیحات همراه عنوان"}
                      rows={4}
                      multiline
                      value={i.text}
                      onChange={({ target }) => {
                        const newText = accordion.map((num) => {
                          if (num.id === item.id) {
                            num.arry.map((ac) => {
                              if (ac.id === i.id) {
                                ac.text = target.value;
                              }
                              return ac;
                            });
                          }
                          return num;
                        });
                        setAccrodion(newText);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div></div>
            </AccordionDetails>
            <AccordionActions>
              <div className="w-full justify-between items-center flex">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addAccordion(item.id)}
                  endIcon={<FaPlus />}
                >
                  افزودن
                </Button>
                {accordion.length === 1 ? null : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dropAccordion(item.id)}
                    endIcon={<IoTrashBinSharp />}
                  >
                    حذف
                  </Button>
                )}
              </div>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={insertAccordion}
            endIcon={<FaPlus />}
          >
            افزودن آکاردیون
          </Button>
        </div>
        <div>
          <Button
            onClick={handleSubmit((data) => submitHandler(data))}
            className="mt-5"
            endIcon={<MdDataSaverOn />}
            color="success"
            variant="contained"
          >
            ذخیره کردن اطلاعات
          </Button>
        </div>
      </div>
    </div>
  );
}

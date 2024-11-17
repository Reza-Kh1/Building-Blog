"use client"
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImgTag from '../ImgTag/ImgTag';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            className='text-justify px-1'
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Typography>{children}</Typography>
            )}
        </div>
    );
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <section className='w-full flex flex-col md:flex-row gap-5 my-3 md:my-6'>
            <div className='w-full md:w-2/3 '>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        scrollButtons={true}
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="scrollable"
                    >
                        <Tab label="Item One" className='!text-xs !p-2 md:!text-base md:!p-3' />
                    </Tabs>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        با استفاده از اطلاعات جدید
                    </TabPanel>
                </Box>
            </div>
            <div className='w-full md:w-1/3'>
                <ImgTag src={"/8.jpg"} alt={"خدمات که ما ارائه میدهیم"} width={300} height={250} />
            </div>
        </section>
    );
}
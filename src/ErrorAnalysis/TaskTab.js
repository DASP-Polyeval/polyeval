import * as React from "react";
import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import SelectVariants from "./Selection";
import TableForMachineTranslaiton from "./TableForMachineTranslation";
import TableForTextClassification from "./TableForTextClassification";
import TableForOpenEndedGen from "./TableForOpenEndedGen";
import TableForSummarization from "./TableForSummarization";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <SelectVariants />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Text Classification" {...a11yProps(0)} />
          <Tab label="Machine Translation" {...a11yProps(1)} />
          <Tab label="Summarization" {...a11yProps(2)} />
          <Tab label="Open-ended Generation" {...a11yProps(3)} />
          {/* <Tab label="Token Classification" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>

      {/* Error Analysis Tab */}
      <CustomTabPanel value={value} index={0}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <TranslateButton /> */}
        </span>
        {/* Result Table */}
        <TableForTextClassification />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <TableForMachineTranslaiton />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TableForSummarization />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TableForOpenEndedGen />
        </CustomTabPanel>
    </Box>
  );
}

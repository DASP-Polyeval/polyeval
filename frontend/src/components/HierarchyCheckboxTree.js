import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const HierarchyCheckboxTree = ({ data, onSelectionChange }) => {
  // data is an object where each key is a parent and its value is an array of child values
  const [checked, setChecked] = useState({});
  const [openParents, setOpenParents] = useState({});

  // Initialize checked states and collapsed state for all parent items
  useEffect(() => {
    const initialChecked = {};
    const initialOpen = {};
    Object.keys(data).forEach((parent) => {
      initialChecked[parent] = { parent: false, children: {} };
      data[parent].forEach((child) => {
        initialChecked[parent].children[child] = false;
      });
      // Parent collapsed by default.
      initialOpen[parent] = false;
    });
    setChecked(initialChecked);
    setOpenParents(initialOpen);
  }, [data]);

  // Call onSelectionChange whenever 'checked' state updates
  useEffect(() => {
    if (onSelectionChange) {
      const selected = [];
      Object.keys(checked).forEach((parent) => {
        Object.entries(checked[parent].children)
          .filter(([child, isChecked]) => isChecked)
          .forEach(([child]) => selected.push(child));
      });

      onSelectionChange(selected);
    }
  }, [checked, onSelectionChange]);

  // When a parent is toggled, update its state and also set all its children accordingly.
  const handleParentToggle = (parent) => {
    setChecked((prev) => {
      const parentChecked = !prev[parent].parent;
      const updatedChildren = {};
      Object.keys(prev[parent].children).forEach((child) => {
        updatedChildren[child] = parentChecked;
      });
      return {
        ...prev,
        [parent]: {
          parent: parentChecked,
          children: updatedChildren,
        },
      };
    });
  };

  // When a child is toggled, update its state and then recalc the parent's state.
  const handleChildToggle = (parent, child) => {
    setChecked((prev) => {
      const newChildValue = !prev[parent].children[child];
      const updatedChildren = {
        ...prev[parent].children,
        [child]: newChildValue,
      };
      // If all children are checked, parent's checkbox becomes checked.
      const allChecked = Object.values(updatedChildren).every(
        (v) => v === true
      );
      const newParentValue = allChecked;
      return {
        ...prev,
        [parent]: {
          parent: newParentValue,
          children: updatedChildren,
        },
      };
    });
  };

  // Toggle collapse for a parent.
  const toggleCollapse = (parent) => {
    setOpenParents((prev) => ({ ...prev, [parent]: !prev[parent] }));
  };

  return (
    <Box sx={{ width: 300 }}>
      <List>
        {Object.keys(data).map((parent) => (
          <React.Fragment key={parent}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked[parent]?.parent || false}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleParentToggle(parent)}
                />
              </ListItemIcon>
              <ListItemText primary={parent} />
              <IconButton onClick={() => toggleCollapse(parent)}>
                {openParents[parent] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={openParents[parent]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {data[parent].map((child) => (
                  <ListItem key={child} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked[parent]?.children[child] || false}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => handleChildToggle(parent, child)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={child} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default HierarchyCheckboxTree;

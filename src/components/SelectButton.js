import React from 'react';
import { makeStyles } from 'tss-react/mui';

const SelectButton = ({ children, selected, onClick }) => {

    const useStyles = makeStyles()(() => ({
        selectbutton: {
            border: "1px solid #30D5C8",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "#30D5C8" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "#30D5C8",
                color: "black",
            },
            width: "22%",
            //   margin: 5,
        },
    }));

    const { classes } = useStyles();

    return (
        <div onClick={onClick} className={classes.selectbutton}>
            {children}
        </div>
    )
}

export default SelectButton;
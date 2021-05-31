import { FC, useState } from "react";
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";
import { Divider } from '@material-ui/core';
import { BitcoinWithTextIcon } from "../icons/BitcoinWithTextIcon";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PageName } from "../PageName";
import { Route } from "../Route";

const options = Object.values(PageName);

const LongMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const MapOption2Path = (option: string): string => {
    switch (option) {
        case PageName.HOME: {
            return Route.HOME;
        }
        case PageName.MNEMONIC_WORDS: {
            return Route.MNEMONIC_WORDS;
        }
        case PageName.HD_SEGWIT: {
            return Route.HD_SEGWIT;
        }
        case PageName.N_OUT_OF_M_P2SH: {
            return Route.N_OUT_OF_M_P2SH;
        }
        default:
            return "";
    }
  }

  const CustomMenu = styled(Menu)({
    "a": {
        textDecoration: "none",
        fontSize: "1.2rem",
        color: "grey"
    },
  })

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <CustomMenu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "18rem",
          },
        }}
      >
        {options.map((option) => (
            <Link to={MapOption2Path(option)}>
                <MenuItem key={option} onClick={handleClose}>{option}</MenuItem>
            </Link>
        ))}
      </CustomMenu>
    </div>
  );
}

const HeaderContainer = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ".bitcoin-icon": {
        width: "12.5rem",
        margin: "1rem"
    },
})

const Header : FC = () => {
    return (
        <>
            <HeaderContainer>
                <Link to="/"><BitcoinWithTextIcon className="bitcoin-icon"/></Link>
                <LongMenu/>
            </HeaderContainer>
            <Divider/>
        </>
    )
}

export default Header;
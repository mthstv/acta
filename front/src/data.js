import React from "react";
import Faker from "faker";
import PermIdentity from "@material-ui/icons/PermIdentity";
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import MenuBook from "@material-ui/icons/MenuBook";
import ReplyRoundedIcon from "@material-ui/icons/ReplyRounded";
import ForumIcon from '@material-ui/icons/Forum';

const data = {
  adminMenus: [
    { text: "Regras", icon: <MenuBook />, link: "/" },
    { text: "Importação", icon: <OpenInBrowserIcon />, link: "/importacao" },
    { text: "Usuários", icon: <PermIdentity />, link: "/usuarios" },
    { text: "Solicitações", icon: <ForumIcon />, link: "/solicitacoes" },

    { text: "Sair", icon: <ReplyRoundedIcon />, link: "/logout" },
    // { text: "DashBoard", icon: <Assessment />, link: "/dashboard" },
    // { text: "Form Page", icon: <Web />, link: "/form" },
    // {
    //   text: "Table Page",
    //   icon: <GridOn />,
    //   // link: "/table",
    //   subMenus: [
    //     {
    //       text: "Basic Table",
    //       icon: <BorderClear />,
    //       link: "/table/basic"
    //     },
    //     {
    //       text: "Data Table",
    //       icon: <BorderOuter />,
    //       link: "/table/data"
    //     }
    //   ]
    // },
    // { text: "Login Page", icon: <PermIdentity />, link: "/login" }

  ],
  consultantMenus: [
    { text: "Regras", icon: <MenuBook />, link: "/" },
    { text: "Minhas Solicitações", icon: <ForumIcon />, link: "/solicitacoes" },

    { text: "Sair", icon: <ReplyRoundedIcon />, link: "/logout" },
  ],
  isLoggedIn: false,
  user: {
    userName: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
    avatar: null,// 'https://secure.gravatar.com/avatar/6a892a927dfbe1345572ab1e34780f0a?s=800&d=identicon'
  }
};

export default data;

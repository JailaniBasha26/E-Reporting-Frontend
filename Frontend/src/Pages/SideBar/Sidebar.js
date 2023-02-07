import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Messages from "./Messages";
import FileManager from "./FileManager";
import Analytics from "./Analytics";
import Order from "./Order";
import Saved from "./Saved";
import Setting from "./Setting";
import "./Sidebar.css";

const routes = [
  {
    path: "/",
    name: "My Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/users",
    name: "Annual Report",
    icon: <FaUser />,
    subRoutes: [
          {
            path: "",
            name: "Company Info ",
            icon: <FaUser />,
          },
          {
            path: "",
            name: "Financial Year",
            icon: <FaLock />,
          },
          {
            path: "",
            name: "Income Statement",
            icon: <FaMoneyBill />,
          },
          {
            path: "",
            name: "Balance Statement ",
            icon: <FaMoneyBill />,
          },
          {
            path: "",
            name: "Notes",
            icon: <FaMoneyBill />,
          },
          {
            path: "",
            name: "Management Statement",
            icon: <FaMoneyBill />,
          },
        ],
  },
  {
    path: "/messages",
    name: "Send Annual Report",
    icon: <MdMessage />,
    subRoutes: [
      {
        path: "",
        name: "PAY ",
        icon: <FaUser />,
      },
      {
        path: "",
        name: "Send",
        icon: <FaLock />,
      },
      {
        path: "",
        name: "Digital Signature",
        icon: <FaMoneyBill />,
      },
    ]
  },
  {
    path: "/analytics",
    name: "View PDF",
    icon: <BiAnalyse />,
  },
  {
    path: "/order",
    name: "Help / Example Report",
    icon: <BsCartCheck />,
  },
  {
    path: "/saved",
    name: "Contact Support",
    icon: <AiFillHeart />,
  },
];

const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: "140px",
    padding: "5px 15px",
    transition: {
      duration: 0.2,
    },
  },
};

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

let mytable;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Open: false,
      selectedPage: "",
    };

    //this.navi = this.navi.bind(this);
  }

  
  Dashboard() {
    return <Dashboard />;
  }

  Users() {
    return <Users />;
  }

  Messages() {
    return <Messages />;
  }

  FileManager() {
    return <FileManager />;
  }

  Analytics() {
    return <Analytics />;
  }

  Order() {
    return <Order />;
  }

  Saved() {
    return <Saved />;
  }

  Setting() {
    return <Setting />;
  }

  render() {
    const { Open,selectedPage } = this.state;   //false,''
    if(selectedPage == 'Dashboard')
     mytable = this.Dashboard()
     
     if(selectedPage == 'Users')
     mytable = this.Users()

     if(selectedPage == 'Messages')
     mytable = this.Messages()

     if(selectedPage == 'FileManager')
     mytable = this.FileManager()

     if(selectedPage == 'Analytics')
     mytable = this.Analytics()

     if(selectedPage == 'Order')
     mytable = this.Order()

     if(selectedPage == 'Saved')
     mytable = this.Saved()

     if(selectedPage == 'Setting')
     mytable = this.Setting()


    console.log(mytable, "(((((",selectedPage);
    return (
      <div className="main-container">
        <motion.div
          animate={{
            width: Open ? "240px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
               damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {Open && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  New Annual Report
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={() => this.setState({ Open: !Open })} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {Open && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={() => {this.setState({selectedPage:route.name})}}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {Open && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{mytable}</main>
      </div>
    );
  }
}
export default Sidebar;

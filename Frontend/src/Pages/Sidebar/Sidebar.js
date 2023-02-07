import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdSend,MdOutlineLiveHelp,MdOutlineCorporateFare,MdPayment,MdSendToMobile } from "react-icons/md";
import { BsFileEarmarkPdf,BsCalendarDate,BsFileEarmarkSpreadsheet,BsStickies } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import {AiFillDashboard } from "react-icons/ai";
import {TbFileInvoice,TbSignature } from "react-icons/tb";
import {CgNotes } from "react-icons/cg";

import { AnimatePresence, motion } from "framer-motion";
// import Dashboard from "./Dashboard";
// import Users from "./Users";
// import Messages from "./Messages";
// import FileManager from "./FileManager";
// import Analytics from "./Analytics";
// import Order from "./Order";
// import Saved from "./Saved";
// import Settings from "./Settings";
import SidebarMenu from "./SidebarMenu";
import "./SideBar.css";


const route = [
  {
    
    name: "My Dashboard",
    icon: <AiFillDashboard />,
    url:'/#'
  },
  {
   
    name: "Annual Report",
    icon: <HiOutlineDocumentReport />,
    url:'/info',
    subRoutes: [
      {
       
        name: "Company Information ",
        icon: <MdOutlineCorporateFare />,
        
      },
      {
        
        name: "Financial Year",
        icon: <BsCalendarDate />,
      },
      {
        
        name: "Income Statement",
        icon: <TbFileInvoice />,
      },
      {
        
        name: "Balance Sheet",
        icon: <BsFileEarmarkSpreadsheet />,
      },
      {
        
        name: "Notes",
        icon: <BsStickies />,
      },
      {
        
        name: "Management Statement",
        icon: <CgNotes />,
      },
    ]
  },
  {
    
    name: "Send Annual Report",
    icon: <MdSend />,
    url:'#/fileSIE',
    subRoutes: [
      {
        
        name: "Digital Signature",
        icon: <TbSignature />,
      },
      {
       
        name: "Pay",
        icon: <MdPayment />,
      },
      {
       
        name: "Send",
        icon: <MdSendToMobile />,
      },
    ]
  },
  {
    
    name: "View PDF",
    icon: <BsFileEarmarkPdf />,
    url:'#/fileSIE',
  },
  {
    
    name: "Help/Example Report",
    icon: <MdOutlineLiveHelp />,
    url:'#/fileSIE',
  },
  {
    
    name: "Contact Support",
    icon: <BiSupport />,
    url:'#/fileSIE',
  },
];

// const inputAnimation = {
//   hidden: {
//     width: 0,
//     padding: 0,
//     transition: {
//       duration: 0.2,
//     },
//   },
//   show: {
//     width: "140px",
//     padding: "5px 15px",
//     transition: {
//       duration: 0.2,
//     },
//   },
// };

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

  
  // Dashboard() {
  //   return <Dashboard />;
  // }

  // Users() {
  //   return <Users />;
  // }

  // Messages() {
  //   return <Messages />;
  // }

  // FileManager() {
  //   return <FileManager />;
  // }

  // Analytics() {
  //   return <Analytics />;
  // }

  // Order() {
  //   return <Order />;
  // }

  // Saved() {
  //   return <Saved />;
  // }

  // Settings() {
  //   return <Settings />;
  // }

  render() {
    const { Open,selectedPage } = this.state;   //false,''
    // if(selectedPage == 'Dashboard')
    //  mytable = this.Dashboard()
     
    //  if(selectedPage == 'Users')
    //  mytable = this.Users()

    //  if(selectedPage == 'Messages')
    //  mytable = this.Messages()

    //  if(selectedPage == 'FileManager')
    //  mytable = this.FileManager()

    //  if(selectedPage == 'Analytics')
    //  mytable = this.Analytics()

    //  if(selectedPage == 'Order')
    //  mytable = this.Order()

    //  if(selectedPage == 'Saved')
    //  mytable = this.Saved()

    //  if(selectedPage == 'Setting')
    //  mytable = this.Settings()


    console.log(mytable, "(((((",selectedPage);
    return (
      <div className="main-container">
        <motion.div
          animate={{
            width: Open ? "250px" : "50px",

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
                  
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={() => this.setState({ Open: !Open })} />
            </div>
          </div>
          
          <section className="routes" >
            {route.map((route, index) => {
              // if(route.subRoutes) {
              //   console.log('yes');
              //   return(
              //     <SidebarMenu
              //       Open={Open}
              //       route={route}
              //       showAnimation={showAnimation}
              //       />
              //   )
              // }
              return (
                <div key={index}>
                <NavLink
                  to={route.url}
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
                </div>
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

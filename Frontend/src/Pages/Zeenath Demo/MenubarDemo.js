// import React, { Component } from 'react';
// import { Menubar } from 'primereact/menubar';
// //import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import "./MenubarDemo.css";
// //import RebelSkool_Logo from "../..Zeenath Demo/RebelSkool_Logo.jpg";

// export class MenubarDemo extends Component {

//     constructor(props) {
//         super(props);

//         this.items = [
//             {
//                 label: 'Home',
//                 command: () => navigateToHomePage()
//             },
//             {
//                 label: 'Our Services',
//                 items: [
//                     {
//                         label: 'Annual Report',
//                     },
//                 ]
//             },
//             {
//                 label: 'Q & A',
//             },
//             {
//                 label: 'Prices',
//             },
//             {
//                 label: 'About Us',
//             },
//             {
//                 label: 'Login',
//             },
//             {
//                 label: 'Sign Up',
//             }
//         ];
//     }

//     navigateToHomePage() {
//         this.props.history.push('/home')
//     }

//     render() {
//         // const start = <img alt="logo" src="\RebelSkool_Logo.jpg" 
//         // //onError={(e) => e.target.src='C:\Zeenath\010 Images\RebelSkool_Logo.jpg'} 
//         // height="40" 
//         // className="mr-2">

//         //</img>;
//         const end = <InputText placeholder="Search" type="text" />;

//         return (
//             <div>
//                 <div className="card">
//                     <Menubar 
//                         model={this.items} 
//                         onClick = {this.navigateToHomePage()}
//                         //start={start} 
//                         //end={end} 
//                         className="home-menu"
//                     />
//                 </div>
//             </div>
//         );
//     }
// }

// export default MenubarDemo;
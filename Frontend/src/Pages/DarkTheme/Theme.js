import React, { Component } from "react";
import "./style.scss";
import "./styles.css";
const currentThemeColor = localStorage.getItem("theme-color");
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorTheme: "theme-white",
    };
  }

  componentDidMount() {
    if (currentThemeColor) {
      this.setState({ currentThemeColor: currentThemeColor });
    }
  }

  handleClick(theme) {
    this.setState({ currentThemeColor: currentThemeColor });
    localStorage.setItem("theme-color", theme);
  }

  render() {
    const { colorTheme } = this.state;
    return (
        <div className={`App ${colorTheme}`}>
            <div className="theme-options">
                <div>
                <button
                    id="theme-white"
                    onClick={() => this.handleClick("theme-white")}
                    className={`${colorTheme === "theme-white" ? "active" : ""}`}
                ></button>
                </div>
                <div>
                <button
                    id="theme-blue"
                    onClick={() => this.handleClick("theme-blue")}
                    className={`${colorTheme === "theme-blue" ? "active" : ""}`}
                ></button>
                </div>
                <div>
                <button
                    id="theme-orange"
                    onClick={() => this.handleClick("theme-orange")}
                    className={`${colorTheme === "theme-orange" ? "active" : ""}`}
                ></button>
                </div>
                <div>
                <button
                    id="theme-purple"
                    onClick={() => this.handleClick("theme-purple")}
                    className={`${colorTheme === "theme-purple" ? "active" : ""}`}
                ></button>
                </div>
                <div>
                <button
                    id="theme-green"
                    onClick={() => this.handleClick("theme-green")}
                    className={`${colorTheme === "theme-green" ? "active" : ""}`}
                ></button>
                </div>
                <div>
                <button
                    id="theme-black"
                    onClick={() => this.handleClick("theme-black")}
                    className={`${colorTheme === "theme-black" ? "active" : ""}`}
                ></button>
                </div>
      </div> 
      <div className="content-box">
        <h3>Multiple Themes Swither / React</h3>
        <h5>(ReactJS, SCSS/CSS, Local Storage)</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        </p>
      </div>
      </div>
    );
  }
}

export default Theme;

// import React, { useState, useEffect } from "react";
// import "./styles.css";
// import "./style.scss";
// function Theme() {
//   // state
//   const [colorTheme, setColorTheme] = useState("theme-white");

//   // effect
//   useEffect(() => {
//     // check for selected theme /// LocalStorage value
//     const currentThemeColor = localStorage.getItem("theme-color");
//     // if found set selected theme value in state
//     if (currentThemeColor) {
//       setColorTheme(currentThemeColor);
//     }
//   }, []);

//   // set theme
//   const handleClick = (theme) => {
//     setColorTheme(theme);
//     localStorage.setItem("theme-color", theme);
//   };

//   return (
//     <div className={`App ${colorTheme}`}>
//       <div className="theme-options">
//         <div
          
//         >
//             <button id="theme-white"
//           onClick={() => handleClick("theme-white")}
//           className={`${colorTheme === "theme-white" ? "active" : ""}`}></button>
//         </div>
//         <div
//           id="theme-blue"
//           onClick={() => handleClick("theme-blue")}
//           className={`${colorTheme === "theme-blue" ? "active" : ""}`}
//         ></div>
//         <div
//           id="theme-orange"
//           onClick={() => handleClick("theme-orange")}
//           className={`${colorTheme === "theme-orange" ? "active" : ""}`}
//         ></div>
//         <div
//           id="theme-purple"
//           onClick={() => handleClick("theme-purple")}
//           className={`${colorTheme === "theme-purple" ? "active" : ""}`}
//         ></div>
//         <div
//           id="theme-green"
//           onClick={() => handleClick("theme-green")}
//           className={`${colorTheme === "theme-green" ? "active" : ""}`}
//         ></div>
//         <div
//           id="theme-black"
//           onClick={() => handleClick("theme-black")}
//           className={`${colorTheme === "theme-black" ? "active" : ""}`}
//         ></div>
//       </div>
//       <div className="content-box">
//         <h3>Multiple Themes Swither / React</h3>
//         <h5>(ReactJS, SCSS/CSS, Local Storage)</h5>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat. Duis aute irure dolor in
//           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Theme;

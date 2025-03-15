import { Response, Request} from "express";

import {T} from "../libs/types/common" 

const memberController: T = {};

// For React
// memberController.goHome = (req: Request, res: Response) => {
//   {
//     try {
//         res.send("Homepage");
//     } catch (err) {
//       console.log("ERROR on goHome:", err)
//     }
//   }
// };

// memberController.getLogin = (req: Request, res: Response) => {
//     {
//       try {
//           res.send("Login Page");
//       } catch (err) {
//         console.log("ERROR on getLogin:", err)
//       }
//     }
//   };

//   memberController.getSignup = (req: Request, res: Response) => {
//     {
//       try {
//           res.send("Signup");
//       } catch (err) {
//         console.log("ERROR on getSignup:", err)
//       }
//     }
//   };

  export default memberController;
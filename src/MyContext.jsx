// createContext() ek Context API function hai

// jo tumhe data ko globally share karne deta hai bina har component ko props dene ke.
// ek global store jahan data rakha jaata hai,
// aur koi bhi component directly access kar sakta hai chahe wo kitni bhi depth me ho.

import { createContext } from "react";

export const MyContext = createContext("");   // 🟩 Ek global data store ban gaya

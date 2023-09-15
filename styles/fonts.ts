import { DM_Sans, Inter, Lora } from "next/font/google";

import localFont from "next/font/local";

// define your variable fonts
const inter = Inter();
const lora = Lora();
// define 2 weights of a non-variable font
const sourceCodePro400 = DM_Sans({ weight: "400" });
const sourceCodePro700 = DM_Sans({ weight: "700" });

export { inter, lora, sourceCodePro400, sourceCodePro700 };

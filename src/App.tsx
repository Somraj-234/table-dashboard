import "./App.css";
import Routing from "./utils/Routing";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div>
      <Routing />
      <Analytics />
    </div>
  );
}

export default App;

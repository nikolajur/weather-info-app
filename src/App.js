import { motion } from "framer-motion";
import { firstRenderVariants } from "./helpers/animation-variants";
import Header from "./components/Header";
import Search from "./components/Search";
import TextContent from "./components/TextContent";
import Map from "./components/Map";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <motion.div className="app" variants={firstRenderVariants} initial="hidden" animate="visible">
      <Header />
      <Search />
      <TextContent />
      <Map />
      <Footer />
    </motion.div>
  );
}

export default App;

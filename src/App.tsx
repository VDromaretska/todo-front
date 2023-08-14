import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TodoMainDisplayer } from "./components/TodoMainDisplayer";
import "./main.css";
function App(): JSX.Element {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <TodoMainDisplayer />
      <Footer />
    </div>
  );
}

export default App;

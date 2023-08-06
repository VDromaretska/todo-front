import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Todo } from "./components/Todo";
import "./main.css";
function App(): JSX.Element {
  return (
    <div>
      <div className="header">
        <Header />
      </div>

      <Todo />
      <Footer />
    </div>
  );
}

export default App;

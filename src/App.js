import Body from "./Components/Body";
import "./App.css";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import { MovieProvider } from "./contexts/selectedMovieContext";

function App() {
  return (
    <Provider store={appStore}>
      <MovieProvider>
        <Body />
      </MovieProvider>
    </Provider>
  );
}

export default App;

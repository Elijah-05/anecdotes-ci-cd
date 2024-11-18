import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initializeAnecdote } from "./reducers/anecdoteReducer";
import anecdoteService from "./services/anecdoteService";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdote());
    anecdoteService.updateAnecdote();
  }, []);

  return (
    <div>
      <Filter />
      <h2 style={{ color: "blue", fontWeight: 'bold', fontSize: "1.4rem" }}>Anecdotes List</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

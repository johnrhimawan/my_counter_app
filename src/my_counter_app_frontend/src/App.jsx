import { useState } from "react";
import { my_counter_app_backend } from "declarations/my_counter_app_backend";
import { useAuth } from "./use-auth-client";

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = React.useState("");
  const { whoamiActor, logout } = useAuth();

  const handleClick = async () => {
    const whoami = await whoamiActor.whoamçi();
    setResult(whoami);
  };

  console.log(`[App] my_counter_app_backend:`, my_counter_app_backend);

  // Get the current counter value
  const fetchCount = async () => {
    try {
      setLoading(true);
      const count = await my_counter_app_backend.getCount();
      console.log(`[fetchCount] Count:`, count);

      setCounter(+count.toString()); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      let result = await my_counter_app_backend.inc(); // Increment the count by 1
      console.log(`[increment] result:`, result);
      console.log(`[increment] hash:`, result.hash);
      await fetchCount(); // Fetch the new count
    } finally {
      setLoading(false);
    }
  };

  const reset = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      await my_counter_app_backend.reset(); // Reset counter to 0
      await fetchCount(); // Fetch the new count
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <button
        type="button"
        id="whoamiButton"
        className="primary"
        onClick={handleClick}
      >
        Who am I?
      </button>
      <br />
      <br />
      Counter: {counter}
      <br />
      <br />
      <button onClick={increment} style={{ opacity: loading ? 0.5 : 1 }}>
        Increment
      </button>
      <br />
      <br />
      <button>Decrement (Add your code)</button>
      <br />
      <br />
      <button onClick={reset} style={{ opacity: loading ? 0.5 : 1 }}>
        Reset to zero
      </button>
      <br />
      <br />
    </main>
  );
}

export default App;

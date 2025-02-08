import { BrowserRouter as Router, Route } from 'react-router-dom';
import Playground from './pages/Playground';
import Protected from './pages/Protected';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Route path="/playground" element={<Playground />} />
        <Route path="/protected" element={<Protected />} />
      </Router>
    </>
  );
}

export default App; 
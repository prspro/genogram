import React from 'react';
import Tree from "../src/components/Tree/Tree";
import Overlay from './components/Overlay/Overlay';
import PersonForm from './components/PersonForm/PersonForm';

function App() {
  return (
    <div>
      <Tree/>
      <Overlay />
      <PersonForm />
    </div>
  )
}

export default App
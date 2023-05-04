import React from 'react';
import './styles/global.scss';
import { SearchBar } from './components/SearchBar';
import { Issues } from './components/Issues';
import { useAppSelector } from './app/hooks';
import { Loader } from './components/Loader';
import { BreadCrumbs } from './components/BreadCrumbs';

function App() {
  const { loading, hasError } = useAppSelector(state => state.issues);

  return (
    <div className="App">
      <div className='container'>
        <SearchBar />
        {!hasError && <BreadCrumbs />}
        {loading
          ? <Loader />
          : <Issues />}
      </div>
    </div>
  );
}

export default App;

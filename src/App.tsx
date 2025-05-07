import { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Controls from './components/Controls';
import CatImage from './components/CatImage';
import axios from 'axios';

const AppWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px #0001;
  padding: 32px 32px 24px 32px;
  width: 400px;
  height: 500px;
  max-width: 100vw;
  max-height: 100vh;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [catUrl, setCatUrl] = useState('');
  const intervalRef = useRef<number | undefined>(undefined);

  const fetchCat = useCallback(async () => {
    try {
      const res = await axios.get('https://api.thecatapi.com/v1/images/search');
      setCatUrl(res.data[0]?.url || '');
    } catch {
      setCatUrl('');
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      void fetchCat();
    }
  }, [enabled, fetchCat]);

  useEffect(() => {
    if (autoRefresh && enabled) {
      intervalRef.current = window.setInterval(fetchCat, 5000);
      return () => {
        if (typeof intervalRef.current === 'number') {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      };
    } else if (typeof intervalRef.current === 'number') {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, [autoRefresh, enabled, fetchCat]);

  return (
    <AppWrapper>
      <Controls
        enabled={enabled}
        autoRefresh={autoRefresh}
        onEnabledChange={setEnabled}
        onAutoRefreshChange={setAutoRefresh}
        onGetCat={fetchCat}
      />
      <CatImage src={enabled ? catUrl : ''} />
    </AppWrapper>
  );
}

export default App;

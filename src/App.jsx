import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { ToolShell } from '@ff8-speedruns/ui';
import Searchbar from './components/Searchbar';
import Pattern from './components/Pattern';
import data from './data/data.json';

export default function App() {
  const [searchPattern, setSearchPattern] = useState('');
  // The search box itself stays instant (it's uncontrolled - see Searchbar);
  // only the expensive filter + table re-render waits for typing to pause.
  const [debouncedPattern] = useDebouncedValue(searchPattern, 150);

  return (
    <ToolShell
      title="Fish Fin Manipulation"
      status="working"
      repo="fish-fins"
      credits="awesomeWaves, Thomas_8989, Bodcap, Kiitoksia, Brofar."
      links={[{ label: 'How-to', href: 'https://www.youtube.com/watch?v=zjAdvzRooLw' }]}
    >
      <Searchbar onChange={setSearchPattern} />
      <Pattern data={data} pattern={debouncedPattern} />
    </ToolShell>
  );
}

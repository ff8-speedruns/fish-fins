import Searchbar from './Searchbar';
import Siteheader from './Siteheader';
import Pattern from './Pattern';
import { AppShell, Header, Text, Anchor, Box } from '@mantine/core';
import { useState } from 'react';
import data from '../data/data.json';

export default function Shell() {
  const [searchPattern, setSearchPattern] = useState('');
  const handleNewPattern = (pattern) => setSearchPattern(pattern);

  return (
    <AppShell
      padding="md"
      header={<Header height={60} p="xs"><Siteheader /></Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Box my="lg">
        <Text fz="sm">Credit: awesomeWaves, Thomas_8989, Bodcap, Kiitoksia, Brofar.</Text>
        <Anchor fz="sm" href='https://www.youtube.com/watch?v=zjAdvzRooLw'>How-to</Anchor>
      </Box>
      <Searchbar onChange={handleNewPattern} />
      <Pattern data={data} pattern={searchPattern} />
    </AppShell>
  );
}
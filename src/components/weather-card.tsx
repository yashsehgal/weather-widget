import { useState } from 'react';
import './styles/weather-card.css';
import { Pencil1Icon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, SimpleGrid } from '@mantine/core';
import { Select } from '@mantine/core';
import { LOCATIONS } from '../common/constants';

export default function WeatherCard() {
  const [hasMouseOver, setHasMouseOver] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  return <>
    <div
      className="weather-card"
      onMouseEnter={() => setHasMouseOver(true)}
      onMouseLeave={() => setHasMouseOver(false)}>
      {hasMouseOver && <motion.button
        className={'edit-location'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={open}
      >
        {<Pencil1Icon />}
      </motion.button>}
    </div>
    <Modal opened={opened} onClose={close} title="Manage Location">
      <SimpleGrid>
        <Select
          label="Location for Weather"
          placeholder="Select a location"
          data={LOCATIONS}
          searchable
        />
        <Button onClick={close}>Save location</Button>
      </SimpleGrid>
    </Modal>
  </>
}
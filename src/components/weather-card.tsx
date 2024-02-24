import { useState } from 'react';
import './styles/weather-card.css';
import { Pencil1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion';

export default function WeatherCard() {
  const [hasMouseOver, setHasMouseOver] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return <div
    className="weather-card"
    onMouseEnter={() => setHasMouseOver(true)}
    onMouseLeave={() => setHasMouseOver(false)}>
    {hasMouseOver && <motion.button
      className={!isEditing ? 'edit-location' : 'edit-location edit-location-cancel'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setIsEditing(!isEditing)}
    >
      {!isEditing ? <Pencil1Icon /> : <Cross2Icon />}
    </motion.button>}
  </div>
}
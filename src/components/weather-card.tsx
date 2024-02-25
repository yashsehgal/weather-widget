import { useState } from 'react';
import './styles/weather-card.css';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, SimpleGrid } from '@mantine/core';
import { Select } from '@mantine/core';
import { LOCATIONS } from '../common/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setWeatherData, setError } from '../redux/slice';
import { fetchWeatherByLocation } from '../services/weather';
import CloudIcon from '../icons/cloud.svg';
import WindIcon from '../icons/wind.svg';

export default function WeatherCard() {
  const [hasMouseOver, setHasMouseOver] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const weatherData = useSelector((state) => state.weather.weatherData);

  const handleLocationChange = async (location: string) => {
    dispatch(setLocation(location));

    try {
      const data = await fetchWeatherByLocation(location);

      if (data === null) {
        dispatch(setError('Error fetching weather data.'));
      } else {
        dispatch(setWeatherData(data));
      }
    } catch (error) {
      console.error('Error while handling location change:', error);
      dispatch(setError('Error handling location change.'));
    }
  };

  return (
    <>
      <div
        className={`weather-card ${weatherData.cloud > 10 && 'weather-cloud-bg'}`}
        onMouseEnter={() => setHasMouseOver(true)}
        onMouseLeave={() => setHasMouseOver(false)}
        style={{
          backgroundColor: weatherData.humidity > 20 ? '#d97706' : '#2563eb',
        }}>
        {weatherData && (
          <div className="location-weather-details-wrapper">
            <div className="weather-icon-wind-direction-wrapper">
              <img
                src={weatherData.condition.icon}
                alt={'weather-icon'}
                className="weather-icon"
              />
              <span className="wind-direction">
                <img src={WindIcon} className="wind-icon" />
                {weatherData.windDirection}
              </span>
            </div>
            <p className="location">{weatherData.location}</p>
            <div className="weather-stats-wrapper">
              <span className="humidity-stats">
                {`HUM: ${weatherData.humidity}%`}
              </span>
              <span className="cloud-stats">
                <img src={CloudIcon} className="cloud-icon" />
                {weatherData.cloud}%
              </span>
            </div>
          </div>
        )}
        {hasMouseOver && (
          <motion.button
            className={'edit-location'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={open}>
            {<Pencil1Icon />}
          </motion.button>
        )}
      </div>
      <Modal opened={opened} onClose={close} title="Manage Location">
        <SimpleGrid>
          <Select
            onChange={(location) =>
              location && handleLocationChange(location as string)
            }
            label="Location for Weather"
            placeholder="Select a location"
            data={LOCATIONS}
            defaultValue={weatherData.location}
            searchable
          />
          <Button onClick={close}>Save location</Button>
        </SimpleGrid>
      </Modal>
    </>
  );
}

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '@styles/Counter.module.css';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '@store/reducers/counterSlice';

import { fetchTeamManagement } from '@store/reducers/corcoranSlice';
import {
  fetchAllCharacters,
  fetchCharacterById,
} from '@store/reducers/breakingBadSlice';
// import BreakingBadService from '@lib/api/services/breakingBadService';

export function Counter() {
  const count = useSelector(selectCount);
  // const character = useSelector(state => state.breakingBad.character);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [characters, setCharacters] = useState([]);

  const handlerFetchCharacters = async () => {
    try {
      const characters = await BreakingBadService.fetchAllCharacters();
      setCharacters(characters);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(fetchTeamManagement())}
        >
          Fetch Team Management
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(fetchAllCharacters())}
        >
          Fetch Breaking Bad Characters
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(fetchCharacterById(1))}
        >
          Fetch One BreakingBad Character
        </button>
      </div>
    </div>
  );
}

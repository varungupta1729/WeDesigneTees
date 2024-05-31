import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard.jsx";

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events);  
   
  return (
    <div>
     
         {
          allEvents?.length !== 0 && (
            
        <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className='text-[var(--text-dark)]'>Popular Events</h1>
      </div>

      <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />

            </div>
     
     </div>
          )

         }
        
     
     
  </div>
  )
}

export default Events
import { useState, useEffect } from 'react'
import { ref, onValue, get } from 'firebase/database'

// components
import { Card } from '../components/pages/Home/Cards.jsx'

// services
import { database } from '../services/firebase/database.js'

// styles
import styles from '../styles/Home.module.css'

export default function Home() {
  // states
  const [cards, setCards] = useState([])
  const [categories, setCategories] = useState([])

  // fetch categories
  useEffect(() => {
    const categoriesRef = ref(database, '/categoria')

    const categoriesListener = onValue(categoriesRef, (categoriesSnapshot) => {
      if (categoriesSnapshot.exists()) {
        const categories = categoriesSnapshot.val()

        setCategories(categories)
      }
    })

    return () => {
      categoriesListener()
    }
  }, [])

  // fetch cards
  useEffect(() => {
    const cardsRef = ref(database, '/teste')

    const cardsListener = onValue(cardsRef, (cardsSnapshot) => {
      if (cardsSnapshot.exists()) {
        const cards = cardsSnapshot.val()

        setCards(cards)
      }
    })

    return () => {
      cardsListener()
    }
  }, [])

  return (
    <main className={styles.main}>
      {cards.map((card, index) => (
        <Card
          title={card.nome}
          selectOptions={categories}
          cardKey={index}
          key={index}
        />
      ))}
    </main>
  )
}

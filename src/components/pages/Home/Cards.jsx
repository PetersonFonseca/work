import { useState } from 'react'
import { ref, set, update } from 'firebase/database'

// services
import { database } from '../../../services/firebase/database.js'

// styles
import styles from './Cards.module.css'

export function Card({ title, selectOptions, cardKey }) {
  const [selectedValue, setSelectedValue] = useState(selectOptions)
  const [cardTitle, setCardTitle] = useState(title)

  async function saveCardData() {
    try {
      const updates = {}
      updates['/teste/' + cardKey + '/nome'] = cardTitle
      updates['/teste/' + cardKey + '/selecionado'] = selectedValue

      await update(ref(database), updates)

      alert('Alterações salvas!')
    } catch (e) {
      console.log(e)

      alert(e.message)
    }
  }

  return (
    <article className={styles.card}>
      <input
        placeholder='Título do card'
        value={cardTitle}
        onChange={(event) => setCardTitle(event.target.value)}
      />

      <div className={styles.select}>
        <select
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
        >
          <option value='Selecione uma categoria' defaultValue disabled>
            Selecione uma opção
          </option>

          {selectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button onClick={saveCardData}>Salvar</button>
      </div>
    </article>
  )
}

import { useState } from 'react'
import styles from "./select.module.css"


type SelectOption = {
    label: string
    value: any
}

type SelectProps = {
    options: SelectOption[] //array of different options
    value?: SelectOption //current option selection or empty
    onChange: (value: SelectOption | undefined) => void//function that passes value of options
}


function Select({ value, onChange, options} : SelectProps) {
    const [isOpen,setIsOpen] = useState(false) //toggle list

    function clearOptions(){
        onChange(undefined)
    }

    function selectOption(option: SelectOption){
        onChange(option)
    }

  return (
    <article
        onBlur={()=> setIsOpen(false)}
        onClick={()=> setIsOpen(prev => !prev)} 
        tabIndex={0} 
        className={styles.container}>
            <span className={styles.value}>
                {value?.label}
            </span>
            <button
            onClick={e => {
                e.stopPropagation()
                clearOptions()}}
            className={styles["clear-btn"]}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {options.map(option => (
                    <li
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }}
                    key ={option.label}
                    className={styles.option}>
                    {option.label}
                    </li>
                ))}
            </ul>
    </article>
  )
}


export default Select
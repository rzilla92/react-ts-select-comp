import { useState , useEffect } from 'react'
import styles from "./select.module.css"


type SelectOption = {
    label: string
    value: string |  number
}

type SelectProps = {
    options: SelectOption[] //array of different options
    value?: SelectOption //current option selection or empty
    onChange: (value: SelectOption | undefined) => void//function that passes value of options
}


function Select({ value, onChange, options} : SelectProps) {
    const [isOpen,setIsOpen] = useState(false) //toggle list
    const [highlightedIndex, setHighlightedIndex] = useState(0) //setting default highlighted index to 0, when mouse enters and move to other index, state will change

    function clearOptions(){
        onChange(undefined)
    }

    function selectOption(option: SelectOption){
        // following conditional will only call onChange when value changes
        if(option !== value) {
            onChange(option)
        }
    }

    function isOptionSelected(option: SelectOption){
        return option === value
    }

    useEffect(() => {
        if(isOpen) {
            setHighlightedIndex(0)
        }
    }, [isOpen])

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
                {options.map((option, index) => (
                    <li
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    key ={option.value}
                    className={`
                        ${styles.option} 
                        ${isOptionSelected(option) ? styles.selected : ""}          //option selected conditional
                        ${index === highlightedIndex ? styles.highlighted : ""}     //option highlight conditional
                    `}>
                    {option.label}
                    </li>
                ))}
            </ul>
    </article>
  )
}


export default Select
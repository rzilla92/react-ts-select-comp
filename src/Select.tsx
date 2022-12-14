import { useState , useEffect } from 'react'
import styles from "./select.module.css"


export type SelectOption = {
    label: string
    value: string | number
}

type MultipleSelectProps = {
    multiple: true
    value: SelectOption[]                                    //array of options selection
    onChange: (value: SelectOption[]) => void               //function that passes value of options
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption                                    //current option selection or empty
    onChange: (value: SelectOption | undefined) => void     //function that passes value of options
}

type SelectProps = {
    options: SelectOption[]                                 //array of different options
    } & (SingleSelectProps | MultipleSelectProps)           //coniditional type dependent on multiple prop


export function Select({ multiple, value, onChange, options}: SelectProps) {
    const [isOpen,setIsOpen] = useState(false)              //toggle list
    const [highlightedIndex, setHighlightedIndex] = useState(0) //setting default highlighted index to 0, when mouse enters and move to other index, state will change

    function clearOptions(){
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if (multiple) {                                     // only call onChange when value changes
          if (value.includes(option)) {                     // remove duplicate selection i.e if array already has selected option, remove it
            onChange(value.filter(o => o !== option))
          } else {
            onChange([...value, option])
          }
        } else {
          if (option !== value) onChange(option)
        }
      }

    function isOptionSelected(option: SelectOption){
        return multiple ? value.includes(option) : option === value
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
                {multiple
                ? value.map(v => (
                    <button
                    key={v.value}
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(v)
                        }}
                    className={styles["option-badge"]}
                    >
                        {v.label}
                        <span className={styles["remove-btn"]}>&times;</span>
                    </button>
                ))
                : value?.label}
            </span>
            <button
            onClick={e => {
                e.stopPropagation()
                clearOptions()}}
            className={styles["clear-btn"]}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    key ={option.value}
                    className={`${styles.option} ${
                        isOptionSelected(option) ? styles.selected : ""}          //option selected conditional
                        ${index === highlightedIndex ? styles.highlighted : ""}     //option highlight conditional
                    `}>
                    {option.label}
                    </li>
                ))}
            </ul>
    </article>
  )
}



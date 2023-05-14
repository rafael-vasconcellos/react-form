import { useState } from 'react'

export class createFormHook {
    private _state: any[];
    name: string;

    constructor(name: string) {
        this._state = useState()
        this.name = name
    }

    get error() {
        return this._state[0]
    }

    set error(newValue: string) {
        this._state[0] = this._state[1](() => newValue)
    }
}


/* 

function legacy_display() { 

    let input:any = {
        name: document.querySelector('#form')?.children[0].children[1],
        email: document.querySelector('#form')?.children[1].children[1],
        pass: document.querySelector('#form')?.children[2].children[1],
        techs: Array.from(document.querySelector('#form')?.children[4].children as Iterable<Element>)
    } // Array.isArray()

    let obj = {
        name: input.name.value? input.name.value : '' ,
        email: input.email.value? input.email.value : '' ,
        pass: input.pass.value? input.pass.value : '' ,
        techs: input.techs.map((i:any) => {return i.value} )
    }

    try {
        FormSchema.parse(obj)
        for (let key in formHooks) {
            formHooks[key].error = ''
            if ((input[key] instanceof Array) === false) {input[key].style.border = ''}
            else {input[key].forEach((e:any) => e.style.border = '')}
        }
        setResult((): any => obj)
        return true
    }

    catch(error: any) { 
        console.error(error.issues)
        setResult(():any => '')

        for (let indice of error.issues) {
          let message = error.issues.find((i: any) => {return i.path[0] === indice.path[0]}).message
          if (Object.keys(formHooks).includes(indice.path[0])) {

              formHooks[indice.path[0]].error = message
              if ((input[indice.path[0]] instanceof Array) === false) {
                  input[indice.path[0]].style.border = '1px solid red'
              }

              else {input[indice.path[0]][indice.path[1]].style.border = '1px solid red';console.log(input[indice.path[0]][indice.path[1]])}
          }
        }


        return false
    }
}

*/
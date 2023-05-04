import { useState } from 'react'
import './form.css'
import { z } from 'zod'
import { createFormHook } from './formClass.tsx'

function Form() {

const [ result, setResult ] = useState()
const [ techs, setTechs ] = useState([])
const FormSchema = z.object({
    name: z.string().nonempty('Insira um nome'),
    email: z.string().nonempty('Insira um email').email('Insira um email válido')
    .refine(value => {return value.endsWith('hotmail.com')}, 'Insira um hotmail'),
    pass: z.string().nonempty('Insira uma senha').min(8, 'Senha muito curta: 8-15').max(15, 'Senha muito longa: 8-15'),
    techs: z.array( 
        z.string().nonempty('Digite uma tecnologia')
    ).optional()
} )
//console.log(typeof formschema)

const formHooks: any = {
    name: new createFormHook('name'),
    email: new createFormHook('email'),
    pass: new createFormHook('pass'),
    techs: new createFormHook('techs')
}

function display() { 

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

  return (
    <>
        <form id='form' onSubmit={e => {e.preventDefault() ; display()}}>
            <div>
                  <label>Nome:</label>
                  <input type="text" placeholder='Digite seu nome' />
                  {formHooks.name.error != '' && <p style={  {'color': 'red'}  }>{formHooks.name.error}</p>}
            </div>
            <div>
                  <label>E-mail:</label>
                  <input type="email" placeholder='Digite seu email' />
                  {formHooks.email.error != '' && <p style={  {'color': 'red'}  }>{formHooks.email.error}</p>}
            </div>
            <div>
                  <label>Senha:</label>
                  <input type="password" placeholder='Digite sua senha' />
                  {formHooks.pass.error != '' && <p style={  {'color': 'red'}  }>{formHooks.pass.error}</p>}
            </div>
            <div style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <label>Tecnologias:</label>
                  <button type='button'
                  style={{border: 0, backgroundColor: 'transparent', color: 'var(--main-color)', cursor: 'pointer'}}
                  onClick={ () => { 
                    if (techs[0] === undefined) { setTechs(():any => [0]) }
                    else { setTechs((prev):any => [...prev, prev.length]) }
                    } }  >
                    Adicionar </button>
            </div>
            <div> {
              techs.map((e) => {return <input type='text' placeholder='Digite a tecnologia' key={techs.indexOf(e)} />})
            } </div>
            {formHooks.techs.error != '' && <p style={  {'color': 'red'}  }>{formHooks.techs.error}</p>}
            <button type="submit">Enviar</button>
        </form>
        {result && <p>{JSON.stringify(result)}</p>}
    </>
  )
}

export default Form

import { useState } from 'react'
import './form.css'
import { z } from 'zod'
import { createFormHook } from './formClass.tsx'

export default function Form() {

const [ result, setResult ] = useState('')
const [ techs, setTechs ] = useState([] as number[])
const FormSchema = z.object( {
    name: z.string().nonempty('Insira um nome'),
    email: z.string().nonempty('Insira um email').email('Insira um email válido')
    .refine(value => {return value.endsWith('hotmail.com')}, 'Insira um hotmail'),
    pass: z.string().nonempty('Insira uma senha').min(8, 'Senha muito curta: 8-15').max(15, 'Senha muito longa: 8-15'),
    techs: z.array( 
        z.string().nonempty('Digite uma tecnologia')
    ).optional()
} )
//console.log(typeof formschema)

type FormFieldName = 'name' | 'email' | 'pass' | 'techs';

const formHooks: any = {
    name: new createFormHook('name'),
    email: new createFormHook('email'),
    pass: new createFormHook('pass'),
    techs: new createFormHook('techs')
}

function inputCheck(e:React.FocusEvent<HTMLInputElement>, name:FormFieldName) {
    const value = name!=='techs'? e.target.value : [e.target.value]
    const nameSchema = FormSchema.shape[name]
    const result = nameSchema.safeParse(value)
    if (result.success) {
        formHooks[name].error = undefined
        e.target.style.border = ''
    } else {
        formHooks[name].error = result.error.issues[0].message
        e.target.style.border = '1px solid red'
    }

}

function display() {
    for (let key in formHooks) {
        if (formHooks[key].error) {
            return false
        }
    }

    setResult(():string => 'Enviado!')
}

  return (
    <div className='form-container'>
        <form id='form' onSubmit={e => {e.preventDefault() ; display()}}>


            <div>
                  <label>Nome:</label>
                  <input type="text" placeholder='Digite seu nome' onBlur={ e => inputCheck(e, 'name') } />
                  {formHooks.name.error != '' && <p style={  {'color': 'red'}  }>{formHooks.name.error}</p>}
            </div>
            <div>
                  <label>E-mail:</label>
                  <input type="email" placeholder='Digite seu email' onBlur={ e => inputCheck(e, 'email') } />
                  {formHooks.email.error != '' && <p style={  {'color': 'red'}  }>{formHooks.email.error}</p>}
            </div>
            <div>
                  <label>Senha:</label>
                  <input type="password" placeholder='Digite sua senha' onBlur={ e => inputCheck(e, 'pass') } />
                  {formHooks.pass.error != '' && <p style={  {'color': 'red'}  }>{formHooks.pass.error}</p>}
            </div>


            <div className='techs' style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <label>Tecnologias:</label>
                  <button type='button'
                  onClick={ () => { 
                        if (techs[0] === undefined) { setTechs(():number[] => [0]) }
                        else { setTechs((prev):number[] => [...prev, prev.length]) }
                        } }  >

                  Adicionar
                  </button>
            </div>
            <div>
                {
                    techs.map((e) => {return <input type='text' placeholder='Digite a tecnologia' 
                    //onBlur={ e => inputCheck(e, 'techs') } 
                    key={techs.indexOf(e)} />})
                } 
            </div>

            {formHooks.techs.error != '' && <p style={  {'color': 'red'}  }>{formHooks.techs.error}</p>}

            <button type="submit">Enviar</button>
            {result && <strong>{result}</strong>}
        </form>
    </div>
  )
}



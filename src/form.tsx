import { useState } from 'react'
import { FormSchema, formStateBase } from './utils'
import './form.css'

export default function Form() {

const [ formState, setFormState ] = useState(formStateBase)
const [ result, setResult ] = useState('')
const [ techs, setTechs ] = useState<number[]>([])


function inputCheck(e:React.FocusEvent<HTMLInputElement>, name: keyof typeof formStateBase) {
    const value = name!=='techs'? e.currentTarget.value : [e.currentTarget.value]
    const nameSchema = FormSchema.shape[name]
    const result = nameSchema.safeParse(value)
    if (result.success && formState[name]) {
        formState[name] = ''
        e.currentTarget.style.border = ''
        setFormState( {...formState} )
    } else if (!result.success) {
        formState[name] = result.error.issues[0].message
        e.currentTarget.style.border = '1px solid red'
        setFormState( {...formState} )
    }

}


function display() { 
    for (let key in formState) {
        if (formState[key as keyof typeof formStateBase]) {
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
                  {formState.name != '' && <p style={  {'color': 'red'}  }>{formState.name}</p>}
            </div>
            <div>
                  <label>E-mail:</label>
                  <input type="email" placeholder='Digite seu email' onBlur={ e => inputCheck(e, 'email') } />
                  {formState.email != '' && <p style={  {'color': 'red'}  }>{formState.email}</p>}
            </div>
            <div>
                  <label>Senha:</label>
                  <input type="password" placeholder='Digite sua senha' onBlur={ e => inputCheck(e, 'pass') } />
                  {formState.pass != '' && <p style={  {'color': 'red'}  }>{formState.pass}</p>}
            </div>


            <div className='techs' style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <label>Tecnologias:</label>
                  <button type='button'
                  onClick={ () => { 
                        if (techs[0] === undefined) { setTechs([0]) }
                        else { setTechs((prev) => [...prev, prev.length]) }
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

            {formState.techs != '' && <p style={  {'color': 'red'}  }>{formState.techs}</p>}

            <button type="submit">Enviar</button>
            {result && <strong>{result}</strong>}
        </form>
    </div>
  )
}



import { z } from 'zod';


export const FormSchema = z.object( {
    name: z.string().min(3, 'Insira um nome'),
    email: z.string().min(1, 'Insira um email').email('Insira um email válido')
    .refine(
        value => value.endsWith('hotmail.com'), 
        'Insira um hotmail'
    ),
    pass: z.string().min(1, 'Insira uma senha').min(8, 'Senha muito curta: 8-15').max(15, 'Senha muito longa: 8-15'),
    techs: z.array( 
        z.string().min(1, 'Digite uma tecnologia')
    ).optional()
} )

export const formStateBase = {
    name: "",
    email: "",
    pass: "",
    techs: ""
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
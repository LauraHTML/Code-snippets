"use client"
import { useState } from "react"
// import { auth0 } from "@/lib/auth0";
import { cadastro } from "@/services/cadastroService"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react"

export default function Cadastro() {
  const [email, setEmail] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [senha, setSenha] = useState<string>("")

  function handleSubmit(e){
    e.preventDefault()

    if (senha === '' || nome === '' || email === ''){
      alert('insira todas as informações para fazer cadastro')
    }
    else{
      alert('o cadastro está sendo realizado')
      cadastro(email, senha, nome)
    }}

    return (
      <>
        <Tabs variant={'cadastro'} defaultValue="cadastro" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="cadastro">
            <FieldSet>
              <FieldLegend>Crie sua conta</FieldLegend>
              <FieldDescription></FieldDescription>
              <FieldGroup>
                <form action="" onSubmit={handleSubmit}>
                  <Field>
                    <FieldLabel htmlFor="email">Nome</FieldLabel>
                    <Input name="nome" id="nome" onChange={(e) => setNome(e.target.value)} type={"text"} autoComplete="off" placeholder="seu nome" />
                    <FieldDescription>This appears on invoices and emails.</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Gmail</FieldLabel>
                    <Input name="email" id="email" type={"email"} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="nome@gmail.com" />
                    <FieldDescription>This appears on invoices and emails.</FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="senha">Senha</FieldLabel>
                    <Input name="senha" id="senha" type={"password"} onChange={(e) => setSenha(e.target.value)} autoComplete="off" placeholder="********" />

                  </Field>
                  <FieldSeparator />
                  <FieldGroup className="items-center py-4">
                    <FieldLabel>Ou se cadastre com</FieldLabel>
                    <Field orientation={"horizontal"} className="w-full items-center">
                      <Button className="w-1/2" variant={"secondary"}><IconBrandGithub />Github</Button>
                      <Button className="w-1/2" variant={"secondary"}><IconBrandGoogle />Google</Button>

                    </Field>
                  </FieldGroup>
                </form>
              </FieldGroup>
            </FieldSet>
            <Button className="w-full" onClick={handleSubmit}>Cadastrar</Button>
          </TabsContent>
          <TabsContent value="login">Change your password here.</TabsContent>
        </Tabs>
  </>)
}
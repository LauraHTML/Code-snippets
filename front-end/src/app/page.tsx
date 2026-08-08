"use client";
import { useState } from "react";
import { login } from "@/src/services/loginService";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { cadastro } from "@/src/services/cadastroService";
import { useRouter } from "next/navigation";


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
} from "@/src/components/ui/field"

import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"

import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react"

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [senha, setSenha] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)

  async function handleCadastro(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    setLoading(true);
    try {
      const response = await cadastro(email, senha, nome)
      toast.success(response.titulo, {
        position: "top-center", style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })
      setNome("");
      setEmail("");
      setSenha("");

      router.replace("/codigos");

    } catch (erro: any) {
      toast.error(`Erro no cadastro: ${erro.titulo}`, {
        description: `${erro.mensagem}`, position: "top-center", style: erro.status === 'erro' ? {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        } as React.CSSProperties : {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
          '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
        } as React.CSSProperties
      },)

    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setLoading(true)
    try {
      const response = await login(email, senha)
      toast.success(response.titulo, {
        description: `${response.mensagem}`,
        position: "top-center", style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })

      router.replace("/codigos")

    } catch (erro: any) {
      toast.error(`${erro.titulo}`, {
        description: `${erro.mensagem}`, position: "top-center", style: erro.status === 'erro' ? {
          '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
          '--normal-text': 'var(--destructive)',
          '--normal-border': 'var(--destructive)'
        } as React.CSSProperties : {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
          '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
        } as React.CSSProperties
      },)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Tabs variant={'cadastro'} defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value="cadastro">
          <FieldSet className="py-4">
            <FieldLegend>Crie sua conta</FieldLegend>
            <FieldDescription></FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nome">Nome</FieldLabel>
                <Input
                  name="nome"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  type="text"
                  autoComplete="none"
                  placeholder="seu nome"
                />
                {errors.nome && <FieldError>{errors.nome}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  id="email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="none"
                  placeholder="nome@gmail.com"
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="senha">Senha</FieldLabel>
                <Input
                  name="senha"
                  id="senha"
                  value={senha}
                  type="password"
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="none"
                  placeholder="********"
                />
                {errors.senha && <FieldError>{errors.senha}</FieldError>}
              </Field>

            </FieldGroup>
          </FieldSet>
          <Button className="w-full my-2" onClick={handleCadastro} disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </TabsContent>
        <TabsContent value="login">
          <FieldSet className="py-4">
            <FieldLegend>Faça Login</FieldLegend>
            <FieldDescription></FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="loginEmail">Email</FieldLabel>
                <Input
                  name="email"
                  id="loginEmail"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="nome@gmail.com"
                />

              </Field>
              <Field>
                <FieldLabel htmlFor="loginSenha">Senha</FieldLabel>
                <Input
                  name="senha"
                  id="loginSenha"
                  value={senha}
                  type="password"
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="off"
                  placeholder="********"
                />

              </Field>

            </FieldGroup>
          </FieldSet>
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </TabsContent>
      </Tabs>

    </>)
}
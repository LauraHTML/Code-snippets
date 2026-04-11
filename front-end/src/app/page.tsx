"use client";
import { useState } from "react";
import { login } from "@/src/services/loginService";
import { cadastro } from "@/src/services/cadastroService";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

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
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [nome, setNome] = useState<string>("")
  const [senha, setSenha] = useState<string>("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)

  async function handleCadastro(e) {
    e.preventDefault()
    setErrors({})

    // Validação local
    const newErrors: any = {}
    if (!nome.trim()) newErrors.nome = "Nome é obrigatório"
    if (!email.trim()) newErrors.email = "Email é obrigatório"
    if (!senha.trim()) newErrors.senha = "Senha é obrigatória"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
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
      setNome("")
      setEmail("")
      setSenha("")

      router.replace("/codigos")

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
      // Se for erro de email, colocar abaixo do campo
      if (erro.mensagem?.includes("email")) {
        setErrors({ email: erro.mensagem })
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    setErrors({})

    const newErrors: any = {}
    if (!email.trim()) newErrors.email = "Email é obrigatório"
    if (!senha.trim()) newErrors.senha = "Senha é obrigatória"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const response = await login(email, senha)
      toast.success(response.titulo, {
        position: "top-center", style: {
          '--normal-bg':
            'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
          '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
          '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
        } as React.CSSProperties
      })

      router.replace("/codigos")

    } catch (erro: any) {
      toast.error(`Erro no login: ${erro.titulo}`, {
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
          <FieldSet>
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
              <FieldSeparator />
              <FieldGroup className="items-center py-4">
                <FieldLabel>Ou se cadastre com</FieldLabel>
                <Field orientation={"horizontal"} className="w-full items-center">
                  <Button className="w-1/2" variant={"secondary"}><IconBrandGithub />Github</Button>
                  <Button className="w-1/2" variant={"secondary"}><IconBrandGoogle />Google</Button>

                </Field>
              </FieldGroup>
            </FieldGroup>
          </FieldSet>
          <Button className="w-full" onClick={handleCadastro} disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </TabsContent>
        <TabsContent value="login">
          <FieldSet>
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
                {errors.email && <FieldError>{errors.email}</FieldError>}
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
                {errors.senha && <FieldError>{errors.senha}</FieldError>}
              </Field>
              <FieldSeparator />
              <FieldGroup className="items-center py-4">
                <FieldLabel>Ou se cadastre com</FieldLabel>
                <Field orientation={"horizontal"} className="w-full items-center">
                  <Button className="w-1/2" variant={"secondary"}><IconBrandGithub />Github</Button>
                  <Button className="w-1/2" variant={"secondary"}><IconBrandGoogle />Google</Button>

                </Field>
              </FieldGroup>
            </FieldGroup>
          </FieldSet>
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </TabsContent>
      </Tabs>

    </>)
}
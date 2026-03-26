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
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

export default function Cadastro() {

    return (<>

        <Tabs variant={'cadastro'} defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <FieldSet>
                    <FieldLegend>Profile</FieldLegend>
                    <FieldDescription>This appears on invoices and emails.</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full name</FieldLabel>
                            <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
                            <FieldDescription>This appears on invoices and emails.</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input id="username" autoComplete="off" aria-invalid />
                            <FieldError>Choose another username.</FieldError>
                        </Field>
                        <FieldSeparator />
                        <FieldGroup>
                            <FieldLabel>Ou se cadastre com</FieldLabel>
                            <Field orientation={"horizontal"}>
                                <Button variant={"secondary"}><IconBrandGithub /></Button>
                                <Button variant={"secondary"}><IconBrandGoogle /></Button>
                            {/* <Button></Button> */}  
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </FieldSet>
                <Button className="w-full">Cadastrar</Button>
            </TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

    </>)
}
"use client"
import {  useForm} from "react-hook-form"
import {  toast} from "sonner"
import {  Form} from "@/components/ui/form"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "@/components/ui/field"
import {  Button} from "@/components/ui/button"
import {  Input} from "@/components/ui/input"
import { zodResolver} from "@hookform/resolvers/zod"
import { z} from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const formSchema = z.object({
  name_4229863997: z.array(z.string()).min(1, {
    error: "Please select at least one item"
  }),
  name_4784486496: z.string().min(1),
  name_9916620814: z.string(),
  name_7611287878: z.string()
});

export function ModalCodeEditor() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "name_4229863997": ["React"]
    },
  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <Field>
  <FieldLabel htmlFor="name_4229863997">Select your framework</FieldLabel>
  <Input 
    id="name_4229863997" 
    placeholder="Placeholder"
    {...form.register("name_4229863997")}
  />
  <FieldDescription>Select multiple options.</FieldDescription>
  <FieldError>{form.formState.errors.name_4229863997?.message}</FieldError>
</Field>
        <Field>
  <FieldLabel htmlFor="name_4784486496">Username</FieldLabel>
  <Input 
    id="name_4784486496" 
    placeholder="shadcn"
    
    {...form.register("name_4784486496")}
  />
  <FieldDescription>This is your public display name.</FieldDescription>
  <FieldError>{form.formState.errors.name_4784486496?.message}</FieldError>
</Field>
        <Field>
  <FieldLabel htmlFor="name_9916620814">Email</FieldLabel>
  <Select 
    
    {...form.register("name_9916620814")}
  >
    <SelectTrigger id="name_9916620814">
      <SelectValue placeholder="Select a verified email to display" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </Select>
  <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
  <FieldError>{form.formState.errors.name_9916620814?.message}</FieldError>
</Field>
        <Field>
  <FieldLabel htmlFor="name_7611287878">Bio</FieldLabel>
  <FieldDescription>You can @mention other users and organizations.</FieldDescription>
  <FieldError>{form.formState.errors.name_7611287878?.message}</FieldError>
</Field>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
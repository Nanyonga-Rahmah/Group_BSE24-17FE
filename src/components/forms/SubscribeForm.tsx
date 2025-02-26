import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  email: z.string().min(2, {
    message: 'Field is Required.'
  })
});

export function SubscribeForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="" >
       <div className='flex gap-5 border rounded-[10px] p-1 w-min'>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-[190px] md:w-[350px]">
              <FormControl>
                <Input placeholder="Your email address " className='border ' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-[30%] text-black">
          Subscribe
        </Button>
        </div>
      </form>
    </Form>
  );
}

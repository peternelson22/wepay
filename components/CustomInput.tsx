import { Control, FieldPath } from 'react-hook-form';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');
interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  type: string;
}

const CustomInput = ({
  control,
  placeholder,
  label,
  name,
  type,
}: CustomInput) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className='form-item'>
            <FormLabel className='form-label capitalize'>{label}</FormLabel>
            <div className='flex w-full flex-col'>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={type}
                  className='input-class'
                  {...field}
                />
              </FormControl>
              <FormMessage className='form-message' mt-2 />
            </div>
          </div>
        )}
      />
    </>
  );
};
export default CustomInput;

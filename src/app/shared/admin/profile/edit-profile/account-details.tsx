import { Input, Title } from 'rizzui';
import EditProfileCard from './edit-profile-card';

// import { Controller, useFormContext } from 'react-hook-form';
// import cn from '@/utils/class-names';
// import FormGroup from '@/app/shared/commons/form-group';
// import {
//   categoryOption,
//   typeOption,
// } from '@/app/shared/ecommerce/product/create-edit/form-utils';
// import dynamic from 'next/dynamic';
// import SelectLoader from '@/components/loader/select-loader';
// import QuillLoader from '@/components/loader/quill-loader';
// const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
//   ssr: false,
//   loading: () => <SelectLoader />,
// });
// const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
//   ssr: false,
//   loading: () => <QuillLoader className="col-span-full h-[143px]" />,
// });

export default function EditProfileAccountDetails({
  className,
}: {
  className?: string;
}) {
  // const {
  //   register,
  //   control,
  //   formState: { errors },
  // } = useFormContext();

  return (
    <div className='@container'>
        <div className="items-start pt-5 @xl:grid-cols-3 @5xl:grid @5xl:grid-cols-3 @5xl:gap-7 @6xl:grid-cols-3 @7xl:gap-10">

            {/* <EditProfileCard /> */}

            <div className="space-y-6 pt-14 @5xl:pt-0 col-span-2 @5xl:col-span-2 @5xl:space-y-10 @6xl:col-span-2">
                <form>     
                    <div className="mb-3.5 @5xl:mb-5">
                      <Title as="h3" className="text-base font-semibold @7xl:text-lg">
                        Account Details
                      </Title>
                    </div>

                    {/* Inputs */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Gender"
                        label="Gender"
                        size="lg"
                        inputClassName="text-sm"
                        defaultValue={'Female'}
                        disabled
                        // {...register('email')}
                        // error={errors.email?.message}
                        className="[&>label>span]:font-medium"
                      />
                      <Input
                        placeholder="Registered As"
                        label="Registered As*"
                        size="lg"
                        inputClassName="text-sm"
                        defaultValue={'Fundi'}
                        disabled
                        // {...register('firstName')}
                        // error={errors.firstName?.message}
                        className="[&>label>span]:font-medium"
                      />
                      <Input
                        placeholder="Level/Class"
                        label="Level/Class"
                        size="lg"
                        inputClassName="text-sm"
                        defaultValue={'Masterfundi'}
                        disabled
                        // {...register('lastName')}
                        // error={errors.lastName?.message}
                        className="[&>label>span]:font-medium"
                      />
                      <Input
                        placeholder="Years of experience"
                        label="Years of experience"
                        size="lg"
                        inputClassName="text-sm"
                        defaultValue={'8'}
                        disabled
                        // {...register('phoneNo')}
                        // error={errors.phoneNo?.message}
                        className="[&>label>span]:font-medium"
                      />
                    </div>                
                </form>
            </div>
        </div>
    </div>
  );
}

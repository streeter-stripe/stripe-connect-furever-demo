'use client';

import * as React from 'react';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {ArrowRight, Loader2} from 'lucide-react';
import {businessTypes, countries} from '@/types/account';

const businessTypeLabels = {
  individual: 'Independent salon',
  company: 'Chain of salons',
  other: 'Other',
};

const countryLabels = {
  AE: 'United Arab Emirates',
  AG: 'Antigua and Barbuda',
  AL: 'Albania',
  AM: 'Armenia',
  AR: 'Argentina',
  AT: 'Austria',
  AU: 'Australia',
  BA: 'Bosnia and Herzegovina',
  BE: 'Belgium',
  BG: 'Bulgaria',
  BH: 'Bahrain',
  BJ: 'Benin',
  BN: 'Brunei Darussalam',
  BO: 'Bolivia',
  BR: 'Brazil',
  BS: 'Bahamas',
  BW: 'Botswana',
  CA: 'Canada',
  CH: 'Switzerland',
  CI: "Côte D'Ivoire",
  CL: 'Chile',
  CO: 'Colombia',
  CR: 'Costa Rica',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DE: 'Germany',
  DK: 'Denmark',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EE: 'Estonia',
  EG: 'Egypt',
  ES: 'Spain',
  ET: 'Ethiopia',
  FI: 'Finland',
  FR: 'France',
  GB: 'United Kingdom',
  GH: 'Ghana',
  GM: 'Gambia',
  GR: 'Greece',
  GT: 'Guatemala',
  GY: 'Guyana',
  HK: 'Hong Kong',
  HR: 'Croatia',
  HU: 'Hungary',
  ID: 'Indonesia',
  IE: 'Ireland',
  IL: 'Israel',
  IN: 'India',
  IS: 'Iceland',
  IT: 'Italy',
  JM: 'Jamaica',
  JO: 'Jordan',
  JP: 'Japan',
  KE: 'Kenya',
  KH: 'Cambodia',
  KR: 'Republic of Korea',
  KW: 'Kuwait',
  LC: 'Saint Lucia',
  LI: 'Liechtenstein',
  LK: 'Sri Lanka',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  LV: 'Latvia',
  MA: 'Morocco',
  MC: 'Monaco',
  MD: 'Republic of Moldolva',
  MG: 'Madagascar',
  MK: 'North Macedonia',
  MN: 'Mongolia',
  MO: 'Macau',
  MT: 'Malta',
  MU: 'Mauritius',
  MX: 'Mexico',
  MY: 'Malaysia',
  NA: 'Namibia',
  NG: 'Nigeria',
  NL: 'Netherlands',
  NO: 'Norway',
  NZ: 'New Zealand',
  OM: 'Oman',
  PA: 'Panama',
  PE: 'Peru',
  PH: 'Philippines',
  PK: 'Pakistan',
  PL: 'Poland',
  PT: 'Portugal',
  PY: 'Paraguay',
  QA: 'Qatar',
  RO: 'Romania',
  RS: 'Serbia',
  RW: 'Rwanda',
  SA: 'Saudi Arabia',
  SE: 'Sweden',
  SG: 'Singapore',
  SI: 'Slovenia',
  SK: 'Slovakia',
  SN: 'Senegal',
  SV: 'El Salvador',
  TH: 'Thailand',
  TN: 'Tunisia',
  TR: 'Turkey',
  TT: 'Trinidad and Tobago',
  TW: 'Taiwan',
  TZ: 'United Republic of Tanzania',
  US: 'United States',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VN: 'Vietnam',
  ZA: 'South Africa',
};

const formSchema = z.object({
  businessType: z.enum(businessTypes),
  businessName: z
    .string({
      required_error: 'Business name is required',
    })
    .min(3, {message: 'Business name must be 3 or more characters'}),
  country: z.enum(countries),
});

export default function BusinessDetailsForm({email}: {email: string}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: 'individual',
      businessName: '',
      country: 'US',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn('createaccount', {
        email: email,
        businessType: values.businessType,
        businessName: values.businessName,
        country: values.country,
        redirect: false,
      });

      router.push('/onboarding');
    } catch (error: any) {
      console.error('An error occured', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 w-full space-y-4 text-primary"
      >
        <div className="flex flex-col gap-y-6">
          <div>
            <FormField
              control={form.control}
              name="businessType"
              render={({field}) => (
                <>
                  <FormLabel className="text-base text-primary">
                    Business type
                  </FormLabel>
                  {businessTypes.map((option) => (
                    <FormItem key={option}>
                      <div className="mt-2 flex h-5 flex-row items-start justify-items-start space-x-2">
                        <FormControl>
                          <Input
                            {...field}
                            className="border-accent-300 h-[14px] w-[14px] rounded-md border placeholder:text-gray-400"
                            type="radio"
                            value={option}
                            checked={field.value === option}
                          />
                        </FormControl>
                        <FormLabel>{businessTypeLabels[option]}</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  ))}
                </>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="businessName"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-base text-primary">
                    Business name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="mt-1 placeholder:text-gray-400"
                      placeholder="My business name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="country"
              render={({field}) => (
                <>
                  <FormLabel className="text-base text-primary">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue>{countryLabels[field.value]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((option) => (
                          <SelectItem key={option} value={option}>
                            {countryLabels[option]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </>
              )}
            />
          </div>

          <div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={
                'w-full items-center gap-1 rounded-md bg-accent text-white'
              }
            >
              {form.formState.isSubmitting ||
              form.formState.isSubmitSuccessful ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  <p>Continue</p>
                  <ArrowRight size="20" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

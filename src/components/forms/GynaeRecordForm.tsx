import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { mockPatients } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const gynaeSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient'),
  date: z.string().min(1, 'Date is required'),
  lmpDate: z.string().min(1, 'LMP date is required'),
  eddDate: z.string().optional(),
  visitType: z.enum(['prenatal', 'postnatal', 'routine', 'emergency']),
  bloodPressure: z.string().min(1, 'Blood pressure is required'),
  weight: z.string().min(1, 'Weight is required'),
  fetalHeartRate: z.string().optional(),
  gestationalAge: z.string().optional(),
  notes: z.string().optional(),
  nextVisit: z.string().optional(),
});

type GynaeFormData = z.infer<typeof gynaeSchema>;

interface GynaeRecordFormProps {
  onSuccess?: () => void;
}

export function GynaeRecordForm({ onSuccess }: GynaeRecordFormProps) {
  const form = useForm<GynaeFormData>({
    resolver: zodResolver(gynaeSchema),
    defaultValues: {
      patientId: '',
      date: new Date().toISOString().split('T')[0],
      lmpDate: '',
      eddDate: '',
      visitType: 'routine',
      bloodPressure: '',
      weight: '',
      fetalHeartRate: '',
      gestationalAge: '',
      notes: '',
      nextVisit: '',
    },
  });

  const visitType = form.watch('visitType');

  const onSubmit = (data: GynaeFormData) => {
    console.log('Gynae record data:', data);
    toast({
      title: 'Record Added',
      description: 'The gynae record has been successfully added.',
    });
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockPatients.filter(p => p.gender === 'female').map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visitType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visit Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visit type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="prenatal">Prenatal</SelectItem>
                    <SelectItem value="postnatal">Postnatal</SelectItem>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visit Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lmpDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Menstrual Period (LMP)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(visitType === 'prenatal' || visitType === 'postnatal') && (
            <>
              <FormField
                control={form.control}
                name="eddDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Delivery Date (EDD)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gestationalAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gestational Age</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 28 weeks 4 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fetalHeartRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fetal Heart Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 145 bpm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="bloodPressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 120/80" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 65 kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextVisit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Visit Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional notes..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit">Save Record</Button>
        </div>
      </form>
    </Form>
  );
}

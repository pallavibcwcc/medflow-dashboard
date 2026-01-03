import { Report } from '@/types/medical';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ReportPreviewProps {
  report: Report;
}

export function ReportPreview({ report }: ReportPreviewProps) {
  const handleDownload = () => {
    const content = `
MEDICAL REPORT
=====================================

Report Title: ${report.title}
Report Type: ${report.type.toUpperCase()}
Date: ${format(new Date(report.date), 'MMMM dd, yyyy')}
Status: ${report.status.toUpperCase()}

-------------------------------------
PATIENT INFORMATION
-------------------------------------
Patient Name: ${report.patientName}
Patient ID: ${report.patientId}

-------------------------------------
PHYSICIAN INFORMATION
-------------------------------------
Doctor: ${report.doctorName}

-------------------------------------
FINDINGS
-------------------------------------
${report.findings || 'No findings recorded.'}

=====================================
Generated on: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}_${report.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-semibold">{report.title}</h2>
          <p className="text-sm text-muted-foreground capitalize">{report.type} Report</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Separator />

      {/* Report Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Patient Name</p>
          <p className="font-medium">{report.patientName}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-medium">{format(new Date(report.date), 'MMMM dd, yyyy')}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Doctor</p>
          <p className="font-medium">{report.doctorName}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium capitalize">{report.status}</p>
        </div>
      </div>

      <Separator />

      {/* Findings */}
      <div>
        <h3 className="font-semibold mb-3">Findings</h3>
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {report.findings || 'No findings recorded for this report.'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
        Report generated on {format(new Date(), 'MMMM dd, yyyy')} at {format(new Date(), 'HH:mm')}
      </div>
    </div>
  );
}

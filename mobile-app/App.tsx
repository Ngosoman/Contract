import { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const packageTiers = [
  {
    id: 'Starter',
    name: 'Starter',
    price: 900,
    description: 'Essential digital presence for new businesses.',
    features: ['Landing page', 'Basic branding', 'Contact form', '1 round of revisions'],
  },
  {
    id: 'Growth',
    name: 'Growth',
    price: 2200,
    description: 'A stronger, high-converting online presence.',
    features: ['Multi-page website', 'Custom design system', 'Lead capture', 'Priority support'],
  },
  {
    id: 'Premium',
    name: 'Premium',
    price: 4800,
    description: 'Premium experience for scaling brands and products.',
    features: ['Custom React experience', 'Advanced flows', 'CMS integration', 'Launch strategy'],
  },
  {
    id: 'Custom',
    name: 'Custom',
    price: 0,
    description: 'Tailored scope and pricing for the exact project.',
    features: ['Flexible scope', 'Custom estimate', 'Strategy planning', 'Dedicated roadmap'],
  },
];

const documentTypes = [
  'Client Agreement',
  'Welcome Doc',
  'Invoice',
  'Project Brief',
  'Delivery Guide',
  'Monthly Report',
  'Payment',
  'Thank You Doc',
  'Feedback Doc',
  'Package Menu',
];

const initialForm = {
  businessName: 'Ngosoman Studios',
  clientName: 'Apex Wellness',
  clientEmail: 'hello@apexwellness.com',
  clientPhone: '+254 712 345 678',
  projectName: 'Brand refresh and lead generation website',
  serviceType: 'React Web App',
  packageTier: 'Growth',
  projectScope: 'Landing page, service pages, blog structure, WhatsApp funnel, and custom UI design.',
  paymentPlan: '50% upfront, 40% mid-project, 10% upon launch.',
  startDate: '2026-09-15',
  dueDate: '2026-10-15',
  projectValue: 4200,
  setupFee: 650,
  hourlyRate: 95,
  estimatedHours: 42,
  invoiceNumber: 'INV-2026-011',
  notes: 'We will move quickly with weekly milestone updates and final handover support.',
  signName: 'Client legal name',
  signDate: '2026-09-15',
  managerName: 'Jane Mwangi',
  managerRole: 'Founder & Creative Director',
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [activeDoc, setActiveDoc] = useState('Client Agreement');

  const packageInfo = useMemo(() => {
    const selected = packageTiers.find((tier) => tier.id === form.packageTier) ?? packageTiers[1];
    const serviceMultiplier =
      form.serviceType === 'React Web App'
        ? 1.2
        : form.serviceType === 'Landing Page'
          ? 0.8
          : form.serviceType === 'Custom Website'
            ? 1.5
            : 1;

    const priceFromHours = Number(form.hourlyRate) * Number(form.estimatedHours);
    const baseProjectValue = Number(form.projectValue) || Math.round(priceFromHours * serviceMultiplier);
    const totalValue = Math.round(baseProjectValue + Number(form.setupFee));

    return { selected, totalValue };
  }, [form]);

  const updateField = (field: keyof typeof initialForm, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const renderDocumentContent = () => {
    const projectValue = packageInfo.totalValue;

    switch (activeDoc) {
      case 'Client Agreement':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>Client: {form.clientName}</Text>
            <Text style={styles.previewText}>Project: {form.projectName}</Text>
            <Text style={styles.previewText}>Scope: {form.projectScope}</Text>
            <Text style={styles.previewText}>Terms: {form.paymentPlan}</Text>
            <Text style={styles.previewText}>
              By signing this agreement, the client confirms they understand the scope, timeline,
              milestones, communication process, and payment schedule. No work will begin until this
              agreement is signed and payment is accepted.
            </Text>
            <Text style={styles.previewText}>Signed by: {form.signName}</Text>
            <Text style={styles.previewText}>Date: {form.signDate}</Text>
          </View>
        );
      case 'Welcome Doc':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>Welcome to {form.businessName}.</Text>
            <Text style={styles.previewText}>We are excited to begin this project with {form.clientName}.</Text>
            <Text style={styles.previewText}>• Review the project brief and final scope</Text>
            <Text style={styles.previewText}>• Confirm the package and payment schedule</Text>
            <Text style={styles.previewText}>• Receive a kickoff call and asset request form</Text>
            <Text style={styles.previewText}>• Approve each milestone before final delivery</Text>
          </View>
        );
      case 'Invoice':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>Invoice #{form.invoiceNumber}</Text>
            <Text style={styles.previewText}>Bill To: {form.clientName}</Text>
            <Text style={styles.previewText}>Email: {form.clientEmail}</Text>
            <Text style={styles.previewText}>Total due: {formatCurrency(projectValue)}</Text>
            <Text style={styles.previewText}>Setup fee: {formatCurrency(Number(form.setupFee))}</Text>
            <Text style={styles.previewText}>Payment terms: {form.paymentPlan}</Text>
          </View>
        );
      case 'Project Brief':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>Client: {form.clientName}</Text>
            <Text style={styles.previewText}>Project type: {form.serviceType}</Text>
            <Text style={styles.previewText}>Objective: {form.projectName}</Text>
            <Text style={styles.previewText}>Scope: {form.projectScope}</Text>
            <Text style={styles.previewText}>Budget estimate: {formatCurrency(projectValue)}</Text>
          </View>
        );
      case 'Delivery Guide':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>1. Discovery and strategy alignment</Text>
            <Text style={styles.previewText}>2. Visual direction and approval</Text>
            <Text style={styles.previewText}>3. Build and refinement in weekly checkpoints</Text>
            <Text style={styles.previewText}>4. QA, launch prep, and final handover</Text>
            <Text style={styles.previewText}>Our process is designed to feel premium, transparent, and easy to follow.</Text>
          </View>
        );
      case 'Monthly Report':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>Project status: On track</Text>
            <Text style={styles.previewText}>Discovery and planning completed</Text>
            <Text style={styles.previewText}>Design direction approved</Text>
            <Text style={styles.previewText}>Core build in progress</Text>
            <Text style={styles.previewText}>Progress summary: {form.notes}</Text>
          </View>
        );
      case 'Payment':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>Invoice: {form.invoiceNumber}</Text>
            <Text style={styles.previewText}>Payment plan: {form.paymentPlan}</Text>
            <Text style={styles.previewText}>Total project value: {formatCurrency(projectValue)}</Text>
            <Text style={styles.previewText}>Bank/Wallet details shared after approval.</Text>
          </View>
        );
      case 'Thank You Doc':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>Thank you for trusting {form.businessName}.</Text>
            <Text style={styles.previewText}>We value your confidence and are excited to help bring your vision to life.</Text>
            <Text style={styles.previewText}>Warm regards,</Text>
            <Text style={styles.previewText}>{form.managerName}</Text>
            <Text style={styles.previewText}>{form.managerRole}</Text>
          </View>
        );
      case 'Feedback Doc':
        return (
          <View style={styles.previewBlock}>
            <Text style={styles.previewText}>We would love to hear about your experience.</Text>
            <Text style={styles.previewText}>How would you rate the communication experience?</Text>
            <Text style={styles.previewText}>What part of the process felt most valuable?</Text>
            <Text style={styles.previewText}>Would you recommend our services?</Text>
          </View>
        );
      case 'Package Menu':
        return (
          <View style={styles.previewBlock}>
            {packageTiers.map((tier) => (
              <View
                key={tier.id}
                style={[
                  styles.packageCard,
                  form.packageTier === tier.id && styles.packageCardSelected,
                ]}
              >
                <Text style={styles.packageTitle}>{tier.name}</Text>
                <Text style={styles.packagePrice}>{tier.price ? formatCurrency(tier.price) : 'Custom quote'}</Text>
                <Text style={styles.previewText}>{tier.description}</Text>
                {tier.features.map((feature) => (
                  <Text key={feature} style={styles.previewText}>• {feature}</Text>
                ))}
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerWrap}>
          <Text style={styles.kicker}>Ngosoman Studios</Text>
          <Text style={styles.title}>{form.businessName}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current estimate</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(packageInfo.totalValue)}</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Selected package</Text>
            <Text style={styles.summaryValue}>{form.packageTier}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Service type</Text>
            <Text style={styles.summaryValue}>{form.serviceType}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Client details</Text>
        <View style={styles.formGrid}>
          <TextInput
            value={form.businessName}
            onChangeText={(value) => updateField('businessName', value)}
            style={styles.input}
            placeholder="Business name"
          />
          <TextInput
            value={form.clientName}
            onChangeText={(value) => updateField('clientName', value)}
            style={styles.input}
            placeholder="Client name"
          />
          <TextInput
            value={form.clientEmail}
            onChangeText={(value) => updateField('clientEmail', value)}
            style={styles.input}
            placeholder="Client email"
            keyboardType="email-address"
          />
          <TextInput
            value={form.clientPhone}
            onChangeText={(value) => updateField('clientPhone', value)}
            style={styles.input}
            placeholder="Phone"
          />
          <TextInput
            value={form.projectName}
            onChangeText={(value) => updateField('projectName', value)}
            style={styles.inputFull}
            placeholder="Project name"
          />
          <TextInput
            value={form.projectScope}
            onChangeText={(value) => updateField('projectScope', value)}
            style={styles.inputFull}
            placeholder="Project scope"
            multiline
          />
          <TextInput
            value={form.paymentPlan}
            onChangeText={(value) => updateField('paymentPlan', value)}
            style={styles.inputFull}
            placeholder="Payment plan"
            multiline
          />
          <TextInput
            value={form.notes}
            onChangeText={(value) => updateField('notes', value)}
            style={styles.inputFull}
            placeholder="Progress notes"
            multiline
          />
        </View>

        <Text style={styles.sectionTitle}>Document templates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabRow}>
          {documentTypes.map((doc) => (
            <TouchableOpacity
              key={doc}
              style={[styles.tabButton, activeDoc === doc && styles.tabButtonActive]}
              onPress={() => setActiveDoc(doc)}
            >
              <Text style={[styles.tabText, activeDoc === doc && styles.tabTextActive]}>{doc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.previewCard}>
          <Text style={styles.previewHeader}>{activeDoc}</Text>
          {renderDocumentContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerWrap: {
    marginBottom: 16,
  },
  kicker: {
    color: '#7c3aed',
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryLabel: {
    color: '#6b7280',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
  },
  summaryKey: {
    color: '#4b5563',
    fontSize: 14,
  },
  summaryValue: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 12,
  },
  formGrid: {
    gap: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe3ef',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  inputFull: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe3ef',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    minHeight: 90,
    textAlignVertical: 'top',
  },
  tabRow: {
    marginBottom: 16,
  },
  tabButton: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  tabButtonActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  tabText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  tabTextActive: {
    color: '#fff',
  },
  previewCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  previewHeader: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 22,
    marginBottom: 12,
  },
  previewBlock: {
    gap: 6,
  },
  previewText: {
    color: '#1f2937',
    fontSize: 15,
    lineHeight: 22,
  },
  packageCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  packageCardSelected: {
    borderColor: '#7c3aed',
    backgroundColor: '#f5f3ff',
  },
  packageTitle: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 16,
  },
  packagePrice: {
    color: '#7c3aed',
    fontWeight: '700',
    fontSize: 18,
    marginVertical: 6,
  },
});

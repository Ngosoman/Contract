import { useMemo, useState } from 'react'
import './App.css'

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
]

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
]

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
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [activeDoc, setActiveDoc] = useState('Client Agreement')

  const packageInfo = useMemo(() => {
    const selected = packageTiers.find((tier) => tier.id === form.packageTier) ?? packageTiers[1]
    const serviceMultiplier =
      form.serviceType === 'React Web App'
        ? 1.2
        : form.serviceType === 'Landing Page'
          ? 0.8
          : form.serviceType === 'Custom Website'
            ? 1.5
            : 1

    const priceFromHours = Number(form.hourlyRate) * Number(form.estimatedHours)
    const baseProjectValue = Number(form.projectValue) || Math.round(priceFromHours * serviceMultiplier)
    const totalValue = Math.round(baseProjectValue + Number(form.setupFee))

    return {
      selected,
      priceFromHours,
      serviceMultiplier,
      totalValue,
    }
  }, [form])

  const updateField = (field: keyof typeof initialForm, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const printDocument = () => {
    window.print()
  }

  const downloadHtml = () => {
    const blob = new Blob([document.querySelector('.doc-preview')?.innerHTML || ''], {
      type: 'text/html',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${form.projectName.replace(/\s+/g, '-').toLowerCase()}-${activeDoc.toLowerCase().replace(/\s+/g, '-')}.html`
    link.click()
    URL.revokeObjectURL(url)
  }

  const renderDocument = () => {
    const projectValue = packageInfo.totalValue
    const docType = activeDoc

    const card = (
      <div className="doc-template">
        <div className="doc-header-row">
          <div>
            <p className="eyebrow">{form.businessName}</p>
            <h3>{docType}</h3>
          </div>
          <span className="status-pill">Prepared for client</span>
        </div>

        {docType === 'Client Agreement' && (
          <>
            <p><strong>Client:</strong> {form.clientName}</p>
            <p><strong>Project:</strong> {form.projectName}</p>
            <p><strong>Scope:</strong> {form.projectScope}</p>
            <p><strong>Terms:</strong> {form.paymentPlan}</p>
            <p>
              By signing this agreement, the client confirms they understand the scope, timeline,
              milestones, communication process, and payment schedule. No work will begin until this
              agreement is signed and payment terms are accepted.
            </p>
            <div className="signature-block">
              <div>
                <label>Client name</label>
                <input value={form.signName} onChange={(e) => updateField('signName', e.target.value)} />
              </div>
              <div>
                <label>Date</label>
                <input type="date" value={form.signDate} onChange={(e) => updateField('signDate', e.target.value)} />
              </div>
            </div>
          </>
        )}

        {docType === 'Welcome Doc' && (
          <>
            <p>Welcome to {form.businessName}. We are excited to begin this project with {form.clientName}.</p>
            <p>Our onboarding process is simple: we confirm the scope, share a timeline, set milestone dates, and provide a clear communication rhythm.</p>
            <ul>
              <li>Review the project brief and final scope</li>
              <li>Confirm the package and payment schedule</li>
              <li>Receive a kickoff call and asset request form</li>
              <li>Approve each milestone before final delivery</li>
            </ul>
          </>
        )}

        {docType === 'Invoice' && (
          <>
            <div className="invoice-topline">
              <div>
                <p className="eyebrow">Invoice #{form.invoiceNumber}</p>
                <h4>{form.businessName}</h4>
              </div>
              <div className="amount-box">{formatCurrency(projectValue)}</div>
            </div>
            <p><strong>Bill To:</strong> {form.clientName}</p>
            <p><strong>Email:</strong> {form.clientEmail}</p>
            <p><strong>Project:</strong> {form.projectName}</p>
            <div className="invoice-table">
              <div><span>Setup fee</span><strong>{formatCurrency(Number(form.setupFee))}</strong></div>
              <div><span>Project value</span><strong>{formatCurrency(Number(form.projectValue))}</strong></div>
              <div><span>Total due</span><strong>{formatCurrency(projectValue)}</strong></div>
            </div>
            <p><strong>Payment terms:</strong> {form.paymentPlan}</p>
            <p><strong>Due date:</strong> {form.dueDate}</p>
          </>
        )}

        {docType === 'Project Brief' && (
          <>
            <p><strong>Client:</strong> {form.clientName}</p>
            <p><strong>Project type:</strong> {form.serviceType}</p>
            <p><strong>Objective:</strong> {form.projectName}</p>
            <p><strong>Scope:</strong> {form.projectScope}</p>
            <p><strong>Timeline:</strong> {form.startDate} to {form.dueDate}</p>
            <p><strong>Deliverables:</strong> design concept, UI build, content structure, QA review, final handoff.</p>
            <p><strong>Budget estimate:</strong> {formatCurrency(projectValue)}</p>
          </>
        )}

        {docType === 'Delivery Guide' && (
          <>
            <p>We deliver premium experiences through a structured and concierge-style process.</p>
            <ol>
              <li>Discovery and strategy alignment</li>
              <li>Visual direction and wireframe approval</li>
              <li>Build and refinement in weekly checkpoints</li>
              <li>QA, launch prep, and final handover</li>
            </ol>
            <p>Our process is built to feel elevated, transparent, and easy to follow while keeping the client informed at every step.</p>
          </>
        )}

        {docType === 'Monthly Report' && (
          <>
            <p><strong>Month:</strong> September 2026</p>
            <p><strong>Project status:</strong> On track</p>
            <ul>
              <li>Discovery and planning completed</li>
              <li>Design direction approved</li>
              <li>Core build in progress</li>
              <li>Next milestone: review and refinements</li>
            </ul>
            <p><strong>Progress summary:</strong> {form.notes}</p>
          </>
        )}

        {docType === 'Payment' && (
          <>
            <p><strong>Invoice:</strong> {form.invoiceNumber}</p>
            <p><strong>Payment plan:</strong> {form.paymentPlan}</p>
            <p><strong>Client:</strong> {form.clientName}</p>
            <p><strong>Total project value:</strong> {formatCurrency(projectValue)}</p>
            <p><strong>Bank/Wallet details:</strong> Available on request or shared after approval.</p>
            <p>All payments are due according to the agreed milestones and accepted before final delivery.</p>
          </>
        )}

        {docType === 'Thank You Doc' && (
          <>
            <p>Thank you for trusting {form.businessName} with your project.</p>
            <p>We value your confidence and are excited to help bring your vision to life.</p>
            <p>We look forward to a successful partnership and a strong final outcome.</p>
            <p>Warm regards,<br />{form.managerName}<br />{form.managerRole}</p>
          </>
        )}

        {docType === 'Feedback Doc' && (
          <>
            <p>We would love to hear about your experience.</p>
            <p>Please share what stood out, what could be improved, and how we did from start to finish.</p>
            <ul>
              <li>How would you rate the communication experience?</li>
              <li>What part of the process felt most valuable?</li>
              <li>Would you recommend our services?</li>
            </ul>
            <p>Thank you for helping us continue to deliver premium work.</p>
          </>
        )}

        {docType === 'Package Menu' && (
          <>
            <p className="menu-title">Service menu</p>
            <div className="package-menu-grid">
              {packageTiers.map((tier) => (
                <div key={tier.id} className={`menu-item ${form.packageTier === tier.id ? 'selected' : ''}`}>
                  <h4>{tier.name}</h4>
                  <p className="menu-price">{tier.price ? formatCurrency(tier.price) : 'Custom quote'}</p>
                  <p>{tier.description}</p>
                  <ul>
                    {tier.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )

    return card
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="brand-kicker">Ngosoman Studios</p>
          <h1>{form.businessName}</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="secondary-btn" onClick={printDocument}>Print</button>
          <button type="button" className="primary-btn" onClick={downloadHtml}>Download</button>
        </div>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="pill">Premium client experience</span>
          <h2>Generate polished client documents in minutes.</h2>
          <p>
            Capture your client details once and create agreement, invoice, brief, payment,
            reporting, and thank-you documents without starting from scratch.
          </p>
        </div>
        <div className="pricing-summary">
          <p className="eyebrow">Current estimate</p>
          <h3>{formatCurrency(packageInfo.totalValue)}</h3>
          <div className="summary-row">
            <span>Selected package</span>
            <strong>{form.packageTier}</strong>
          </div>
          <div className="summary-row">
            <span>Service type</span>
            <strong>{form.serviceType}</strong>
          </div>
          <div className="summary-row">
            <span>Project value</span>
            <strong>{formatCurrency(Number(form.projectValue))}</strong>
          </div>
        </div>
      </section>

      <main className="workspace-grid">
        <aside className="panel form-panel">
          <h3>Client settings</h3>

          <div className="field-grid">
            <label>
              Business name
              <input value={form.businessName} onChange={(e) => updateField('businessName', e.target.value)} />
            </label>
            <label>
              Client name
              <input value={form.clientName} onChange={(e) => updateField('clientName', e.target.value)} />
            </label>
            <label>
              Client email
              <input value={form.clientEmail} onChange={(e) => updateField('clientEmail', e.target.value)} />
            </label>
            <label>
              Phone
              <input value={form.clientPhone} onChange={(e) => updateField('clientPhone', e.target.value)} />
            </label>
            <label>
              Project name
              <input value={form.projectName} onChange={(e) => updateField('projectName', e.target.value)} />
            </label>
            <label>
              Service type
              <select value={form.serviceType} onChange={(e) => updateField('serviceType', e.target.value)}>
                <option>Landing Page</option>
                <option>React Web App</option>
                <option>Custom Website</option>
                <option>Brand System</option>
              </select>
            </label>
            <label>
              Package tier
              <select value={form.packageTier} onChange={(e) => updateField('packageTier', e.target.value)}>
                {packageTiers.map((tier) => (
                  <option key={tier.id} value={tier.id}>{tier.name}</option>
                ))}
              </select>
            </label>
            <label>
              Project value
              <input type="number" value={form.projectValue} onChange={(e) => updateField('projectValue', Number(e.target.value))} />
            </label>
            <label>
              Setup fee
              <input type="number" value={form.setupFee} onChange={(e) => updateField('setupFee', Number(e.target.value))} />
            </label>
            <label>
              Hourly rate
              <input type="number" value={form.hourlyRate} onChange={(e) => updateField('hourlyRate', Number(e.target.value))} />
            </label>
            <label>
              Estimated hours
              <input type="number" value={form.estimatedHours} onChange={(e) => updateField('estimatedHours', Number(e.target.value))} />
            </label>
            <label>
              Start date
              <input type="date" value={form.startDate} onChange={(e) => updateField('startDate', e.target.value)} />
            </label>
            <label>
              Due date
              <input type="date" value={form.dueDate} onChange={(e) => updateField('dueDate', e.target.value)} />
            </label>
            <label className="full-span">
              Project scope
              <textarea value={form.projectScope} onChange={(e) => updateField('projectScope', e.target.value)} />
            </label>
            <label className="full-span">
              Payment plan
              <textarea value={form.paymentPlan} onChange={(e) => updateField('paymentPlan', e.target.value)} />
            </label>
            <label className="full-span">
              Progress notes
              <textarea value={form.notes} onChange={(e) => updateField('notes', e.target.value)} />
            </label>
          </div>
        </aside>

        <section className="panel preview-panel">
          <div className="doc-tabs">
            {documentTypes.map((doc) => (
              <button
                key={doc}
                type="button"
                className={doc === activeDoc ? 'tab active' : 'tab'}
                onClick={() => setActiveDoc(doc)}
              >
                {doc}
              </button>
            ))}
          </div>

          <div className="doc-preview">{renderDocument()}</div>
        </section>
      </main>
    </div>
  )
}

export default App

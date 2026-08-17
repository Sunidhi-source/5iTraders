// A small, dependency-free country-code selector. Extend COUNTRY_CODES
// with more entries as needed — kept short here to stay fast and simple.
const COUNTRY_CODES = [
  { code: '+1', label: 'US/CA' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'IN' },
  { code: '+61', label: 'AU' },
  { code: '+971', label: 'AE' },
  { code: '+27', label: 'ZA' },
  { code: '+234', label: 'NG' },
  { code: '+92', label: 'PK' },
  { code: '+63', label: 'PH' },
  { code: '+49', label: 'DE' },
  { code: '+33', label: 'FR' },
  { code: '+65', label: 'SG' },
]

export default function PhoneInput({ countryCode, phone, onCountryChange, onPhoneChange, error }) {
  return (
    <div>
      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          aria-label="Country code"
          className="input-field w-[110px] shrink-0 font-mono text-sm"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code + c.label} value={c.code}>
              {c.code} {c.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value.replace(/[^\d\s-]/g, ''))}
          placeholder="Phone number"
          aria-label="Phone number"
          aria-invalid={!!error}
          className="input-field flex-1"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-loss">{error}</p>}
    </div>
  )
}

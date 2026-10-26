export interface Country {
  name: string
  code: string // ISO 3166-1 alpha-2
}

export interface Region {
  id: string
  name: string
  icon: string // globe emoji
  countries: Country[]
}

// Converts an ISO alpha-2 code (e.g. "IQ") to its flag emoji.
// (Kept as a fallback; on Windows browsers emoji flags render as letters,
//  so the UI uses flagUrl() image flags instead.)
export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
}

// Colored flag image (SVG) by ISO alpha-2 code — renders on every platform.
export function flagUrl(code: string): string {
  return `https://flagcdn.com/${code.toLowerCase()}.svg`
}

const sort = (list: Country[]) => [...list].sort((a, b) => a.name.localeCompare(b.name))

export const regions: Region[] = [
  {
    id: 'apac',
    name: 'Asia / Pacific',
    icon: '🌏',
    countries: sort([
      { name: 'Armenia', code: 'AM' },
      { name: 'Australia', code: 'AU' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Brunei', code: 'BN' },
      { name: 'China', code: 'CN' },
      { name: 'Georgia', code: 'GE' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Nepal', code: 'NP' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Singapore', code: 'SG' },
      { name: 'South Korea', code: 'KR' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Taiwan', code: 'TW' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Turkey', code: 'TR' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vietnam', code: 'VN' },
      { name: 'Yemen', code: 'YE' }
    ])
  },
  {
    id: 'europe',
    name: 'Europe',
    icon: '🌍',
    countries: sort([
      { name: 'Albania', code: 'AL' },
      { name: 'Austria', code: 'AT' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Czechia', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'Greece', code: 'GR' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Italy', code: 'IT' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Norway', code: 'NO' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Romania', code: 'RO' },
      { name: 'Serbia', code: 'RS' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Kingdom', code: 'GB' }
    ])
  },
  {
    id: 'africa',
    name: 'Africa',
    icon: '🌍',
    countries: sort([
      { name: 'Algeria', code: 'DZ' },
      { name: 'Angola', code: 'AO' },
      { name: 'Egypt', code: 'EG' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Ivory Coast', code: 'CI' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Libya', code: 'LY' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Senegal', code: 'SN' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Tanzania', code: 'TZ' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Uganda', code: 'UG' }
    ])
  },
  {
    id: 'americas',
    name: 'Americas',
    icon: '🌎',
    countries: sort([
      { name: 'Argentina', code: 'AR' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Brazil', code: 'BR' },
      { name: 'Canada', code: 'CA' },
      { name: 'Chile', code: 'CL' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Costa Rica', code: 'CR' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Panama', code: 'PA' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'United States', code: 'US' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Venezuela', code: 'VE' }
    ])
  }
]

export const allCountries: Country[] = sort(regions.flatMap((r) => r.countries))

// Registry of genuine Uneva models used by the Warranty Check page.
// This is a demo/front-end registry — in production the Search button would
// call a validation API. Models are keyed by their printed MODEL code; the
// SUFFIX is the batch/spec code found next to it on the rating label.

export interface WarrantyModel {
  model: string // printed MODEL code (what the user keys in)
  suffix: string // valid SUFFIX for this model
  name: string // marketing name
  categoryId: string // matches a category id in catalog.ts
  category: string // human-readable product line
  warrantyMonths: number // total warranty length
  compressorMonths?: number // extended cover on motor/compressor, if any
}

// Genuine models. Suffix matching is done case-insensitively and trimmed.
export const warrantyModels: WarrantyModel[] = [
  { model: 'UN-8TBL', suffix: 'MAXPRO', name: 'Uneva MaxPro 8kg Top Load', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 24, compressorMonths: 120 },
  { model: 'UN-8WBL', suffix: 'MAXPRO', name: 'Uneva MaxPro 8kg Front Load', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 24, compressorMonths: 120 },
  { model: 'UN-8WBL', suffix: 'RENO', name: 'Uneva Reno 8kg Front Load', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 24, compressorMonths: 120 },
  { model: 'UN-8SBL', suffix: 'RENO', name: 'Uneva Reno 8kg Silver Front Load', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 24, compressorMonths: 120 },
  { model: 'UN-9DSDD', suffix: 'VEVO', name: 'Uneva Vevo 9kg Dark Silver', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 24, compressorMonths: 120 },
  { model: 'UN-9WDD', suffix: 'VEVO', name: 'Uneva Vevo 9kg White', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 24, compressorMonths: 120 },
  { model: 'UN-WMT18000', suffix: 'TWIN', name: 'Uneva Twin Tub 18kg', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 12 },
  { model: 'UN-WMT26000', suffix: 'TWIN', name: 'Uneva Twin Tub 26kg', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 12 },
  { model: 'UN-OPAL', suffix: 'OPAL', name: 'Uneva Opal Front Load', categoryId: 'laundry', category: 'Washing Machine', warrantyMonths: 24, compressorMonths: 120 },
]

export type WarrantyResult =
  | { status: 'genuine'; model: WarrantyModel }
  | { status: 'model-only'; model: WarrantyModel } // model exists but suffix mismatched
  | { status: 'not-found' }

// Front-end validation. Trims + upper-cases for a forgiving match.
export function validateWarranty(modelInput: string, suffixInput: string): WarrantyResult {
  const m = modelInput.trim().toUpperCase()
  const s = suffixInput.trim().toUpperCase()
  if (!m) return { status: 'not-found' }

  const byModel = warrantyModels.filter((w) => w.model.toUpperCase() === m)
  if (byModel.length === 0) return { status: 'not-found' }

  const exact = byModel.find((w) => w.suffix.toUpperCase() === s)
  if (exact) return { status: 'genuine', model: exact }

  // Model recognised but the suffix does not match any known batch.
  return { status: 'model-only', model: byModel[0] }
}

"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, Ruler, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SelectField } from "@/components/ui/select";
import { TextareaField } from "@/components/ui/textarea";
import { ApiError, estimatePrice, submitQuoteRequest } from "@/lib/api";
import type {
  Category,
  Fabric,
  PriceEstimate,
  Product,
  QuoteFormValues,
  QuoteRequestResult,
  SizeChartRow,
} from "@/types";

interface QuoteFormProps {
  categories: Category[];
  fabrics: Fabric[];
  products: Product[];
  sizeChart: SizeChartRow[];
  initialProductId?: number;
  initialFabricId?: number;
}

function initialValuesFor(
  products: Product[],
  initialProductId?: number,
  initialFabricId?: number
): QuoteFormValues {
  const preselected = products.find((p) => p.id === initialProductId);
  return {
    name: "",
    phone: "",
    email: "",
    category: preselected?.categorySlug ?? "",
    product: preselected?.id ?? "",
    fabric: initialFabricId ?? "",
    quantity: "",
    sizeBreakdown: "",
    notes: "",
  };
}

export function QuoteForm({
  categories,
  fabrics,
  products,
  sizeChart,
  initialProductId,
  initialFabricId,
}: QuoteFormProps) {
  const [values, setValues] = useState<QuoteFormValues>(() =>
    initialValuesFor(products, initialProductId, initialFabricId)
  );
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteRequestResult | null>(null);
  const [estimate, setEstimate] = useState<PriceEstimate | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const update = <K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const productsInCategory = useMemo(
    () => (values.category ? products.filter((p) => p.categorySlug === values.category) : products),
    [products, values.category]
  );

  const visibleSizeChartRows = useMemo(() => {
    const scoped = sizeChart.filter((row) => row.categorySlug === values.category);
    return scoped.length > 0 ? scoped : sizeChart.filter((row) => row.categorySlug === null);
  }, [sizeChart, values.category]);

  const quantity = Number(values.quantity);
  const quantityValid = Boolean(quantity) && quantity >= 1;

  // Live "probable price" as the customer fills in fabric/category/quantity.
  // No-ops (doesn't touch state) whenever the quantity isn't valid yet --
  // `displayedEstimate` below derives the invalid case during render instead.
  useEffect(() => {
    if (!quantityValid) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      estimatePrice({
        category: values.category || undefined,
        fabric: values.fabric ? Number(values.fabric) : undefined,
        quantity,
      })
        .then((data) => {
          if (!cancelled) setEstimate(data);
        })
        .catch(() => {
          if (!cancelled) setEstimate(null);
        });
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [values.category, values.fabric, quantity, quantityValid]);

  const displayedEstimate = quantityValid ? estimate : null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const response = await submitQuoteRequest(values, file);
      setResult(response);
    } catch (error) {
      if (error instanceof ApiError && error.body && typeof error.body === "object") {
        const errors = (error.body as { errors?: Record<string, string[]> }).errors;
        if (errors) {
          setFieldErrors(errors);
          setFormError("Please fix the highlighted fields and try again.");
        } else {
          setFormError("Something went wrong submitting your request. Please try again.");
        }
      } else {
        setFormError("Something went wrong submitting your request. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[400px] flex-col items-center justify-center rounded-2xl border border-brand-border bg-white p-14 text-center">
        <div className="mb-4.5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-red/10">
          <Check size={28} className="text-brand-red" />
        </div>
        <h2 className="mb-2.5 text-xl font-extrabold text-brand-black">Request submitted!</h2>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-grey-mid">
          Reference: {result.referenceCode}
        </p>
        {result.estimatedPriceLow != null && result.estimatedPriceHigh != null && (
          <p className="mb-4 text-sm font-bold text-brand-red">
            Estimated total: ৳{result.estimatedPriceLow.toLocaleString()}–৳
            {result.estimatedPriceHigh.toLocaleString()}
          </p>
        )}
        <p className="mb-6 text-[13px] leading-[1.75] text-brand-grey-dark">
          Our team will contact you within 24 hours at your phone/WhatsApp to confirm details. No payment is
          required at this stage.
        </p>
        <Button
          onClick={() => {
            setValues(initialValuesFor(products, undefined));
            setFile(null);
            setResult(null);
            setEstimate(null);
          }}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-brand-border bg-white p-9">
      {formError && (
        <div className="mb-4 rounded-lg bg-red-50 p-3.5 text-xs font-semibold text-brand-red">{formError}</div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Field
            label="Full name *"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
          />
          {fieldErrors.name && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.name[0]}</p>}
        </div>
        <div>
          <Field
            label="Phone / WhatsApp *"
            required
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+880 1XXX-XXXXXX"
          />
          {fieldErrors.phone && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.phone[0]}</p>}
        </div>
        <Field
          label="Email address"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="your@email.com"
        />
        <SelectField
          label="Sport category"
          value={values.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Product"
          value={values.product}
          onChange={(e) => update("product", e.target.value ? Number(e.target.value) : "")}
        >
          <option value="">Select a product (optional)</option>
          {productsInCategory.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </SelectField>
        <SelectField
          label="Fabric"
          value={values.fabric}
          onChange={(e) => update("fabric", e.target.value ? Number(e.target.value) : "")}
        >
          <option value="">Select a fabric (optional)</option>
          {fabrics.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </SelectField>
        <div>
          <Field
            label="Quantity *"
            type="number"
            min={1}
            required
            value={values.quantity}
            onChange={(e) => update("quantity", e.target.value ? Number(e.target.value) : "")}
            placeholder="e.g. 25"
          />
          {fieldErrors.quantity && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.quantity[0]}</p>}
        </div>
      </div>

      {displayedEstimate && (
        <div className="mt-4 rounded-lg bg-brand-grey-light p-3.5 text-xs text-brand-grey-dark">
          Probable price:{" "}
          <strong className="text-brand-red">
            ৳{displayedEstimate.totalLow.toLocaleString()}–৳{displayedEstimate.totalHigh.toLocaleString()}
          </strong>{" "}
          for {values.quantity} pcs. Final price confirmed by our team after review.
        </div>
      )}

      <div className="mt-4">
        <Field
          label="Size breakdown"
          value={values.sizeBreakdown}
          onChange={(e) => update("sizeBreakdown", e.target.value)}
          placeholder="e.g. 5×S, 10×M, 8×L, 2×XL"
        />
        {visibleSizeChartRows.length > 0 && (
          <button
            type="button"
            onClick={() => setShowSizeChart((v) => !v)}
            className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-brand-red hover:underline"
          >
            <Ruler size={12} /> {showSizeChart ? "Hide size chart" : "Need help picking a size? View size chart"}
          </button>
        )}
        {showSizeChart && visibleSizeChartRows.length > 0 && (
          <div className="mt-2.5 overflow-x-auto rounded-lg border border-brand-border">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-brand-grey-light text-brand-grey-mid">
                <tr>
                  <th className="px-3 py-2">Size</th>
                  <th className="px-3 py-2">Chest (in)</th>
                  <th className="px-3 py-2">Length (in)</th>
                  <th className="px-3 py-2">Shoulder (in)</th>
                  <th className="px-3 py-2">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                {visibleSizeChartRows.map((row) => (
                  <tr key={row.id} className="border-t border-brand-border">
                    <td className="px-3 py-2 font-semibold text-black">{row.sizeLabel}</td>
                    <td className="px-3 py-2 text-brand-grey-dark">{row.chestIn ?? "—"}</td>
                    <td className="px-3 py-2 text-brand-grey-dark">{row.lengthIn ?? "—"}</td>
                    <td className="px-3 py-2 text-brand-grey-dark">{row.shoulderIn ?? "—"}</td>
                    <td className="px-3 py-2 text-brand-grey-dark">{row.sleeveIn ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-brand-grey-dark">Upload design file</label>
        <label className="flex cursor-pointer flex-col items-center rounded-lg border-[1.5px] border-dashed border-brand-border bg-brand-grey-light px-5 py-7 text-center transition-colors hover:border-brand-red">
          <Upload size={22} className="mb-2 text-brand-grey-mid" />
          <span className="mb-0.5 text-[13px] font-semibold text-brand-grey-dark">
            {file ? file.name : "Click to upload your design"}
          </span>
          <span className="text-[11px] text-brand-grey-mid">Supports .ai · .jpg · .png · .pdf (max 20 MB)</span>
          <input
            type="file"
            className="hidden"
            accept=".ai,.jpg,.jpeg,.png,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {fieldErrors.designFile && <p className="mt-1 text-[11px] text-brand-red">{fieldErrors.designFile[0]}</p>}
      </div>

      <div className="mt-4">
        <TextareaField
          label="Additional notes"
          rows={4}
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Colour preferences, deadline, special requirements…"
        />
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-brand-grey-light p-3.5">
        <Check size={14} className="mt-0.5 shrink-0 text-brand-red" />
        <p className="text-xs leading-[1.65] text-brand-grey-dark">
          <strong>No payment required to submit.</strong> After reviewing your request, our team will contact
          you by phone or WhatsApp to confirm details and discuss payment.
        </p>
      </div>

      <Button type="submit" disabled={submitting} className="mt-5 w-full justify-center py-3 text-[13px]">
        {submitting ? "Submitting…" : "Submit order request"}
      </Button>
    </form>
  );
}

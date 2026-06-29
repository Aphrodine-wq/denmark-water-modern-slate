"use client";

import { useCallback, useMemo, useState } from "react";
import { Account, findAccount } from "./mockAccounts";

export type PortalStep = "lookup" | "balance" | "pay" | "confirmation";

export type PaymentResult = {
  confirmationNumber: string;
  amountPaid: number;
  enrolledAutopay: boolean;
  paidAt: string;
};

/**
 * Shared 4-step payment-portal state machine used by all three concepts.
 * UI is rendered per-concept; this hook owns the logic and mock data only.
 */
export function usePortalFlow() {
  const [step, setStep] = useState<PortalStep>("lookup");
  const [account, setAccount] = useState<Account | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [result, setResult] = useState<PaymentResult | null>(null);

  const lookup = useCallback((accountNumber: string, lastName: string) => {
    if (!accountNumber.trim() || !lastName.trim()) {
      setLookupError("Enter both your account number and last name.");
      return false;
    }
    const found = findAccount(accountNumber, lastName);
    if (!found) {
      setLookupError(
        "We couldn't find an account with those details. Check your bill and try again."
      );
      return false;
    }
    setLookupError(null);
    setAccount(found);
    setStep("balance");
    return true;
  }, []);

  const goToPay = useCallback(() => setStep("pay"), []);
  const backToBalance = useCallback(() => setStep("balance"), []);

  const submitPayment = useCallback(
    (amount: number, enrolledAutopay: boolean) => {
      // Mock-only: no card data is transmitted or stored anywhere.
      const confirmationNumber =
        "DWA-" +
        Math.random().toString(36).slice(2, 8).toUpperCase() +
        Math.floor(Math.random() * 90 + 10);
      setResult({
        confirmationNumber,
        amountPaid: amount,
        enrolledAutopay,
        paidAt: new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      });
      setStep("confirmation");
    },
    []
  );

  const reset = useCallback(() => {
    setStep("lookup");
    setAccount(null);
    setLookupError(null);
    setResult(null);
  }, []);

  return useMemo(
    () => ({
      step,
      account,
      lookupError,
      result,
      lookup,
      goToPay,
      backToBalance,
      submitPayment,
      reset,
    }),
    [step, account, lookupError, result, lookup, goToPay, backToBalance, submitPayment, reset]
  );
}

export function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

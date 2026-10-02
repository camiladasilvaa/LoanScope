export function minPayment(principal, rate) {
  // currency calculations in integer cents
  const principalCents = Math.round(principal*100)
  const rateCents = Math.round(rate*100)

  const intCents = Math.round(((principalCents * rateCents) / (12*100*100)));

  let paymentCents = intCents + 1

  if (paymentCents < 100) {
    paymentCents = 100
  }

  return paymentCents / 100
}


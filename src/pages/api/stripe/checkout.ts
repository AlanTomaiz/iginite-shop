import { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "../../../lib/stripe";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { productId, priceId } = req.body

  if (!productId || !priceId) {
    return res.status(400).json({ error: 'Product not found.' })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    cancel_url: `${process.env.NEXT_URL}/product/${productId}`,
    success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    // billing_address_collection: 'required',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  })

  return res.json({ checkoutUrl: checkoutSession.url })
}

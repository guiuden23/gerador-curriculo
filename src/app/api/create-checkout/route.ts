import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan, planAmountInCents } from "@/config/plans";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe não configurado. Adicione STRIPE_SECRET_KEY ao .env.local" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let productKey = "resume";
  try {
    const body = await request.json();
    if (body?.product && getPlan(body.product)) {
      productKey = body.product;
    }
  } catch {
    // corpo vazio/ausente → produto padrão
  }

  const plan = getPlan(productKey);
  if (!plan || plan.paymentGateway !== "stripe") {
    return NextResponse.json({ error: "Produto inválido para Stripe." }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const successPath = plan.successPath ?? "/success";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "brl",
            unit_amount: planAmountInCents(plan.amount),
            product_data: {
              name: plan.name,
              description: plan.description,
            },
          },
        },
      ],
      success_url: `${appUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/success?session_id=__canceled__`,
      metadata: { product: productKey },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar checkout:", error);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento. Tente novamente." },
      { status: 500 }
    );
  }
}

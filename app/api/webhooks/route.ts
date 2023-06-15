import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { upsertProductRecord, upsertPriceRecord, manageSubscriptionsChange } from "../../../libs/supaBaseAdmin";
import { stripe } from "../../../libs/stripe";

const relevantEvents= new Set([
   'price.created',
   'price.updated',
   'product.created',
   'product.updated',
   'checkout.session.completed',
   'customer.subscription.created',
   'customer.subscription.updated',
   'customer.subscription.deleted'
])

export async function POST(
   req: Request
){
   const body = await req.text();
   const sig = headers().get('Stripe-Signature');

   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
   let event: Stripe.Event;

   try{
      if(!sig || !webhookSecret) return;
      event = stripe.webhooks.constructEvent(body,sig,webhookSecret);
   } catch(err:any){
      console.log(err.message);
      return new NextResponse(`WebHook error: ${err.message}`, {status: 400})
   }
   if(relevantEvents.has(event.type)){
      try{
         switch(event.type){
            case 'product.created':
            case 'product.updated':
               await upsertProductRecord(event.data.object as Stripe.Product);
               break;
            case 'price.created':
            case 'price.updated':
               await upsertPriceRecord(event.data.object as Stripe.Price);
               break;
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
               const subscription = event.data.object as Stripe.Subscription;
               await manageSubscriptionsChange(subscription.id, subscription.customer as string, event.type === 'customer.subscription.created');
               break;
            case 'checkout.session.completed':
               const checkoutSession = event.data.object as Stripe.Checkout.Session;
               if(checkoutSession.mode === 'subscription'){
                  const subscriptionId = checkoutSession.subscription;
                  await manageSubscriptionsChange(
                     subscriptionId as string,
                     checkoutSession.customer as string,
                     true                     
                  )
               }
               break;
            default:
               throw new Error('Unhandled event');               
         }
      }catch(err){
         console.log(err);
         return new NextResponse('Webhook Error', {status:400});
      }
   }
   return NextResponse.json({received: true}, {status: 200});
}
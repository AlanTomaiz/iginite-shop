import { GetStaticPaths, GetStaticProps } from "next";
import Image from 'next/image';
import { useState } from "react";
import Stripe from "stripe";

import Head from "next/head";
import { api } from "../../lib/axios";
import { stripe } from "../../lib/stripe";
import { ProductContainer, ProductDetails, ProductImage } from "../../styles/(pages)/product";

interface PageProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    defaultPriceId: string;
    price: string;
    description: string;
  }
}

export default function Product({ product }: PageProps) {
  const [waiting, setWaiting] = useState(false)

  async function handlePayment() {
    try {
      setWaiting(true)

      const response = await api.post('/api/stripe/checkout', {
        productId: product.id,
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (error) {
      setWaiting(false)

      console.log('[HANDLE PAYMENT]', error)
      alert('Falha ao realizar checkout.')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ProductImage>
          <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
        </ProductImage>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button onClick={handlePayment} disabled={waiting}>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const priceParsed = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        defaultPriceId: priceParsed.id,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(priceParsed.unit_amount / 100)
      }
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}

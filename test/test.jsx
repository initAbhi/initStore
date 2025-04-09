import Image from "next/image";
import styles from "./page.module.css";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";
import Navbar from "@/components/Navbar";

export default async function Home() {

  const data = await fetch(`/api/products`)
  const {products} = await data.json();

  // const products = await stripe.products.list({
  //   expand: ["data.default_price"],
  //   limit: 5,
  // });

  // const user = useContext(SessionContext)
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8 hide-scrollbar">
        <div>
          <section className="rounded bg-neutral-100 py-8 sm:py-12">
            <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
              <div className="max-w-md space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome to my initStore
                </h2>
                <p className="text-neutral-600">
                  Discover the latest products at the best prices.
                </p>
                <Button
                  asChild
                  variant="default"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
                >
                  <Link
                    href={"/products"}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3"
                  >
                    Browse All products
                  </Link>
                </Button>
              </div>
              <Image
                alt="Banner Image"
                width={450}
                height={450}
                src={products[0].images[0]}
                className="rounded"
              />
            </div>
          </section>
          <section className="py-8">
            <Carousel products={products} />
          </section>
        </div>
      </main>
    </>
  );
}

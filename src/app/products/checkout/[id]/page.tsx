"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { simProducts, insuranceProducts } from "@/data/products";
import { checkoutFields, checkoutSubtitle, paymentInfoNote } from "@/data/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, ShieldCheck, MapPin } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const VisaIcon = () => (
  <svg
    width="38"
    height="24"
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="38" height="24" rx="3" fill="#E0E7FF" />
    <path
      d="M11.536 7.68H9.536L8 16.32H10.032L10.32 14.4H12.72L13.032 16.32H15.032L13.536 7.68H11.536ZM11.52 12.96L12.24 8.88L12.48 12.96H11.52Z"
      fill="#2566AF"
    />
    <path
      d="M19.344 11.28C19.344 9.84 20.328 9.12 21.6 9.12C22.296 9.12 22.848 9.36 23.28 9.6L23.832 7.92C23.28 7.536 22.56 7.32 21.696 7.32C19.536 7.32 18 8.64 18 11.28C18 13.92 19.8 14.64 20.88 15.12C21.96 15.6 22.32 15.936 22.32 16.32C22.32 16.896 21.672 17.04 21.048 17.04C20.136 17.04 19.608 16.704 19.224 16.512L18.672 18.24C19.128 18.528 20.088 18.84 21.216 18.84C23.4 18.84 24.816 17.616 24.816 15.48C24.816 12.528 21.696 11.928 20.88 11.544C20.064 11.16 19.344 10.92 19.344 10.464V11.28Z"
      fill="#2566AF"
    />
    <path
      d="M29.808 16.32H32V7.68H29.568L27.6 13.2L26.928 9.36L26.4 7.68H24L26.808 16.32H27.312L29.808 10.56V16.32Z"
      fill="#2566AF"
    />
  </svg>
);
const MasterCardIcon = () => (
  <svg
    width="38"
    height="24"
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="38" height="24" rx="3" fill="#E0E7FF" />
    <circle cx="15" cy="12" r="6" fill="#EB001B" />
    <circle cx="23" cy="12" r="6" fill="#F79E1B" fillOpacity="0.8" />
  </svg>
);
const AmexIcon = () => (
  <svg
    width="38"
    height="24"
    viewBox="0 0 38 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="38" height="24" rx="3" fill="#006FCF" />
    <path d="M19 12.5H23.5V14H19V12.5ZM19 10H23.5V11.5H19V10Z" fill="white" />
    <path
      d="M14.5 10H16.5L17.5 12.5L18.5 10H20.5L18.25 13.25L20.5 16.5H18.5L17.5 14L16.5 16.5H14.5L16.75 13.25L14.5 10Z"
      fill="white"
    />
  </svg>
);

export default function ProductCheckoutPage() {
  const { id } = useParams();
  const allProducts = [...simProducts, ...insuranceProducts];
  const product = allProducts.find((p) => p.id === id);
  const [agreed, setAgreed] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 text-center text-gray-700">Product not found.</div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    alert(`Purchase submitted for ${product.name}!`);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center ">
        <div className="w-full max-w-8xl bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
          {/* Product image header */}
          <div className="relative w-full h-44 md:h-56 bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Overlay name, subtitle, price */}
            <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-8 py-6 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1 drop-shadow">{product.name}</h1>
                <div className="text-gray-200 text-sm drop-shadow">{checkoutSubtitle}</div>
              </div>
              <div className="text-2xl font-bold text-white drop-shadow">{product.priceDescription}</div>
            </div>
          </div>
          {/* Remove the name/price row below image */}
          <div className="px-8 pt-8 pb-2">
            {/* Stepper */}
            <div className="flex items-center mb-8">
              <div className="flex items-center text-blue-600">
                <span className="flex items-center justify-center w-6 h-6 font-bold text-sm bg-blue-600 text-white rounded-full">
                  1
                </span>
                <div className="ml-2">
                  <p className="text-sm font-semibold">Checkout</p>
                  <p className="text-xs">Complete your purchase</p>
                </div>
              </div>
              <div className="flex-grow h-px bg-gray-300 mx-3"></div>
              <div className="flex items-center text-gray-400">
                <span className="flex items-center justify-center w-6 h-6 font-bold text-sm bg-gray-200 rounded-full">
                  2
                </span>
                <div className="ml-2">
                  <p className="text-sm font-semibold">Confirmation</p>
                  <p className="text-xs">Order complete</p>
                </div>
              </div>
            </div>
            {/* Delivery Information Card */}
            <div className="bg-[#F6F8FB] border border-gray-200 rounded-lg mb-6">
              <div className="px-6 pt-5 pb-2 font-semibold text-gray-800 text-base">
                Delivery Information
              </div>
              <div className="px-6 pb-5 space-y-4">
                {checkoutFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                    {field.name === "address" && (
                      <button
                        type="button"
                        className="mt-1 flex items-center gap-1.5 text-xs text-blue-600 hover:underline"
                      >
                        <MapPin className="w-3 h-3" />
                        Use my current location
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Payment Information Card */}
            <div className="bg-[#F6F8FB] border border-gray-200 rounded-lg mb-6">
              <div className="px-6 pt-5 pb-2 font-semibold text-gray-800 text-base">
                Payment Information
              </div>
              <div className="px-6 pb-5">
                <div className="text-gray-500 text-sm">{paymentInfoNote}</div>
              </div>
            </div>
            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 mb-4">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(Boolean(checked))}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 underline">Terms and Conditions</a>{' '}and{' '}
                <a href="#" className="text-blue-600 underline">Privacy Policy</a>
              </label>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex flex-row items-center justify-between mb-2">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">Total</span>
                  <span className="text-2xl font-bold text-gray-900">{product.priceDescription}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5"><Lock size={12} /> Secure Checkout</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> Money-back Guarantee</span>
                    <span className="flex items-center gap-1">
                      <VisaIcon />
                      <MasterCardIcon />
                      <AmexIcon />
                    </span>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4 font-semibold shadow-none rounded-lg mt-2"
                disabled={!agreed}
              >
                Pay Now
              </Button>
            </div>
          </div>
          <div className="py-2.5 bg-white flex justify-center">
            <div className="w-32 h-1.5 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

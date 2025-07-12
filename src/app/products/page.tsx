"use client";

import { useState } from "react";
import ProductCard from "@/components/products/ProductCards";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import { simProducts, insuranceProducts, Product } from "@/data/products";
import MainLayout from "@/components/layout/MainLayout";

export default function ProductListingPage() {
  const [tab, setTab] = useState("sim");

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          </header>
          <div className="bg-white rounded-lg shadow-sm">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              {/* Controls Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">
                <TabsList className="bg-transparent p-0 h-auto w-full justify-center">
                  <TabsTrigger
                    value="sim"
                    className="text-base font-medium text-gray-500 rounded-none bg-transparent p-2 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                  >
                    SIM Cards
                  </TabsTrigger>
                  <TabsTrigger
                    value="insurance"
                    className="text-base font-medium text-gray-500 rounded-none bg-transparent p-2 data-[state=active]:text-blue-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
                  >
                    Insurance
                  </TabsTrigger>
                </TabsList>
              </div>
              {/* Compare + Filter/Search Row */}
              <div className="flex items-center justify-between px-4 py-2 border-b">
                {/* Compare Switch */}
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor="compare-switch"
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Compare
                  </Label>
                  <Switch id="compare-switch" />
                </div>
                {/* Filter/Search Controls */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filter</span>
                  </Button>
                </div>
              </div>
              {/* Products List */}
              <div className="p-2">
                <TabsContent value="sim">
                  <div className="flex flex-col">
                    {simProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="insurance">
                  <div className="flex flex-col">
                    {insuranceProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


"use client";
import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getContactQuery } from "@/services/Home/Contact/queries";
import { useQuery } from "@tanstack/react-query";

function ContactMarketPage() {
  
  const { data: contact } = useQuery({
    ...getContactQuery(),
  });

  return (
    <div className=" flex items-center justify-center py-10">
      <div className="max-w-6xl mx-auto bg-[#FBFDFF] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 p-4 md:p-20 shadow-sm">
        <div className="py-8 flex flex-col justify-between ">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
              Sualınız Var? Biz Buradayıq!
            </h2>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-gray-600" />
                <span className="text-lg">{contact?.email}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-gray-600" />
                <span className="text-lg">{contact?.phone}</span>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-gray-600 flex-shrink-0 mt-1" />
                <span className="text-lg">{contact?.address}</span>
              </div>
            </div>
          </div>

          <div className=" flex space-x-6">
            <Link
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm  transition-colors"
            >
              <Facebook className="text-pink-500" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm transition-colors"
            >
              <Instagram className="text-pink-500" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm  transition-colors"
            >
              <Send className="text-pink-500" />
            </Link>
          </div>
        </div>

        <div className="p-8 sm:p-10  shadow-sm bg-white rounded-2xl">
          <form className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="fullname"
                className="text-sm font-medium text-gray-600"
              >
                Ad,soyad
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Ad və soyadınızı daxil edin"
                className="block w-full rounded-xl border-2 px-4 py-4 text-gray-900 placeholder:text-[#8E8E93]   sm:text-base "
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-600"
              >
                Nömrənizi daxil edin
              </label>
              <div className="flex w-full rounded-xl  border-2">
                <select
                  id="country-code"
                  className="bg-transparent pl-4 pr-2 text-gray-700  sm:text-base border-r border-gray-300"
                >
                  <option>+994</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Telefon nömrənizi daxil edin"
                  className="flex-1 block w-full bg-transparent px-4 py-4 text-gray-900 placeholder:text-[#8E8E93] focus:outline-none sm:text-base sm:leading-6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-600"
              >
                Mesaj
              </label>
              <textarea
                id="message"
                placeholder="Mesajınız"
                className="block w-full rounded-xl border-2 px-4 py-4 text-gray-900 placeholder:text-[#8E8E93] sm:text-base "
              ></textarea>
            </div>

            <Button
              variant="default"
              type="submit"
              className="w-full h-12 rounded-xl bg-[#E23359] hover:bg-[#E23359]/90   px-6 py-4 text-base font-medium text-white cursor-pointer"
            >
              Mesaj göndər
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ContactMarketPage;


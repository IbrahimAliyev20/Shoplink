import React from "react";
import Image from "next/image";

const StatsSection = () => {
  return (
    <section>
      <div>
        {/* Header */}
        <div className="text-start mb-[48px]">
          <h2 className="text-4xl md:text-[40px] font-semibold text-gray-900 mb-6">
            Shoplink kimlər üçündür?
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl  leading-relaxed">
            Əgər yerli mağaza sahibisənsə, kiçik biznes qurursansa və ya sosial
            mediada satış edirsənsə - Shoplink sənin üçündür. Məhsullarını
            onlayn təqdim et və daha çox alıcıya çat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-start">
            <div className="mb-2">
              <Image
                src="/images/team1.png"
                alt="Yerli bizneslər"
                width={405}
                height={440}
                className="w-full h-[440px] object-cover rounded-lg mx-auto"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Yerli bizneslər
            </h3>
            <p className="text-gray-600 leading-relaxed">
              WhatsApp və Qapıda Ödəniş üsulları ilə məhsullarını asanlıqla sat.
            </p>
          </div>

          {/* Column 2 - Kiçik bizneslər */}
          <div className="text-start">
            <div className="mb-2">
              <Image
                src="/images/team2.jpg"
                alt="Kiçik bizneslər"
                width={405}
                height={440}
                className="w-full h-[440px] object-cover rounded-lg mx-auto"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Kiçik bizneslər
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Mağazanı onlayn daşı və məhsullarını pulsuz vebsaytda satışa
              çıxar.
            </p>
          </div>

          {/* Column 3 - Sosial media satıcıları */}
          <div className="text-start">
            <div className="mb-2">
              <Image
                src="/images/team3.jpg"
                alt="Sosial media satıcıları"
                width={405}
                height={440}
                className="w-full h-[440px] object-cover rounded-lg mx-auto"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Sosial media satıcıları
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Instagram satışlarını artır və Shoplink-in tam onlayn ticarət
              platformasından yararlan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

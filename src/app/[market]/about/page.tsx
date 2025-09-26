import React from "react";
import Image from "next/image";

const StrideXAboutPage = () => {
  return (
    
      <div className="py-12 max-w-5xl mx-auto rounded-2xl overflow-hidden">
        <div className=" space-y-8">
          
          <section>
            <div className="relative w-full h-80 md:h-100 rounded-2xl overflow-hidden mb-8">
              <Image
                src="/marketimg/marketabout.jpg" 
                alt="StrideX Professional"
                width={900}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-4">
                StrideX nədir ?
              </h1>
              <p className="text-gray-800 text-base leading-relaxed">
                StrideX, ayaqqabı sənayesində keyfiyyətli və stil sahibi
                modelləri ilə tanınan bir markadır. Bizim məqsədimiz yalnız
                şıqlıq deyil, eyni zamanda rahatlığı da birləşdirməkdir. Hər bir
                ayaqqabımız, dizaynından tutmuş, istifadə olunan materiallara
                qədər yüksək standartlara uyğun hazırlanır. Müştərilərimizə,
                gündəlik istifadə üçün ideal, həmçinin xüsusi hallarda istifadə
                oluna biləcək müxtəlif modellər təklif edirik. StrideX-in hər
                bir ayaqqabısı, özünəməxsus tərzi ilə fərqlənir və bu,
                müştərilərimizin zövqünə uyğun seçimlər etməsinə imkan tanıyır.
                Bizim markamızda, həm klassik, həm də müasir üslubları bir arada
                tapmaq mümkündür. Yüksək keyfiyyətli dərilər, tekstil
                materialları və rahat içliklər, ayaqqabılarımızın uzun ömürlü
                olmasını təmin edir. Hər bir model, ən son moda trendlərinə
                uyğun olaraq hazırlanır. StrideX olaraq, ayaqqabılarımızın
                yalnız estetik baxımından deyil, həm də funksionallıq və
                rahatlıq baxımından mükəmməl olduğunu düşünürük. Bu səbəbdən,
                StrideX-dən aldığınız hər bir cüt ayaqqabı, gündəlik həyatınızda
                maksimum rahatlıq təmin edir.
              </p>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="w-full h-full ">
                <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-6">
                  Məhsullarımız necə istehsal olunur?
                </h2>
                <div >
                  <p className="text-gray-800 text-base leading-relaxed">
                    StrideX məhsullarının istehsal prosesi mükəmməl dizayn, yüksək
                    keyfiyyətli materiallar və diqqətlə işlənmiş əl işçiliyi ilə
                    həyata keçirilir. Hər model müasir moda trendləri və müştəri
                    ehtiyaclarına uyğun hazırlanır, rahatlıq və şıqlıq
                    birləşdirərək müxtəlif zövqlərə cavab verir.
                  </p>
                  <p className="text-gray-800 text-base leading-relaxed">
                    Keyfiyyətli dəri və tekstil materialları istifadə olunur,
                    məhsullar həm estetik, həm də funksional cəhətdən mükəmməl
                    olur. İstehsal prosesində ətraf mühitə dost materiallardan
                    istifadə edilir və sosial məsuliyyətə əməl edilir, ətraf
                    mühitə təsir minimuma endirilir. StrideX-də hər bir məhsulda
                    rahatlıq, keyfiyyət və dayanıqlıq ön planda tutulur.
                  </p>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="w-full h-[358px] rounded-2xl overflow-hidden">
                  <Image
                    src="/marketimg/marketabout2.jpg"
                    alt="StrideX Sneakers Manufacturing"
                    width={410}
                    height={358}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-4">
                Müştəri Məmnuniyyəti Ən Yüksək Prioritetimizdir
              </h2>
              <p className="text-gray-800 text-base leading-relaxed">
                StrideX olaraq, müştərilərimizin məmnuniyyəti bizim üçün ən böyük
                prioritetdir. Hər bir müştəri bizim üçün xüsusi və dəyərlidir, ona
                görə də biz daim onların ehtiyaclarını qarşılamağa çalışırıq.
                Məqsədimiz, yalnız məhsul satmaq deyil, həm də müştərilərimizin
                alış-veriş təcrübəsini mükəmməl etməkdir. Satış sonrası
                xidmətlərimiz, müştərilərimizin alış-verişdən tam məmnun qalmasını
                təmin edir. Biz müştərilərimizlə güclü əlaqələr qurmağa və onlara
                uzun müddətli dəstək verməyə çalışırıq. StrideX mağazasını seçən
                hər bir müştəri, keyfiyyətli məhsul və mükəmməl müştəri xidmətləri
                ilə qarşılaşır. Müştəri məmnuniyyəti bizim üçün yalnız bir məqsəd
                deyil, həm də işimizin əsasını təşkil edir.
              </p>
            </div>
          </section>

        </div>
      </div>
  );
};

export default StrideXAboutPage;
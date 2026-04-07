"use client";

export default function EmotionalCopy() {
  return (
    <section className="py-14 md:py-36 bg-white text-center relative overflow-hidden">
      <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="w-8 md:w-10 h-[1px] bg-gold-500 mx-auto mb-6 md:mb-10 relative">
          <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] md:w-[7px] md:h-[7px] rounded-full bg-gold-500" />
        </div>

        <p className="text-[18px] md:text-[34px] font-light leading-[1.8] md:leading-[1.85] text-gray-900 mb-6 md:mb-8">
          이혼이라는 단어를 입에 담기조차<br />
          어려워했던 시절이 있었습니다.<br /><br />
          <em className="not-italic text-burgundy-500 font-semibold">
            이혼은 존엄한 선택인데,<br />
            왜 존중받지 못할까?
          </em>
          <span className="block mt-4 md:mt-6 text-[22px] md:text-[42px] font-bold leading-[1.4]">
            이혼은 다시 행복할 권리입니다.
          </span>
        </p>

        <p className="text-[13px] md:text-[14px] text-[#333333] tracking-[1.5px]">
          <span className="text-burgundy-500 font-semibold">조인섭</span> 대표변호사
        </p>
      </div>
    </section>
  );
}

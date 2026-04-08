"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useConsultation } from "@/lib/consultation-context";
import { EASE } from "@/lib/motion";
import practiceData from "@/../../data/practice_areas.json";

export default function ConsultationModal() {
  const { open, setOpen } = useConsultation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <p className="text-[15px] tracking-[0.3em] text-burgundy-500 font-semibold uppercase">
                    Consultation
                  </p>
                  <h3 className="text-xl font-bold text-navy-900">
                    상담 신청
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-xl font-bold text-navy-900 mb-2">
                      상담 신청이 완료되었습니다
                    </p>
                    <p className="text-sm text-[#444444]">
                      빠른 시간 내에 연락드리겠습니다.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="modal-name" className="text-sm font-semibold text-[#333333] mb-1.5 block">
                        이름
                      </Label>
                      <Input
                        id="modal-name"
                        placeholder="홍길동"
                        required
                        className="h-11 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="modal-phone" className="text-sm font-semibold text-[#333333] mb-1.5 block">
                        연락처
                      </Label>
                      <Input
                        id="modal-phone"
                        placeholder="010-0000-0000"
                        required
                        className="h-11 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="modal-type" className="text-sm font-semibold text-[#333333] mb-1.5 block">
                        상담 유형
                      </Label>
                      <select
                        id="modal-type"
                        required
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">선택해주세요</option>
                        {practiceData.practice_areas.map((area) => (
                          <option key={area.id} value={area.name}>
                            {area.name}
                          </option>
                        ))}
                        <option value="기타">기타</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="modal-content" className="text-sm font-semibold text-[#333333] mb-1.5 block">
                        상담 내용
                      </Label>
                      <Textarea
                        id="modal-content"
                        placeholder="상담받고 싶은 내용을 간략히 적어주세요."
                        rows={4}
                        className="rounded-lg resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="modal-privacy"
                        required
                        className="mt-1 rounded border-gray-300"
                      />
                      <Label htmlFor="modal-privacy" className="text-xs text-[#444444] leading-relaxed">
                        개인정보 수집 및 이용에 동의합니다. 수집된 정보는 상담
                        목적으로만 사용됩니다.
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-[#7B2D3B] to-[#5C1D2A] hover:from-[#8B3D4B] hover:to-[#6B2D3A] text-white font-semibold text-[14px] rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(123,45,59,0.25)]"
                    >
                      상담 신청하기
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
